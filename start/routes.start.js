const express = require('express');
const registration = require('../routes/auth/registration.route');
const login = require('../routes/auth/login.route');
const reset = require('../routes/auth/reset.route');
const user = require('../routes/user/me.route');
const courses = require('../routes/courses/course.route');

module.exports = function(app) {
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
    app.use('/api/user', user);
    app.use('/api/courses', courses);
}