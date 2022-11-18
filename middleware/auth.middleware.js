const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
module.exports = async function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        const user = await User.findById(decoded['_id']).select(['-password'])
        req.user = user;
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token.');
    }
}