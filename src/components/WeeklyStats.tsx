import { useWorkout } from "../context/WorkoutContext";
import { getWeekStart } from "../utils/date";
import "./WeeklyStats.css";

const weekly_goal = 4;

const WeeklyStats = () => {
	const { workouts } = useWorkout();
	const weekStart = getWeekStart();

	const thisWeekWorkouts = workouts.filter(
		(workout) => workout.date >= weekStart,
	);
	const workoutCount = thisWeekWorkouts.length;
	const progressGoal = Math.min((workoutCount / weekly_goal) * 100, 100);
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

			<div className="weekly-goal">
				<div className="weekly-goal-header">
					<span className="weekly-goal-label">Weekly goal</span>
					<span className="weekly-goal-count">
						{workoutCount} / {weekly_goal} workouts
					</span>
				</div>

				<div
					className="weekly-goal-track"
					role="progressbar"
					aria-label="Weekly goal progress"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={Math.round(progressGoal)}
				>
					{/* TODO: width neka bude `${progressGoal}%` */}
					<div
						className="weekly-goal-fill"
						style={{ width: `${progressGoal}%` }}
					/>
				</div>

				{/* TODO: prikaži ovaj <p> samo ako je workoutCount >= weekly_goal */}
				<p className="weekly-goal-done">Goal reached! 🎉</p>
			</div>
		</section>
	);
};

export default WeeklyStats;
