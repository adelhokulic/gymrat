import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

const App = () => {
	const { user } = useAuth();
	return (
		<>
			{user ? (
				<>
					<Navbar />
					<main>Workouts coming soon</main>
				</>
			) : (
				<Login />
			)}
		</>
	);
};

export default App;
