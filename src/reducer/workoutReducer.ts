import { WorkoutAction, WorkoutState } from "../types/workoutTypes";

const workoutReducer = (
	state: WorkoutState,
	action: WorkoutAction,
): WorkoutState => {
	switch (action.type) {
		case "ADD_WORKOUT":
			return { ...state, workouts: [...state.workouts, action.payload] };
		case "UPDATE_WORKOUT":
			return {
				...state,
				workouts: state.workouts.map((workout) => {
					return workout.id === action.payload.id ? action.payload : workout;
				}),
			};
		case "DELETE_WORKOUT":
			return {
				...state,
				workouts: state.workouts.filter(
					(workout) => workout.id !== action.payload,
				),
			};
		case "DELETE_EXERCISE":
			return {
				...state,
				workouts: state.workouts.map((workout) => {
					return workout.id === action.payload.workoutId
						? {
								...workout,
								exercises: workout.exercises.filter(
									(exercise) => exercise.id !== action.payload.exerciseId,
								),
							}
						: workout;
				}),
			};
		default:
			return state;
	}
};

export default workoutReducer;
