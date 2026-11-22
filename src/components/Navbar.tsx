import { Button, Container, Navbar as BsNavbar } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logout } = useAuth();
	const initials = user?.name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2);

	return (
		<BsNavbar sticky="top" className="app-navbar py-3">
			<Container>
				<BsNavbar.Brand className="app-brand">
					GymRat<span className="brand-dot">.</span>
				</BsNavbar.Brand>

				<div className="d-flex align-items-center gap-2 gap-sm-3 min-w-0">
					<span className="avatar" aria-hidden="true">
						{initials}
					</span>
					<span className="navbar-name text-truncate">{user?.name}</span>
					<Button
						onClick={() => logout()}
						type="button"
						variant="outline-secondary"
						size="sm"
						className="flex-shrink-0"
					>
						Log out
					</Button>
				</div>
			</Container>
		</BsNavbar>
	);
};

export default Navbar;
