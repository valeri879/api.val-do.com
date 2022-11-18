const mongoose = require('mongoose');

// skills schema
const Skills = new mongoose.Schema({ title: String });
// experience schema
const Experience = new mongoose.Schema({ title: String, descr: String, startDate: String, endDate: String });
// education schema
const Education = new mongoose.Schema({ title: String, descr: String, startDate: String, endDate: String });
// languages schema
const Languages = new mongoose.Schema({ title: String });

const Cv = mongoose.model('cv', new mongoose.Schema({
    user: {},
    role: {
        type: String,
        required: true,
        maxlength: 255
    },
    about: {
        type: String,
        required: true,
        maxlength: 5000
    },
    location: {
        type: String,
        required: true,
        maxlength: 55
    },
    address: {
        type: String,
        required: true,
        maxlength: 255
    },
    skills: {
        type: [Skills],
        required: true
    },
    experience: {
        type: [Experience]
    },
    education: {
        type: [Education],
        required: true
    },
    languages: {
        type: [Languages],
        required: true
    },
}));

module.exports.Cv = Cv;