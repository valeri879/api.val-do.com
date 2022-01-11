const Joi = require('joi');
const mongoose = require('mongoose');

const Course = mongoose.model('courses', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    descr: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 5000,
    },
    youtubeLink: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    img: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024,
    },
    isPublish: { type: Boolean, default: false },
    date: { type: String, default: Date.now },
}));

const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    descr: Joi.string().min(2).max(50).required(),
    youtubeLink: Joi.string().min(9).max(9).required(),
    img: Joi.string().min(2).max(255).email().required(),
    category: Joi.string().min(8).max(50).required(),
    // tags: Joi.string().min(8).max(50).required(),
});

module.exports.Course = Course;
module.exports.validate = schema;
