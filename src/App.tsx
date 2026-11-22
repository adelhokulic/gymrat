import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PersonalRecords from "./components/PersonalRecords";
import WeeklyStats from "./components/WeeklyStats";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
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
						<div className="app-sidebar">
							<WeeklyStats />
							<PersonalRecords />
							<WorkoutList />
						</div>
					</main>
				</>
			) : (
				<Login />
			)}
		</>
	);
};

export default App;
