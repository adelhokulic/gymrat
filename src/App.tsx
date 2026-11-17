import "./App.css";
import { useAuth } from "./context/AuthContext";

const App = () => {
	const { user, login, logout } = useAuth();
	console.log(user);
	return <button onClick={() => login("adel", "123456")}>Klikni</button>;
};

export default App;
