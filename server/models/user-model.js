const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
