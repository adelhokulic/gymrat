import { useWorkout } from "../context/WorkoutContext";

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
			<section className="bento-card records-card fade-in fade-in-delay-3">
				<p className="bento-label">Personal records</p>
				<p className="text-body-secondary mb-0">
					Add a workout to see your records.
				</p>
			</section>
		);
	}

	return (
		<section className="bento-card records-card fade-in fade-in-delay-3">
			<p className="bento-label">Personal records</p>

			<ol className="records-list">
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
};

export default PersonalRecords;
