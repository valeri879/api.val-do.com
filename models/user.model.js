const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
	"users",
	new mongoose.Schema({
		firstName: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 50,
		},
		lastName: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 50,
		},
		email: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 255,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			minlength: 9,
			maxlength: 9,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			maxlength: 1024,
		},
		favorites: {
			type: [],
		},
		profileImage: { type: String },
		isAdmin: { type: Boolean, default: false },
		isVerify: { type: Boolean, default: false },
		registrationDate: { type: String, default: Date.now },
		verificationCode: { type: String },
	})
);

const schema = Joi.object({
	profileImage: Joi.string(),
	firstName: Joi.string().min(2).max(50).required(),
	lastName: Joi.string().min(2).max(50).required(),
	phone: Joi.string().min(9).max(9).required(),
	email: Joi.string().min(2).max(255).email().required(),
	password: Joi.string().min(8).max(50).required(),
});

module.exports.User = User;
module.exports.validate = schema;
