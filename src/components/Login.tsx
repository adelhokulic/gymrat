import { useForm } from "react-hook-form";
import { LoginFormValues } from "../types/userTypes";
import "./Login.css";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();

	const { login } = useAuth();
	const [errorMessage, setErrorMessage] = useState<string>("");

	const onSubmit = (data: LoginFormValues) => {
		const isLoggedIn = login(data.username, data.password);

		if (isLoggedIn) {
			setErrorMessage("");
			return;
		} else {
			setErrorMessage("Wrong username or password");
		}
	};

	return (
		<div className="login-page">
			<form onSubmit={handleSubmit(onSubmit)} className="login-card" noValidate>
				<h1 className="login-title">GymRat</h1>
				<p className="login-subtitle">Log in to your training journal</p>

				<div className="login-field">
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						autoComplete="username"
						{...register("username", { required: "Username is required" })}
					/>
					{errors.username && (
						<p className="login-error">{errors.username.message}</p>
					)}
				</div>

				<div className="login-field">
					<label htmlFor="password">Password</label>
					<input
						{...register("password", { required: "Password is required" })}
						id="password"
						type="password"
						autoComplete="current-password"
					/>
					{errors.password && (
						<p className="login-error">{errors.password.message}</p>
					)}
				</div>

				{errorMessage !== "" && (
					<p className="login-error login-error--form">{errorMessage}</p>
				)}

				<button type="submit" className="login-button">
					Log in
				</button>
			</form>
		</div>
	);
};

export default Login;
