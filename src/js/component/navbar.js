import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-dark mb-3 py-4 px-4">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Lista de contactos</span>
			</Link>
		</nav>
	);
};
