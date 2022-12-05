const Joi = require("joi");
const mongoose = require("mongoose");

const Categories = mongoose.model(
	"categories",
	new mongoose.Schema({
		title: {
			type: String,
			minlength: 2,
			maxlength: 255,
			required: true,
		},
		descr: {
			type: String,
			minlength: 15,
			maxlength: 255,
		},
		metaKeyword: {
			type: String,
		},
		metaDescr: {
			type: String,
		},
		metaAuthor: {
			type: String,
		},
		img: {
			type: String,
			required: true,
		},
		isFavorite: {
			type: Boolean,
			default: false,
		},
	})
);

const schema = Joi.object({
	title: Joi.string().min(2).max(255).required(),
	descr: Joi.string().min(15).max(255).required(),
	metaDescr: Joi.string().optional().allow(""),
	isFavorite: Joi.boolean().optional().allow(""),
	metaKeyword: Joi.string().optional().allow(""),
	metaAuthor: Joi.string().optional().allow(""),
	img: Joi.string().required(),
});

module.exports.Categories = Categories;
module.exports.CategoryValidation = schema;
