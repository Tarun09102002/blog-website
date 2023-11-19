import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Blogs.scss";

function Blogs() {
	const [blogs, setBlogs] = useState([]);
	const navigate = useNavigate();
	const getBlogs = async () => {
		const res = await axios
			.get(`${process.env.REACT_APP_SERVER_URL}/blogs`)
			.then((res) => {
				console.log(res);
				setBlogs(res.data.blogs);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const goToBlog = (blog) => {
		console.log(blog);
		navigate(`/blog/${blog._id}`);
	};
	useEffect(() => {
		getBlogs();
	}, []);
	return (
		<div className="blogs-container flex flex-col items-center">
			<h1 className="text-3xl font-bold my-5">Blogs</h1>
			<div className="flex flex-col w-full gap-8 items-center">
				{blogs.map((blog) => {
					return (
						<div
							className="blog-card border-solid py-4 border-y-2 border-black flex flex-row items-center justify-between px-5 w-[60%]"
							key={blog._id}
						>
							<div className="flex flex-col">
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
								<div className="flex flex-wrap gap-5 my-2">
									{blog.themes.map((theme, ind) => {
										return (
											<div
												className="text-xs font-semibold text-white bg-gray-600 px-2 py-1 rounded-md"
												key={ind}
											>
												{theme.value}
											</div>
										);
									})}
								</div>
								<p className="text-md">{blog.description}</p>
							</div>
							<div className="flex flex-col">
								<img
									src={blog.image}
									alt="blog"
									className="w-40 h-40 object-cover shadow-md shadow-gray-600 rounded-lg"
									onClick={() => goToBlog(blog)}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Blogs;
