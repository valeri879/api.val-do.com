const express = require('express');
const registration = require('../routes/auth/registration.route');
const login = require('../routes/auth/login.route');
const reset = require('../routes/auth/reset.route');
const me = require('../routes/user/me.route');
const courses = require('../routes/courses/course.route');
const comment = require('../routes/comment/comment.route');
const users = require('../routes/user/users.route');
const tags = require('../routes/tags/tags.route');
const categories = require('../routes/categories/categories.route');
const challanges = require('../routes/challanges/challenges.route');
const quiz = require('../routes/quiz/quiz.route');
const blog = require('../routes/blog/blog.route');
const reviews = require('../routes/reviews/reviews.route');
const profile = require('../routes/user/profile.route');
const cv = require('../routes/cv/cv.route');
const main = require('../routes/main/main.route');

module.exports = function (app) {
app.use(express.json());
    app.use(`/uploads`, express.static('uploads'));
    app.use((res, req, next) => {
        req.setHeader('Access-Control-Allow-Origin', '*');
        req.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        req.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, x-auth-token, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        req.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use('/api/registration', registration);
    app.use('/api/login', login);
    app.use('/api/reset', reset);
    app.use('/api/user', me);
    app.use('/api/users', users);
    app.use('/api/blog', blog);
    app.use('/api/reviews', reviews);
    app.use('/api/courses', courses);
    app.use('/api/comment', comment);
    app.use('/api/tags', tags);
    app.use('/api/categories', categories);
    app.use('/api/challenges', challanges);
    app.use('/api/quiz', quiz);
    app.use('/api/profile', profile);
    app.use('/api/cv', cv);
    app.use('/api/', main);
}
