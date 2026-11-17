import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { AuthContextType } from "../types/userTypes";
import authReducer from "../reducer/authReducer";
import users from "../data/users.json";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export const AuthContext = createContext<AuthContextType | null>(null);
const AUTH_KEY = "auth";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, { user: null }, (values) =>
		loadFromStorage(AUTH_KEY, values),
	);
	useEffect(() => {
		saveToStorage(AUTH_KEY, state);
	}, [state]);

	const login = (username: string, password: string) => {
		const foundUser = users.find(
			(user) => user.username === username && user.password === password,
		);

		if (foundUser) {
			dispatch({ type: "LOGIN", payload: foundUser });
			return true;
		}
		return false;
	};

	const logout = () => {
		dispatch({ type: "LOGOUT" });
	};

	return (
		<AuthContext.Provider value={{ user: state.user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("useAuth has to be inside AuthProvider");
	}
	return context;
};
