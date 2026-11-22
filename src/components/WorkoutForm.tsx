import { useFieldArray, useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
	Workout,
	WorkoutFormValues,
	workoutTypes,
} from "../types/workoutTypes";
import { useWorkout } from "../context/WorkoutContext";
import { useTemplate } from "../context/TemplateContext";

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
	const { templates, deleteTemplate } = useTemplate();

	const handleTemplate = (value: string) => {
		const id = Number(value);
		const findTemplate = templates.find((template) => template.id === id);
		if (!findTemplate) {
			return;
		}
		reset(
			{
				date: new Date().toISOString().slice(0, 10),
				type: findTemplate.type,
				duration: findTemplate.duration,
				exercises: findTemplate.exercises,
			},
			{ keepDefaultValues: true },
		);
	};

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
		<section
			className={`bento-card workout-form fade-in ${workout ? "workout-form--edit" : ""}`}
		>
			<Form onSubmit={handleSubmit(onSubmit)} noValidate>
				<header className="mb-4">
					<p className="bento-label mb-1">
						{workout ? "Editing" : "Log a session"}
					</p>
					<h2 className="section-title mb-0">
						{workout ? "Edit workout" : "New workout"}
					</h2>
				</header>

				{!workout && templates.length > 0 && (
					<div className="template-picker mb-4">
						<Form.Label htmlFor="template">Template</Form.Label>
						<Form.Select
							id="template"
							onChange={(e) => handleTemplate(e.target.value)}
						>
							<option value="">Use a template…</option>
							{templates.map((template) => {
								return (
									<option key={template.id} value={template.id}>
										{template.name}
									</option>
								);
							})}
						</Form.Select>
						<div className="template-chips">
							{templates.map((template) => (
								<span key={template.id} className="template-chip">
									{template.name}
									<button
										type="button"
										className="template-chip-remove"
										aria-label={`Delete template ${template.name}`}
										onClick={() => deleteTemplate(template.id)}
									>
										✕
									</button>
								</span>
							))}
						</div>
					</div>
				)}

				<Row className="g-3 mb-4">
					<Col xs={12}>
						<Form.Label htmlFor="date">Date</Form.Label>
						<Form.Control
							{...register("date", { required: "Date is required" })}
							id="date"
							type="date"
							isInvalid={!!errors.date}
						/>
						{errors.date && (
							<Form.Control.Feedback type="invalid">
								{errors.date.message}
							</Form.Control.Feedback>
						)}
					</Col>

					<Col xs={6}>
						<Form.Label htmlFor="type">Type</Form.Label>
						<Form.Select
							{...register("type", { required: "Type is required" })}
							id="type"
							className="text-capitalize"
						>
							{workoutTypes.map((workoutType) => {
								return (
									<option key={workoutType} value={workoutType}>
										{workoutType}
									</option>
								);
							})}
						</Form.Select>
					</Col>

					<Col xs={6}>
						<Form.Label htmlFor="duration">Duration (min)</Form.Label>
						<Form.Control
							{...register("duration", {
								valueAsNumber: true,
								required: "Duration is required",
								min: {
									value: 1,
									message: "Duration must be at least 1 minute",
								},
							})}
							id="duration"
							type="number"
							min={1}
							isInvalid={!!errors.duration}
						/>
						{errors.duration && (
							<Form.Control.Feedback type="invalid">
								{errors.duration.message}
							</Form.Control.Feedback>
						)}
					</Col>
				</Row>

				<div className="d-flex align-items-center justify-content-between gap-2 mb-3">
					<h3 className="h6 fw-bold mb-0">Exercises</h3>
					<Button
						onClick={() => append({ name: "", sets: 3, reps: 10, weight: 0 })}
						type="button"
						variant="outline-primary"
						size="sm"
					>
						+ Add exercise
					</Button>
				</div>

				<div className="d-grid gap-2 mb-4">
					{fields.map((field, index) => {
						return (
							<div key={field.id} className="exercise-row">
								<Row className="g-2">
									<Col>
										<Form.Label htmlFor={`exercise-${index}-name`}>
											Name
										</Form.Label>
										<Form.Control
											{...register(`exercises.${index}.name`, {
												required: "Name is required",
											})}
											id={`exercise-${index}-name`}
											type="text"
											placeholder="Bench press"
											isInvalid={!!errors.exercises?.[index]?.name}
										/>
									</Col>
									<Col xs="auto" className="d-flex align-items-end">
										<Button
											onClick={() => remove(index)}
											disabled={fields.length === 1}
											type="button"
											variant="outline-danger"
											className="exercise-remove"
											aria-label={`Remove exercise ${index + 1}`}
										>
											✕
										</Button>
									</Col>
									<div className="w-100" />
									<Col xs={4}>
										<Form.Label htmlFor={`exercise-${index}-sets`}>
											Sets
										</Form.Label>
										<Form.Control
											{...register(`exercises.${index}.sets`, {
												required: "Sets are required",
												valueAsNumber: true,
												min: { value: 1, message: "Sets must be at least 1" },
											})}
											id={`exercise-${index}-sets`}
											type="number"
											min={1}
											isInvalid={!!errors.exercises?.[index]?.sets}
										/>
									</Col>
									<Col xs={4}>
										<Form.Label htmlFor={`exercise-${index}-reps`}>
											Reps
										</Form.Label>
										<Form.Control
											{...register(`exercises.${index}.reps`, {
												required: "Reps are required",
												valueAsNumber: true,
												min: { value: 1, message: "Reps must be at least 1" },
											})}
											id={`exercise-${index}-reps`}
											type="number"
											min={1}
											isInvalid={!!errors.exercises?.[index]?.reps}
										/>
									</Col>
									<Col xs={4}>
										<Form.Label htmlFor={`exercise-${index}-weight`}>
											Kg
										</Form.Label>
										<Form.Control
											{...register(`exercises.${index}.weight`, {
												required: "Weight is required",
												valueAsNumber: true,
												min: { value: 0, message: "Weight must be at least 0" },
											})}
											id={`exercise-${index}-weight`}
											type="number"
											min={0}
											step={0.5}
											isInvalid={!!errors.exercises?.[index]?.weight}
										/>
									</Col>
								</Row>
								{errors.exercises?.[index]?.name && (
									<p className="exercise-error">
										{errors.exercises?.[index]?.name?.message}
									</p>
								)}
								{errors.exercises?.[index]?.sets && (
									<p className="exercise-error">
										{errors.exercises?.[index]?.sets?.message}
									</p>
								)}
								{errors.exercises?.[index]?.reps && (
									<p className="exercise-error">
										{errors.exercises?.[index]?.reps?.message}
									</p>
								)}
								{errors.exercises?.[index]?.weight && (
									<p className="exercise-error">
										{errors.exercises?.[index]?.weight?.message}
									</p>
								)}
							</div>
						);
					})}
				</div>

				<div className="d-flex gap-2">
					{onClose && (
						<Button type="button" onClick={onClose} variant="outline-secondary">
							Cancel
						</Button>
					)}
					<Button type="submit" variant="primary" className="flex-grow-1">
						Save workout
					</Button>
				</div>
			</Form>
		</section>
	);
};

export default WorkoutForm;
