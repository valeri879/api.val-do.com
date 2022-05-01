const Joi = require('joi');
const mongoose = require('mongoose');

const Comment = mongoose.model('comments', new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
    date: {
        type: String,
        default: Date.now,
    },
    comment: {
        type: String,
        required: true
    },
}));

module.exports.Comment = Comment;
