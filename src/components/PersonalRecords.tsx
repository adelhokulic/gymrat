import { useWorkout } from "../context/WorkoutContext";
import "./PersonalRecords.css";

const PersonalRecords = () => {
	const { workouts } = useWorkout();
	const allExercises = workouts.flatMap((workout) => workout.exercises);
	const records = allExercises.reduce<Record<string, number>>(
		(records, exercise) => {
			const key = exercise.name.trim().toLowerCase();
			if (records[key] === undefined || exercise.weight > records[key]) {
				return { ...records, [key]: exercise.weight };
			}
			return records;
		},
		{},
	);

	const sortedRecords = Object.entries(records).sort(
		(name, weight) => weight[1] - name[1],
	);

	if (sortedRecords.length === 0) {
		return (
			<section className="personal-records">
				<h2 className="personal-records-title">Personal records</h2>
				<p className="personal-records-empty">
					Add a workout to see your records.
				</p>
			</section>
		);
	}

	if (sortedRecords.length > 0) {
		return (
			<section className="personal-records">
				<h2 className="personal-records-title">Personal records</h2>

				<ol className="personal-records-list">
					{sortedRecords.map(([name, weight], index) => {
						return (
							<li key={name} className="record">
								<span className="record-rank">{index + 1}</span>
								<span className="record-name">{name}</span>
								<span className="record-weight">
									{weight}
									<span className="record-unit">kg</span>
								</span>
							</li>
						);
					})}
				</ol>
			</section>
		);
	}
};

export default PersonalRecords;
