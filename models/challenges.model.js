const Joi = require("joi");
const mongoose = require("mongoose");

const Challenge = mongoose.model(
	"challanges",
	new mongoose.Schema({
		title: {
			type: String,
			required: true,
			maxlength: 255,
		},
		smallDescr: {
			type: String,
			required: true,
		},
		descr: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: true,
		},
		level: {
			type: String,
			required: true,
		},
		tags: {
			type: Array,
			required: true,
		},
	})
);

const schema = Joi.object({
	_id: Joi.optional().allow(""),
	title: Joi.string().max(255).required(),
	smallDescr: Joi.string().required(),
	descr: Joi.string().required(),
	img: Joi.string().required(),
	level: Joi.string().required(),
	tags: Joi.array().required(),
});

module.exports.Challange = Challenge;
module.exports.ChallengeValidation = schema;
