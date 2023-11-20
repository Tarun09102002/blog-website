import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	const logout = () => {
		sessionStorage.removeItem("token");
		const confirm = window.confirm("Are you sure you want to logout?");
		if (!confirm) return;
		window.location.reload();
	};
	return (
		<div className="flex flex-row justify-between w-full px-5 py-5">
			<div>Blogify</div>
			<div className="flex flex-row gap-5">
				<Link to="/">
					<div className="nav-item">Home</div>
				</Link>
				<Link to="/blogs">
					<div className="nav-item">Blogs</div>
				</Link>
				<Link to="/create-blog">
					<div className="nav-item">Create Blog</div>
				</Link>
				<div onClick={logout} className="cursor-pointer">
					Logout
				</div>
			</div>
		</div>
	);
}

export default Navbar;
