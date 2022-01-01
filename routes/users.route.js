const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user.model');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('ასეთი მომხმარებელი უკვე რეგისტრირებულია');

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign({_id: user._id}, process.env.jwtPrivateKey);

    res.header('x-auth-token', token).send(
        _.pick(user, [
            '_id',
            'firstName',
            'lastName',
            'email',
        ])
    );
});

module.exports = router;