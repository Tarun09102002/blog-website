import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ViewBlog.scss";

function ViewBlog() {
	const id = useParams().id;
	const [blog, setBlog] = useState(null);
	const getBlog = async () => {
		const res = await axios
			.get(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)
			.then((res) => {
				console.log(res);
				setBlog(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		getBlog();
	}, []);

	return (
		<div className="flex flex-col items-center py-16">
			{blog && (
				<div className="flex flex-col gap-5 w-1/2">
					<h1 className="text-[2rem] font-bold ">{blog.title}</h1>
					<div className="text-[1.3rem] font-normal text-gray-500 ">
						{blog.description}
					</div>
					<div className="flex flex-wrap gap-5 my-4">
						{blog.themes &&
							blog.themes.map((theme) => {
								return (
									<div
										className="text-xs font-semibold text-white bg-gray-600 px-2 py-1 rounded-md"
										key={theme.value}
									>
										{theme.value}
									</div>
								);
							})}
					</div>
					<div className="flex flex-row text-gray-500 gap-5 items-center">
						<div className="author text-lg">{blog.author.username}</div>
						<div className="date">{blog.date.slice(0, 10)}</div>
					</div>
					<img src={blog.image} alt="" className="w-full" />
					<div
						dangerouslySetInnerHTML={{ __html: blog.content }}
						className="w-full my-3 leading-8 content"
					/>
				</div>
			)}
		</div>
	);
}

export default ViewBlog;
