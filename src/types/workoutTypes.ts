export const workoutTypes = ["strength", "cardio", "stretching"] as const;

export type Exercise = {
	id: number;
	name: string;
	sets: number;
	reps: number;
	weight: number;
};
export type WorkoutType = (typeof workoutTypes)[number];

export type Workout = {
	id: number;
	userId: number;
	date: string;
	type: WorkoutType;
	duration: number;
	exercises: Exercise[];
};
