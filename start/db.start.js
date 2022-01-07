const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost:27017/valdo').then(() => {
        console.log('db connected...');
    });
} 