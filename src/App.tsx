import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import WorkoutForm from "./components/WorkoutForm";
import { useAuth } from "./context/AuthContext";

const App = () => {
	const { user } = useAuth();
	return (
		<>
			{user ? (
				<>
					<Navbar />
					<main className="app-main">
						<WorkoutForm />
					</main>
				</>
			) : (
				<Login />
			)}
		</>
	);
};

export default App;
