import { useState } from "react";
import "./Register.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	});
	const navigate = useNavigate();
	const inputs = [
		{
			name: "Name",
			value: "name",
			placeholder: "Name",
			type: "text",
		},
		{
			name: "Email",
			value: "email",
			placeholder: "Email",
			type: "email",
		},
		{
			name: "Username",
			value: "username",
			placeholder: "Username",
			type: "text",
		},
		{
			name: "Password",
			value: "password",
			placeholder: "Password",
			type: "password",
		},
		{
			name: "Confirm Password",
			value: "confirmPassword",
			placeholder: "Confirm Password",
			type: "password",
		},
	];
	const inputClass =
		"p-3 border-2 border-gray-300 rounded-md w-80 focus:outline-none";

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await axios
			.post(`${process.env.REACT_APP_SERVER_URL}/register`, credentials)
			.then((res) => {
				console.log(res);
				navigate("/login");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="RegisterContainer flex flex-col gap-5 mt-5">
			<h1 className="text-2xl font-bold text-center">Register</h1>
			<form
				className="flex flex-col gap-5 w-full items-center"
				onSubmit={handleSubmit}
			>
				{inputs.map((input, ind) => {
					return (
						<input
							key={ind}
							type={input.type}
							placeholder={input.placeholder}
							value={credentials[input.value]}
							onChange={(e) =>
								setCredentials({
									...credentials,
									[input.value]: e.target.value,
								})
							}
							className={inputClass}
						/>
					);
				})}
				<Link to="/login" className="text-center text-blue-800 my-2">
					{" "}
					Already have an account? Login
				</Link>
				<button
					type="submit"
					className="w-auto px-8 py-4  border-2 border-black rounded-md"
				>
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;
