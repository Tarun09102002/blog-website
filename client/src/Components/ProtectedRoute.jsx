import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = sessionStorage.getItem("token") !== null;
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
			}
		/>
	);
};

export default ProtectedRoute;
