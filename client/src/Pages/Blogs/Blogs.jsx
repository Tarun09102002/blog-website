import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Blogs.scss";
import Select from "react-select";
import data from "../../utils/data.json";
import { Hourglass } from "react-loader-spinner";

function Blogs({ isAuthorized }) {
	const [isLoading, setIsLoading] = useState(true);
	const [blogs, setBlogs] = useState([]);
	const [filteredBlogs, setFilteredBlogs] = useState([]);
	const [nav, setNav] = useState("all");
	const [filter, setFilter] = useState([]);
	const options = data.themes.map((theme) => {
		return { value: theme, label: theme };
	});
	console.log(isAuthorized);

	const navs = [
		{
			name: "All Blogs",
			value: "all",
		},
		{
			name: "My Blogs",
			value: "my",
		},
	];
	const navigate = useNavigate();
	const getBlogs = async () => {
		const res = await axios
			.get(`${process.env.REACT_APP_SERVER_URL}/blogs`)
			.then((res) => {
				console.log(res);
				setBlogs(res.data.blogs);
				setFilteredBlogs(res.data.blogs);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getMyBlogs = async () => {
		const token = sessionStorage.getItem("token");
		console.log("here");
		const res = await axios
			.get(`${process.env.REACT_APP_SERVER_URL}/blogs`, {
				headers: { token },
			})
			.then((res) => {
				console.log(res);
				setBlogs(res.data.blogs);
				setFilteredBlogs(res.data.blogs);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const goToBlog = (blog) => {
		navigate(`/blog/${blog._id}`);
	};
	const deleteBlog = async (blog) => {
		const ans = window.confirm("Are you sure you want to delete this blog?");
		console.log(ans);
		if (!ans) return;

		const token = sessionStorage.getItem("token");
		const res = await axios
			.delete(`${process.env.REACT_APP_SERVER_URL}/blog/${blog._id}`, {
				headers: { token },
			})
			.then((res) => {
				console.log(res);
				getMyBlogs();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (nav === "all") getBlogs();
		else if (nav === "my") getMyBlogs();
	}, [nav]);

	useEffect(() => {
		console.log(filteredBlogs);
	}, [filteredBlogs]);

	const filterBlogs = (e) => {
		if (e.length === 0) return setFilteredBlogs(blogs);
		console.log(e);
		const filteredBlogs = blogs.filter((blog) => {
			let flag = false;
			e.forEach((filterItem) => {
				blog.themes.forEach((theme) => {
					console.log(theme, filterItem);
					if (theme.value === filterItem.value) flag = true;
				});
			});
			return flag;
		});
		setFilteredBlogs(filteredBlogs);
	};

	useEffect(() => {
		getBlogs();
	}, []);
	return (
		<div className="blogs-container flex flex-col items-center">
			<h1 className="text-3xl font-bold my-5">Blogs</h1>
			<div className="flex flex-col lg:flex-row gap-5 mb-5">
				<div className="flex flex-row gap-5">
					{navs.map((navItem) => {
						return (
							<div
								className={`nav-item ${
									nav === navItem.value && "nav-item-active"
								}`}
								key={navItem.value}
								onClick={() => setNav(navItem.value)}
							>
								{navItem.name}
							</div>
						);
					})}
				</div>
				<Select
					options={options}
					isMulti={true}
					placeholder="filter by tags"
					className="max-w-[500px] min-w-[300px] border-solid border-2 border-blue-800 rounded-md text-blue-800"
					onChange={(e) => filterBlogs(e)}
				/>
			</div>
			<div className="flex flex-col w-full gap-8 items-center mb-10">
				{isLoading ? (
					<Hourglass
						visible={true}
						height="80"
						width="80"
						ariaLabel="hourglass-loading"
						wrapperStyle={{}}
						wrapperClass=""
						colors={["#306cce", "#72a1ed"]}
					/>
				) : filteredBlogs.length > 0 ? (
					filteredBlogs.map((blog) => {
						return (
							<div
								className="blog-card border-solid py-4 shadow-md shadow-gray-500 rounded-md flex flex-row gap-3 items-center justify-between px-5 lg:w-[60%] w-[90%] "
								key={blog._id}
							>
								<div className="flex flex-col w-3/4">
									<div className="flex mt-2 text-gray-600 text-sm gap-2">
										<div className=" ">{blog.author.username} .</div>
										<div className="">{blog.date.slice(0, 10)}</div>
									</div>

									<h1
										className="text-lg font-semibold cursor-pointer"
										onClick={() => goToBlog(blog)}
									>
										{blog.title}
									</h1>
									<div className="flex flex-wrap gap-2 my-2">
										{blog.themes.map((theme, ind) => {
											return (
												<div
													className="lg:text-xs text-[0.6rem] font-semibold text-white bg-[#1e40af] px-2 py-1 rounded-md"
													key={ind}
												>
													{theme.value}
												</div>
											);
										})}
									</div>
									<p className="text-md mt-3 hidden lg:block">
										{blog.description}
									</p>
									{nav === "my" && (
										<div className="buttons flex flex-row">
											<button
												className="px-4 py-2 bg-red-500 text-white rounded-md my-4"
												onClick={() => deleteBlog(blog)}
											>
												Delete
											</button>
										</div>
									)}
								</div>
								<div className="flex flex-col">
									<img
										src={blog.image}
										alt="blog"
										className="lg:w-40 lg:h-40 w-28 h-28 object-cover shadow-md shadow-gray-600 rounded-lg"
										onClick={() => goToBlog(blog)}
									/>
								</div>
							</div>
						);
					})
				) : (
					<div className="text-2xl font-semibold">No blogs found</div>
				)}
			</div>
		</div>
	);
}

export default Blogs;
