import { useEffect, useState } from "react";
import "./CreateBlog.scss";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";
import data from "../../utils/data.json";

function CreateBlog() {
	const navigate = useNavigate();
	const themes = data.themes;
	const [blog, setBlog] = useState({
		title: "",
		description: "",
		content: "",
		themes: [],
		image: "",
	});
	const [options, setOptions] = useState([]);

	const handleEditorChange = (content, editor) => {
		setBlog({ ...blog, content });
	};

	const handleSave = async () => {
		const token = sessionStorage.getItem("token");
		if (!blog.content || !blog.title || !blog.description || !blog.image)
			return alert("Please fill all the fields");

		const res = await axios
			.post(`${process.env.REACT_APP_SERVER_URL}/create-blog`, {
				...blog,
				token: token,
			})
			.then((res) => {
				console.log(res);
				setBlog({
					title: "",
					description: "",
					content: "",
					themes: [],
				});
				navigate("/blogs");
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const filePickerCallback = (callback, value, meta) => {
		let input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");

		input.onchange = function () {
			let file = this.files[0];
			let reader = new FileReader();
			reader.onload = function (e) {
				callback(e.target.result, { alt: file.name });
			};
			reader.readAsDataURL(file);
		};

		input.click();
	};
	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			// The file's text will be printed here
			console.log(reader.result);
			setBlog({ ...blog, image: reader.result });
			// TODO: Send base64 image to the backend
		};
		reader.readAsDataURL(file);
	};
	useEffect(() => {
		const newThemes = themes.map((theme) => {
			return { value: theme, label: theme };
		});
		setOptions(newThemes);
	}, []);
	useEffect(() => {
		console.log(blog);
	}, [blog]);
	return (
		<div className="flex lg:flex-row justify-between flex-col items-center">
			<div className="flex flex-col items-center w-full mb-10 lg:w-1/2 overflow-hidden">
				<h1 className="text-3xl font-bold my-5">Create Blog</h1>
				<input
					type="text"
					placeholder="Title"
					required={true}
					className="border-2 border-black px-5 py-2 rounded-md lg:w-3/4 w-3/4 mb-5"
					onChange={(e) => setBlog({ ...blog, title: e.target.value })}
					value={blog.title}
				/>
				<input
					type="text"
					placeholder="Description"
					className="border-2 border-black px-5 py-2 rounded-md lg:w-3/4 w-3/4 mb-5"
					onChange={(e) => setBlog({ ...blog, description: e.target.value })}
					value={blog.description}
				/>
				<input
					type="file"
					accept="image/*"
					placeholder="Choose image"
					className="border-2 border-black px-5 py-2 rounded-md lg:w-3/4 w-3/4 mb-5"
					onChange={handleImageUpload}
				/>
				<Editor
					initialValue=""
					apiKey="dvkf7m0vxwaitr0wea11af6mpi37z1wd2aq7lynysfhkeii0"
					value={blog.content}
					init={{
						height: 200,
						width: window.screen.width > 768 ? 500 : 300,
						menubar: false,
						selector: "textarea",
						placeholder: "Write your blog here...",
						plugins: [
							"advlist",
							"autolink",
							"lists",
							"link",
							"image",
							"charmap",
							"preview",
							"anchor",
							"searchreplace",
							"visualblocks",
							"code",
							"fullscreen",
							"insertdatetime",
							"media",
							"table",
							"code",
							"help",
							"wordcount",
						],
						toolbar:
							"image media  " +
							"undo redo | formatselect | bold italic |" +
							"alignleft aligncenter alignright alignjustify |" +
							"bullist numlist | removeformat | help",
						file_picker_types: "file image media",
						file_picker_callback: filePickerCallback,
					}}
					onEditorChange={handleEditorChange}
				/>
				<CreatableSelect
					isMulti
					options={options}
					className="w-3/4 sm:w-3/4 mt-10"
					value={blog.themes}
					placeholder="Select themes"
					onChange={(e) => setBlog({ ...blog, themes: e })}
				/>

				<button
					onClick={handleSave}
					className="px-8 py-4 border-2 border-black mt-5 rounded-md"
				>
					Save
				</button>
			</div>
			<div className="lg:w-1/2">
				<img src="createblog.jpg" alt="" />
			</div>
		</div>
	);
}

export default CreateBlog;
