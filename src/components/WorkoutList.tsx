import { useWorkout } from "../context/WorkoutContext";
import WorkoutCard from "./WorkoutCard";
import "./WorkoutCard.css";

const WorkoutList = () => {
	const { workouts } = useWorkout();

	if (workouts.length === 0) {
		return (
			<p className="workout-list-empty">
				No workouts yet. Add your first one using the form.
			</p>
		);
	}

	return (
		<section className="workout-list">
			<h2 className="workout-list-title">Your workouts ({workouts.length})</h2>
			{workouts.map((workout) => (
				<WorkoutCard workout={workout} key={workout.id} />
			))}
		</section>
	);
};

export default WorkoutList;
