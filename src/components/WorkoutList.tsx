import { useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import WorkoutCard from "./WorkoutCard";
import "./WorkoutCard.css";
import { WorkoutType, workoutTypes } from "../types/workoutTypes";

const WorkoutList = () => {
	const [typeFilter, setTypeFilter] = useState<WorkoutType | "all">("all");
	const { workouts } = useWorkout();

	if (workouts.length === 0) {
		return (
			<p className="workout-list-empty">
				No workouts yet. Add your first one using the form.
			</p>
		);
	}
	const filteredWorkouts =
		typeFilter === "all"
			? workouts
			: workouts.filter((workout) => workout.type === typeFilter);

	return (
		<section className="workout-list">
			<h2 className="workout-list-title">Your workouts ({workouts.length})</h2>
			<div className="workout-filters">
				<button
					className={`filter-btn ${typeFilter === "all" ? "active" : ""}`}
					type="button"
					onClick={() => setTypeFilter("all")}
				>
					All
				</button>
				{workoutTypes.map((type) => {
					return (
						<button
							className={`filter-btn ${typeFilter === type ? "active" : ""}`}
							type="button"
							key={type}
							onClick={() => setTypeFilter(type)}
						>
							{type}
						</button>
					);
				})}
			</div>
			{filteredWorkouts.length === 0 && (
				<p className="workout-list-no-results">No {typeFilter} workouts yet.</p>
			)}
			{filteredWorkouts.map((workout) => (
				<WorkoutCard workout={workout} key={workout.id} />
			))}
		</section>
	);
};

export default WorkoutList;
