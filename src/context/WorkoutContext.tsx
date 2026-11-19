import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { NewWorkout, Workout, WorkoutContextType } from "../types/workoutTypes";
import workoutReducer from "../reducer/workoutReducer";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { useAuth } from "./AuthContext";

export const WorkoutContext = createContext<WorkoutContextType | null>(null);
const WORKOUT_KEY = "workouts";
export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useAuth();
	const [state, dispatch] = useReducer(
		workoutReducer,
		{ workouts: [] },
		(values) => loadFromStorage(WORKOUT_KEY, values),
	);
	const userWorkouts = state.workouts.filter(
		(workout) => workout.userId === user?.id,
	);

	useEffect(() => {
		saveToStorage(WORKOUT_KEY, state);
	}, [state]);

	const addWorkout = (newWorkout: NewWorkout) => {
		if (!user) return;
		dispatch({
			type: "ADD_WORKOUT",
			payload: { ...newWorkout, id: Date.now(), userId: user.id },
		});
	};
	const updateWorkout = (workout: Workout) => {
		dispatch({ type: "UPDATE_WORKOUT", payload: workout });
	};
	const deleteWorkout = (id: number) => {
		dispatch({ type: "DELETE_WORKOUT", payload: id });
	};
	const deleteExercise = (workoutId: number, exerciseId: number) => {
		dispatch({ type: "DELETE_EXERCISE", payload: { workoutId, exerciseId } });
	};

	return (
		<WorkoutContext.Provider
			value={{
				workouts: userWorkouts,
				addWorkout,
				updateWorkout,
				deleteExercise,
				deleteWorkout,
			}}
		>
			{children}
		</WorkoutContext.Provider>
	);
};

export const useWorkout = () => {
	const context = useContext(WorkoutContext);
	if (context === null) {
		throw new Error("useWorkout has to be inside WorkoutProvider");
	}
	return context;
};
