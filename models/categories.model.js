const Joi = require('joi');
const mongoose = require('mongoose');

const Categories = mongoose.model('categories', new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    img: {
        type: String,
        required: true
    }
}));

const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    img: Joi.string().required(),
});

module.exports.Categories = Categories;
module.exports.CategoryValidation = schema;