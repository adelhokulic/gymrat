import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
	const { user, logout } = useAuth();
	return (
		<header className="navbar">
			<div className="navbar-inner">
				<span className="navbar-logo">GymRat</span>

				<div className="navbar-user">
					<span className="navbar-name">{user?.name}</span>

					<button
						onClick={() => logout()}
						type="button"
						className="navbar-logout"
					>
						Log out
					</button>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
