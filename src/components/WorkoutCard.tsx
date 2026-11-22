import { useState } from "react";
import { Button } from "react-bootstrap";
import { useWorkout } from "../context/WorkoutContext";
import { Workout } from "../types/workoutTypes";
import WorkoutForm from "./WorkoutForm";
import { useTemplate } from "../context/TemplateContext";

type WorkoutCardProp = {
	workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProp) => {
	const { deleteWorkout, deleteExercise } = useWorkout();
	const [isWorkoutEditing, setIsWorkoutEditing] = useState(false);
	const { addTemplate } = useTemplate();

	const onNameTemplate = () => {
		const name = window.prompt("Template name");
		if (name === null || name.trim() === "") {
			return;
		}
		addTemplate(name.trim(), workout);
	};

	const displayDate = new Date(`${workout.date}T00:00:00`).toLocaleDateString(
		"en-GB",
		{ weekday: "short", day: "numeric", month: "short", year: "numeric" },
	);

	return isWorkoutEditing ? (
		<WorkoutForm workout={workout} onClose={() => setIsWorkoutEditing(false)} />
	) : (
		<article className={`bento-card workout-card workout-card--${workout.type}`}>
			<header className="d-flex align-items-start justify-content-between gap-3 mb-3">
				<div>
					<span className={`type-badge type-badge--${workout.type}`}>
						{workout.type}
					</span>
					<h3 className="workout-card-date mt-2 mb-0">{displayDate}</h3>
				</div>
				<span className="workout-card-duration">{workout.duration} min</span>
			</header>

			<ul className="workout-exercises">
				{workout.exercises.map((exercise) => {
					return (
						<li key={exercise.id} className="workout-exercise">
							<span className="workout-exercise-name">{exercise.name}</span>
							<span className="workout-exercise-stats">
								{exercise.sets} sets × {exercise.reps} reps · {exercise.weight}{" "}
								kg
							</span>
							<button
								onClick={() => deleteExercise(workout.id, exercise.id)}
								type="button"
								className="workout-exercise-remove"
								aria-label="Remove exercise"
								disabled={workout.exercises.length === 1}
							>
								✕
							</button>
						</li>
					);
				})}
			</ul>

			<footer className="d-flex flex-wrap align-items-center gap-2 mt-3">
				<Button
					onClick={() => onNameTemplate()}
					type="button"
					variant="link"
					size="sm"
					className="template-link me-auto px-0"
				>
					Save as template
				</Button>
				<Button
					onClick={() => setIsWorkoutEditing(true)}
					type="button"
					variant="outline-secondary"
					size="sm"
				>
					Edit
				</Button>
				<Button
					onClick={() => deleteWorkout(workout.id)}
					type="button"
					variant="outline-danger"
					size="sm"
				>
					Delete
				</Button>
			</footer>
		</article>
	);
};

export default WorkoutCard;
