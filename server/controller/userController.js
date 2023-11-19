const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

exports.login_user = async (req, res) => {
	const { username, password } = req.body;
	console.log(req.body);
	const user = await User.findOne({ username });
	if (!user) {
		return res.status(400).json({ message: "User not found" });
	}
	console.log(user);
	password = password.trim();
	const isMatch = await bcrypt.compare(password, user.passwordHash);
	if (!isMatch) {
		return res.status(400).json({ message: "Invalid credentials" });
	}
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
	console.log(token);
	return res.status(200).json({
		token,
		user: {
			id: user._id,
			username: user.username,
			name: user.name,
			email: user.email,
		},
	});
};

exports.register_user = async (req, res) => {
	const { username, password, name, email } = req.body;
	const userExist = await User.findOne({ username });
	if (userExist) {
		return res.status(400).json({ message: "User already exists" });
	}
	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = new User({
		username,
		passwordHash: hashedPassword,
		name,
		email,
	});
	const user = await newUser.save();
	console.log(user);

	res.status(201).json({ message: "User created" });
};
