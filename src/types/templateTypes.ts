import { NewExercise, Workout, WorkoutType } from "./workoutTypes";

export type Template = {
	id: number;
	userId: number;
	name: string;
	type: WorkoutType;
	duration: number;
	exercises: NewExercise[];
};
export type TemplateState = {
	templates: Template[];
};
export type TemplateAction =
	| { type: "ADD_TEMPLATE"; payload: Template }
	| { type: "DELETE_TEMPLATE"; payload: number };

export type TemplateContextType = {
	templates: Template[];
	addTemplate: (name: string, workout: Workout) => void;
	deleteTemplate: (id: number) => void;
};
