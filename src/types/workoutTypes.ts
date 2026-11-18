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
export type WorkoutState = {
	workouts: Workout[];
};
export type WorkoutAction =
	| { type: "ADD_WORKOUT"; payload: Workout }
	| { type: "UPDATE_WORKOUT"; payload: Workout }
	| { type: "DELETE_WORKOUT"; payload: number }
	| {
			type: "DELETE_EXERCISE";
			payload: { workoutId: number; exerciseId: number };
	  };
