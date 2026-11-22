import { TemplateAction, TemplateState } from "../types/templateTypes";

const templateReducer = (
	state: TemplateState,
	action: TemplateAction,
): TemplateState => {
	switch (action.type) {
		case "ADD_TEMPLATE":
			return { ...state, templates: [...state.templates, action.payload] };

		case "DELETE_TEMPLATE":
			return {
				...state,
				templates: state.templates.filter(
					(template) => template.id !== action.payload,
				),
			};

		default:
			return state;
	}
};

export default templateReducer;
