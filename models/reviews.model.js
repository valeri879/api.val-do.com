const mongoose = require('mongoose');

const user = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: 'უცნობი',
    },
    lastName: {
        type: String,
    }
})

const Reviews = new mongoose.model('reviews', new mongoose.Schema({
    star: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    user,
    isPublished: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
}));

module.exports.Reviews = Reviews;