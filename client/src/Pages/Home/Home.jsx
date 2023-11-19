import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

function Home() {
	const Button = ({ text, link }) => (
		<Link to={link} className="w-1/2">
			<button className=" px-8 py-4 w-full border-2 border-blue-800 rounded-md hover:bg-blue-800 hover:text-white">
				{text}
			</button>
		</Link>
	);
	const isAuthenticated = sessionStorage.getItem("token") !== null;
	const authenticatedButtons = [
		{
			text: "Create Blog",
			link: "/create-blog",
		},
		{
			text: "View Blogs",
			link: "/blogs",
		},
	];
	const unAuthenticatedButtons = [
		{
			text: "Login",
			link: "/login",
		},
		{
			text: "Register",
			link: "/register",
		},
	];
	return (
		<div className="home-container flex flex-row w-full items-center min-h-screen">
			<div className="flex flex-col w-1/2 items-center justify-center">
				<h1 className="text-3xl font-bold text-center mb-10">
					Welcome to <span className="text-blue-500">Blogify</span>
				</h1>
				<div className="buttons flex flex-col gap-5 w-full items-center ">
					{isAuthenticated
						? authenticatedButtons.map((button) => (
								<Button text={button.text} link={button.link} />
						  ))
						: unAuthenticatedButtons.map((button) => (
								<Button text={button.text} link={button.link} />
						  ))}
				</div>
			</div>
			<img src="home.jpg" className="w-1/2" alt="" />
		</div>
	);
}

export default Home;
