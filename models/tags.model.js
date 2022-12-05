const Joi = require("joi");
const mongoose = require("mongoose");

const Tags = mongoose.model(
	"tags",
	new mongoose.Schema({
		title: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 255,
		},
	})
);

const schema = Joi.object({
	title: Joi.string().min(2).max(50).required(),
});

module.exports.tagValidation = schema;
module.exports.Tags = Tags;
