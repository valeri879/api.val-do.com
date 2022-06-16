const mongoose = require('mongoose');

const Blog = new mongoose.model('blogs', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
}));

module.exports.Blog = Blog;