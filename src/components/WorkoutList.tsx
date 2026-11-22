import { useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useWorkout } from "../context/WorkoutContext";
import WorkoutCard from "./WorkoutCard";
import { WorkoutType, workoutTypes } from "../types/workoutTypes";

const WorkoutList = () => {
	const [typeFilter, setTypeFilter] = useState<WorkoutType | "all">("all");
	const { workouts } = useWorkout();

	if (workouts.length === 0) {
		return (
			<section className="bento-card empty-state text-center fade-in">
				<span className="empty-icon" aria-hidden="true">
					🏋️
				</span>
				<h2 className="h5 fw-bold mt-3">No workouts yet</h2>
				<p className="text-body-secondary mb-0">
					Add your first one using the form.
				</p>
			</section>
		);
	}
	const filteredWorkouts =
		typeFilter === "all"
			? workouts
			: workouts.filter((workout) => workout.type === typeFilter);

	return (
		<section>
			<div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
				<h2 className="section-title mb-0 d-flex align-items-center gap-2">
					Your workouts
					<Badge pill bg="" className="count-badge">
						{workouts.length}
					</Badge>
				</h2>
				<div
					className="d-flex flex-wrap gap-2"
					role="group"
					aria-label="Filter by type"
				>
					<Button
						className="filter-btn"
						variant="outline-primary"
						size="sm"
						active={typeFilter === "all"}
						type="button"
						onClick={() => setTypeFilter("all")}
					>
						All
					</Button>
					{workoutTypes.map((type) => {
						return (
							<Button
								className="filter-btn text-capitalize"
								variant="outline-primary"
								size="sm"
								active={typeFilter === type}
								type="button"
								key={type}
								onClick={() => setTypeFilter(type)}
							>
								{type}
							</Button>
						);
					})}
				</div>
			</div>

			{filteredWorkouts.length === 0 && (
				<p className="bento-card text-center text-body-secondary mb-0">
					No {typeFilter} workouts yet.
				</p>
			)}

			<div className="workout-grid d-grid gap-3">
				{filteredWorkouts.map((workout) => (
					<WorkoutCard workout={workout} key={workout.id} />
				))}
			</div>
		</section>
	);
};

export default WorkoutList;
