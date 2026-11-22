import { useWorkout } from "../context/WorkoutContext";
import { getWeekStart } from "../utils/date";
import "./WeeklyStats.css";

const WeeklyStats = () => {
	const { workouts } = useWorkout();
	const weekStart = getWeekStart();

	const thisWeekWorkouts = workouts.filter(
		(workout) => workout.date >= weekStart,
	);
	const workoutCount = thisWeekWorkouts.length;
	const totalMinutes = thisWeekWorkouts.reduce(
		(sum, workout) => sum + workout.duration,
		0,
	);
	const allWeights = thisWeekWorkouts.flatMap((workout) =>
		workout.exercises.map((exercise) => exercise.weight),
	);
	const heaviestWeight = Math.max(0, ...allWeights);

	return (
		<section className="weekly-stats">
			<h2 className="weekly-stats-title">This week</h2>

			<div className="weekly-stats-grid">
				<div className="stat-tile">
					<span className="stat-value">{workoutCount}</span>
					<span className="stat-label">Workouts</span>
				</div>

				<div className="stat-tile">
					<span className="stat-value">{totalMinutes}</span>
					<span className="stat-label">Minutes</span>
				</div>

				<div className="stat-tile">
					<span className="stat-value">
						{heaviestWeight}
						<span className="stat-unit">kg</span>
					</span>
					<span className="stat-label">Heaviest lift</span>
				</div>
			</div>
		</section>
	);
};

export default WeeklyStats;
