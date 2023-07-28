import React, {useContext} from "react";
import {useNavigate} from "react-router-dom"
import {Context} from "../store/appContext"
import "../../styles/navbar.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const navigate = useNavigate();

	const LogOut = () => {
		actions.logOut();
		navigate("/");
	}

	return (
		<nav className="navbar" id="navbarColor">
			<div className="container">				
				<span className="navbar-brand mb-0 h1">Authentication with JWT</span>				
				<div className="ml-auto">					
					<button className="btn" onClick={() => LogOut()}>Log Out</button>					
				</div>
			</div>
		</nav>
	);
};
