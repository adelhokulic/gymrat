import { Workout } from "../types/workoutTypes";
import "./WorkoutCard.css";

type WorkoutCardProp = {
	workout: Workout;
};

const WorkoutCard = ({ workout }: WorkoutCardProp) => {
	return (
		<article className="workout-card">
			<header className="workout-card-header">
				<div className="workout-card-info">
					<span className="workout-card-date">{workout.date}</span>
					<span className={`workout-badge workout-badge--${workout.type}`}>
						{workout.type}
					</span>
				</div>
				<span className="workout-card-duration">{workout.duration} min</span>
			</header>

			<ul className="workout-exercises">
				{workout.exercises.map((exercise) => {
					return (
						<li key={exercise.id} className="workout-exercise">
							<span className="workout-exercise-name">{exercise.name}</span>
							<span className="workout-exercise-stats">
								{exercise.sets} sets × {exercise.reps} reps · {exercise.weight} kg
							</span>
							{/* TODO (sljedeći korak): na klik obriši ovu vježbu (deleteExercise) */}
							<button
								type="button"
								className="workout-exercise-remove"
								aria-label="Remove exercise"
							>
								✕
							</button>
						</li>
					);
				})}
			</ul>

			<footer className="workout-card-actions">
				{/* TODO (sljedeći korak): na klik prebaci karticu u formu za izmjenu */}
				<button type="button" className="card-btn card-btn--edit">
					Edit
				</button>
				{/* TODO (sljedeći korak): na klik obriši trening (deleteWorkout) */}
				<button type="button" className="card-btn card-btn--delete">
					Delete
				</button>
			</footer>
		</article>
	);
};

export default WorkoutCard;
