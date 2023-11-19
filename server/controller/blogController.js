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
	console.log(req.headers);
	const blogs = await Blog.find().populate("author", "username");

	res.status(200).json({ blogs });
};
exports.get_blog = async (req, res) => {
	const { id } = req.params;
	const blog = await Blog.findById(id).populate("author", "username");

	res.status(200).json(blog);
};
