const express = require('express');
const registration = require('../routes/auth/registration.route');
const login = require('../routes/auth/login.route');
const reset = require('../routes/auth/reset.route');

module.exports = function(app) {
    app.use(express.json());
    app.use((res, req, next) => {
        req.setHeader('Access-Control-Allow-Origin', '*');
        req.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        req.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        req.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    app.use('/api/registration', registration);
    app.use('/api/login', login);
    app.use('/api/reset', reset);
}