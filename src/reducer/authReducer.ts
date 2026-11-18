import { AuthAction, AuthState } from "../types/userTypes";

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, user: action.payload };
		case "LOGOUT":
			return { ...state, user: null };
		default:
			return state;
	}
};

export default authReducer;
