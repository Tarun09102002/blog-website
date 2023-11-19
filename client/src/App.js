import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import {
	Blogs,
	Home,
	Login,
	Register,
	CreateBlog,
	ViewBlog,
} from "./Pages/index.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Navbar from "./Components/Navbar.jsx";
import { useState } from "react";

function App() {
	const isAuthenticated = sessionStorage.getItem("token") !== null;
	const [isAuthorized, setIsAuthorized] = useState(
		sessionStorage.getItem("token") !== null
	);
	function ProtectedPage(props) {
		const { component: Component } = props;
		return isAuthorized ? (
			<div>
				<Navbar />
				<Component isAuthorized={isAuthorized} />
			</div>
		) : (
			<Navigate to="/login" replace />
		);
	}

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home isAuthorized={isAuthorized} />} />
				<Route
					path="/login"
					element={
						isAuthenticated ? (
							<Navigate to="/blogs" replace />
						) : (
							<Login
								setIsAuthorized={setIsAuthorized}
								isAuthorized={isAuthorized}
							/>
						)
					}
				/>
				<Route
					path="/register"
					element={
						isAuthenticated ? <Navigate to="/blogs" replace /> : <Register />
					}
				/>
				<Route path="/blogs" element={<ProtectedPage component={Blogs} />} />
				<Route
					path="/create-blog"
					element={<ProtectedPage component={CreateBlog} />}
				/>
				<Route
					path="/blog/:id"
					element={<ProtectedPage component={ViewBlog} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
