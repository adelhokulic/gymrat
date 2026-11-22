import { useForm } from "react-hook-form";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { LoginFormValues } from "../types/userTypes";
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
		<main className="login-page">
			<Container className="d-flex justify-content-center">
				<div className="login-card bento-card bento-card--hero fade-in">
					<p className="app-brand mb-4">
						GymRat<span className="brand-dot">.</span>
					</p>
					<h1 className="login-title mb-2">Welcome back</h1>
					<p className="text-body-secondary mb-4">
						Log in to your training journal
					</p>

					<Form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Form.Group className="mb-3" controlId="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								autoComplete="username"
								isInvalid={!!errors.username}
								{...register("username", {
									required: "Username is required",
								})}
							/>
							{errors.username && (
								<Form.Control.Feedback type="invalid">
									{errors.username.message}
								</Form.Control.Feedback>
							)}
						</Form.Group>

						<Form.Group className="mb-4" controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								autoComplete="current-password"
								isInvalid={!!errors.password}
								{...register("password", {
									required: "Password is required",
								})}
							/>
							{errors.password && (
								<Form.Control.Feedback type="invalid">
									{errors.password.message}
								</Form.Control.Feedback>
							)}
						</Form.Group>

						{errorMessage !== "" && (
							<Alert variant="danger" className="py-2 text-center small">
								{errorMessage}
							</Alert>
						)}

						<Button type="submit" variant="primary" size="lg" className="w-100">
							Log in
						</Button>
					</Form>

					<p className="demo-hint mt-4 mb-0">
						Demo: username <code>user</code>, password <code>user</code>
					</p>
				</div>
			</Container>
		</main>
	);
};

export default Login;
