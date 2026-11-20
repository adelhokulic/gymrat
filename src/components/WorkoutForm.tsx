import { useFieldArray, useForm } from "react-hook-form";
import {
	Workout,
	WorkoutFormValues,
	workoutTypes,
} from "../types/workoutTypes";
import { useWorkout } from "../context/WorkoutContext";
import "./WorkoutForm.css";

type WorkoutFormProps = {
	workout?: Workout;
	onClose?: () => void;
};

const WorkoutForm = ({ workout, onClose }: WorkoutFormProps) => {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<WorkoutFormValues>({
		defaultValues: {
			date: workout ? workout.date : new Date().toISOString().slice(0, 10),
			type: workout ? workout.type : workoutTypes[0],
			duration: workout ? workout.duration : 30,
			exercises: workout
				? workout.exercises.map(({ id, ...rest }) => rest)
				: [{ name: "", sets: 3, reps: 10, weight: 0 }],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "exercises",
	});
	const { addWorkout, updateWorkout } = useWorkout();

	const onSubmit = (data: WorkoutFormValues) => {
		const newWorkout = {
			...data,
			exercises: data.exercises.map((exercise, index) => ({
				...exercise,
				id: Date.now() + index,
			})),
		};
		if (workout) {
			updateWorkout({
				...workout,
				...newWorkout,
			});
			reset(data);
			onClose?.();
		} else {
			addWorkout(newWorkout);
			reset();
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="workout-form" noValidate>
			<div className="workout-form-header">
				<h2 className="workout-form-title">
					{workout ? "Edit workout" : "New workout"}
				</h2>
				<p className="workout-form-subtitle">Log what you did today</p>
			</div>

			<div className="workout-form-row">
				<div className="form-field">
					<label htmlFor="date">Date</label>
					<input
						{...register("date", { required: "Date is required" })}
						id="date"
						type="date"
					/>
					{errors.date && <p className="form-error">{errors.date.message}</p>}
				</div>

				<div className="form-field">
					<label htmlFor="type">Type</label>
					<select
						{...register("type", { required: "Type is required" })}
						id="type"
					>
						{workoutTypes.map((workoutType) => {
							return (
								<option key={workoutType} value={workoutType}>
									{workoutType}
								</option>
							);
						})}
					</select>
				</div>

				<div className="form-field">
					<label htmlFor="duration">Duration (min)</label>
					<input
						{...register("duration", {
							valueAsNumber: true,
							required: "Duration is required",
							min: { value: 1, message: "Duration must be at least 1 minute" },
						})}
						id="duration"
						type="number"
						min={1}
					/>
					{errors.duration && (
						<p className="form-error">{errors.duration.message}</p>
					)}
				</div>
			</div>

			<div className="exercises">
				<div className="exercises-header">
					<h3>Exercises</h3>
					<button
						onClick={() => append({ name: "", sets: 3, reps: 10, weight: 0 })}
						type="button"
						className="btn btn-secondary"
					>
						+ Add exercise
					</button>
				</div>

				{fields.map((field, index) => {
					return (
						<div key={field.id} className="exercise-row">
							<div className="exercise-field exercise-field--name">
								<label htmlFor={`exercise-${index}-name`}>Name</label>
								<input
									{...register(`exercises.${index}.name`, {
										required: "Name is required",
									})}
									id={`exercise-${index}-name`}
									type="text"
									placeholder="Bench press"
								/>
							</div>
							<div className="exercise-field">
								<label htmlFor={`exercise-${index}-sets`}>Sets</label>
								<input
									{...register(`exercises.${index}.sets`, {
										required: "Sets are required",
										valueAsNumber: true,
										min: { value: 1, message: "Sets must be at least 1" },
									})}
									id={`exercise-${index}-sets`}
									type="number"
									min={1}
								/>
							</div>
							<div className="exercise-field">
								<label htmlFor={`exercise-${index}-reps`}>Reps</label>
								<input
									{...register(`exercises.${index}.reps`, {
										required: "Reps are required",
										valueAsNumber: true,
										min: { value: 1, message: "Reps must be at least 1" },
									})}
									id={`exercise-${index}-reps`}
									type="number"
									min={1}
								/>
							</div>
							<div className="exercise-field">
								<label htmlFor={`exercise-${index}-weight`}>Weight (kg)</label>
								<input
									{...register(`exercises.${index}.weight`, {
										required: "Weight is required",
										valueAsNumber: true,
										min: { value: 0, message: "Weight must be at least 0" },
									})}
									id={`exercise-${index}-weight`}
									type="number"
									min={0}
									step={0.5}
								/>
							</div>
							<button
								onClick={() => remove(index)}
								disabled={fields.length === 1}
								type="button"
								className="btn btn-danger exercise-remove"
								aria-label={`Remove exercise ${index + 1}`}
							>
								✕
							</button>
							{errors.exercises?.[index]?.name && (
								<p className="form-error exercise-error">
									{errors.exercises?.[index]?.name?.message}
								</p>
							)}
							{errors.exercises?.[index]?.sets && (
								<p className="form-error exercise-error">
									{errors.exercises?.[index]?.sets?.message}
								</p>
							)}
							{errors.exercises?.[index]?.reps && (
								<p className="form-error exercise-error">
									{errors.exercises?.[index]?.reps?.message}
								</p>
							)}
							{errors.exercises?.[index]?.weight && (
								<p className="form-error exercise-error">
									{errors.exercises?.[index]?.weight?.message}
								</p>
							)}
						</div>
					);
				})}
			</div>
			<div className="workout-form-actions">
				{onClose && (
					<button type="button" onClick={onClose} className="btn btn-ghost">
						Cancel
					</button>
				)}
				<button type="submit" className="btn btn-primary">
					Save workout
				</button>
			</div>
		</form>
	);
};

export default WorkoutForm;
