import { Col, Container, Row } from "react-bootstrap";
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

	if (!user) {
		return <Login />;
	}

	const firstName = user.name.split(" ")[0];

	return (
		<>
			<Navbar />
			<main className="page-main">
				<Container>
					<header className="fade-in mb-4 mb-lg-5">
						<p className="hero-greeting mb-1">Hi, {firstName} 👋</p>
						<h1 className="page-title mb-0">Your training journal</h1>
					</header>

					<Row className="g-3 g-lg-4 mb-4 mb-lg-5">
						<WeeklyStats />
						<Col lg={4}>
							<PersonalRecords />
						</Col>
					</Row>

					<Row className="g-4 align-items-start">
						<Col lg={5}>
							<WorkoutForm />
						</Col>
						<Col lg={7}>
							<WorkoutList />
						</Col>
					</Row>
				</Container>
			</main>
		</>
	);
};

export default App;
