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

function App() {
	const isAuthenticated = sessionStorage.getItem("token") !== null;

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/login"
					element={
						isAuthenticated ? <Navigate to="/blogs" replace /> : <Login />
					}
				/>
				<Route
					path="/register"
					element={
						isAuthenticated ? <Navigate to="/blogs" replace /> : <Register />
					}
				/>
				<Route
					path="/blogs"
					element={
						isAuthenticated ? <Blogs /> : <Navigate to="/login" replace />
					}
				/>
				<Route
					path="/create-blog"
					element={
						isAuthenticated ? <CreateBlog /> : <Navigate to="/login" replace />
					}
				/>
				<Route
					path="/blog/:id"
					element={
						isAuthenticated ? <ViewBlog /> : <Navigate to="/login" replace />
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
