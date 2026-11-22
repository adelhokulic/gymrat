import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useReducer,
} from "react";

import { loadFromStorage, saveToStorage } from "../utils/storage";
import { useAuth } from "./AuthContext";
import { TemplateContextType } from "../types/templateTypes";
import templateReducer from "../reducer/templateReducer";
import { Workout } from "../types/workoutTypes";

export const TemplateContext = createContext<TemplateContextType | null>(null);
const TEMPLATE_KEY = "templates";
export const TemplateProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useAuth();
	const [state, dispatch] = useReducer(
		templateReducer,
		{ templates: [] },
		(values) => loadFromStorage(TEMPLATE_KEY, values),
	);
	const userTemplates = state.templates.filter(
		(template) => template.userId === user?.id,
	);

	useEffect(() => {
		saveToStorage(TEMPLATE_KEY, state);
	}, [state]);

	const addTemplate = (name: string, workout: Workout) => {
		if (!user) return;
		dispatch({
			type: "ADD_TEMPLATE",
			payload: {
				id: Date.now(),
				userId: user.id,
				name: name,
				type: workout.type,
				duration: workout.duration,
				exercises: workout.exercises.map(({ id, ...rest }) => rest),
			},
		});
	};

	const deleteTemplate = (id: number) => {
		dispatch({ type: "DELETE_TEMPLATE", payload: id });
	};

	return (
		<TemplateContext.Provider
			value={{
				templates: userTemplates,
				addTemplate,
				deleteTemplate,
			}}
		>
			{children}
		</TemplateContext.Provider>
	);
};

export const useTemplate = () => {
	const context = useContext(TemplateContext);
	if (context === null) {
		throw new Error("useTemplate has to be inside TemplateProvider");
	}
	return context;
};
