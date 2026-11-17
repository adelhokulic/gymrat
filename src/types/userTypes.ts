export type User = {
	id: number;
	name: string;
	username: string;
	password: string;
};

export type AuthState = {
	user: User | null;
};

export type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export type AuthContextType = {
	user: User | null;
	login: (username: string, password: string) => boolean;
	logout: () => void;
};

export type LoginFormValues = {
	username: string;
	password: string;
};
