const Blog = require("../models/blog-model");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

exports.create_blog = async (req, res) => {
	const { title, content, description, token, themes } = req.body;
	const id = jwt.verify(token, process.env.JWT_SECRET).id;

	const blog = new Blog({
		author: id,
		...req.body,
	});
	const newBlog = await blog.save();
	res.status(201).json({ message: "Blog created" });
};

exports.get_blogs = async (req, res) => {
	if (req.headers.token) {
		const id = jwt.verify(req.headers.token, process.env.JWT_SECRET).id;
		const blogs = await Blog.find({ author: id }).populate(
			"author",
			"username"
		);
		return res.status(200).json({ blogs });
	}
	const blogs = await Blog.find().populate("author", "username");

	res.status(200).json({ blogs });
};
exports.get_blog = async (req, res) => {
	const { id } = req.params;
	const blog = await Blog.findById(id).populate("author", "username");

	res.status(200).json(blog);
};

exports.delete_blog = async (req, res) => {
	const token = req.headers.token;
	const id = jwt.verify(token, process.env.JWT_SECRET).id;
	const { id: blogId } = req.params;
	const blog = await Blog.findById(blogId);
	if (blog.author.toString() !== id) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	await Blog.findByIdAndDelete(blogId);
	res.status(200).json({ message: "Blog deleted" });
};
