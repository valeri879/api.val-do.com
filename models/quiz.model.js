const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
	answer: {
		type: String,
		required: true,
	},
	isCorrect: {
		type: Boolean,
		required: true,
	},
});

const questionSchema = new mongoose.Schema({
	question: {
		type: String,
		require: true,
	},
	answers: [answerSchema],
});

const Quiz = mongoose.model(
	"quiz",
	new mongoose.Schema({
		title: {
			type: String,
			minlength: 2,
			maxlength: 255,
			required: true,
		},
		smallDescr: {
			type: String,
			maxlength: 5000,
			required: true,
		},
		descr: {
			type: String,
			maxlength: 5000,
			required: true,
		},
		questions: {
			type: [questionSchema],
			required: true,
			minlength: 1,
		},
	})
);

module.exports.Quiz = Quiz;
