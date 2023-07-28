import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const navigate = useNavigate();

	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Welcome to this Authentication System Page</h1>
			<p className="my-5">In order to see it's magic, first you need to create your account and log in. After that you will be redirected to your private page!</p>
			<button className="signUp" onClick={(() => navigate("/sign-up"))}>Create an account</button>			
		</div>
	);
};
