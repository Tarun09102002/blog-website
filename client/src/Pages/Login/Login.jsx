import { useState } from "react";
import "./Login.scss";
import axios from "axios";

function Login() {
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});
	const inputClass =
		"p-3 border-2 border-gray-300 rounded-md w-80 focus:outline-none";

	const handleSubmit = (e) => {
		e.preventDefault();
		const res = axios
			.post(`${process.env.REACT_APP_SERVER_URL}/login`, credentials)
			.then((res) => {
				console.log(res);
				sessionStorage.setItem("token", res.data.token);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="LoginContainer">
			<h1 className="text-2xl font-bold text-center">Login</h1>
			<form
				className="flex flex-col gap-5 w-full items-center"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					placeholder="Username"
					value={credentials.username}
					onChange={(e) =>
						setCredentials({
							...credentials,
							username: e.target.value,
						})
					}
					className={inputClass}
				/>
				<input
					type="password"
					placeholder="Password"
					value={credentials.password}
					onChange={(e) =>
						setCredentials({
							...credentials,
							password: e.target.value,
						})
					}
					className={inputClass}
				/>
				<button
					type="submit"
					className="w-auto px-8 py-4  border-2 border-black rounded-md"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
