const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const userController = require("./controller/userController");
const blogController = require("./controller/blogController");

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("MongoDB connected");
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	})
	.catch((err) => console.log(err));

app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.post("/login", userController.login_user);
app.post("/register", userController.register_user);
app.post("/create-blog", blogController.create_blog);
app.get("/blogs", blogController.get_blogs);
app.get("/blog/:id", blogController.get_blog);
app.delete("/blog/:id", blogController.delete_blog);
