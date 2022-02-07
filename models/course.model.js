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
    iframe: {
        type: String,
        maxlength: 5000,
    },
    telegramLink: {
        type: String,
        default: 'https://t.me/+5Ky8IOnduHs5MjQ6'
    },
    repoLink: {
        type: String,
        default: 'https://github.com/valeri879/learn_html'
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
    tags: {
        type: Array,
        default: [],
    }
}));

const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    descr: Joi.string().min(2).max(10000).required(),
    youtubeLink: Joi.string().min(9).max(255).required(),
    img: Joi.string().min(2).max(255).required(),
    oldPath: Joi.optional().allow(''),
    telegramLink: Joi.optional().allow(null),
    repoLink: Joi.optional().allow(null),
    category: Joi.string(),
    iframe: Joi.optional().allow(null),
    tags: Joi.array(),
});

module.exports.Course = Course;
module.exports.validate = schema;
