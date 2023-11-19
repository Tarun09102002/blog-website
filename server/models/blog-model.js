const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user-model");

const blogSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: { type: String, required: true },
	description: { type: String },
	author: { type: Schema.Types.ObjectId, ref: "User" },
	date: { type: Date, default: Date.now },
	themes: { type: Array },
	image: { type: String },
});

module.exports = mongoose.model("Blog", blogSchema);
