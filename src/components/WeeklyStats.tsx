import { Col, ProgressBar } from "react-bootstrap";
import { useWorkout } from "../context/WorkoutContext";
import { getWeekStart } from "../utils/date";

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
		<>
			<Col md={6} lg={4}>
				<section className="bento-card bento-card--hero stat-goal fade-in">
					<p className="bento-label">This week · Weekly goal</p>
					<div className="d-flex align-items-baseline gap-2 mb-3">
						<span className="bento-number" data-stat="workouts">
							{workoutCount}
						</span>
						<span className="stat-of">/ {weekly_goal} workouts</span>
					</div>
					<ProgressBar
						now={progressGoal}
						aria-label="Weekly goal progress"
						className="mb-2"
					/>
					{workoutCount >= weekly_goal ? (
						<p className="goal-done mb-0">Goal reached! 🎉</p>
					) : (
						<p className="text-body-secondary small mb-0">
							{weekly_goal - workoutCount} to go this week
						</p>
					)}
				</section>
			</Col>

			<Col xs={6} md={3} lg={2}>
				<section className="bento-card stat-tile fade-in fade-in-delay-1">
					<p className="bento-label">Minutes</p>
					<span className="stat-value" data-stat="minutes">
						{totalMinutes}
					</span>
				</section>
			</Col>

			<Col xs={6} md={3} lg={2}>
				<section className="bento-card stat-tile fade-in fade-in-delay-2">
					<p className="bento-label">Heaviest lift</p>
					<span className="stat-value" data-stat="heaviest">
						{heaviestWeight}
						<span className="stat-unit">kg</span>
					</span>
				</section>
			</Col>
		</>
	);
};

export default WeeklyStats;
