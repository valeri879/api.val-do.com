const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const { User } = require('../../models/user.model');

router.get(`/`, auth, async (req, res) => {
    const token = req.header(`x-auth-token`);
    const userId = jwt.verify(token, process.env.PRIVATE_KEY)._id;
    try {
        const userData = await User.findOne({ _id: userId }).select(['-password', '-_id', '-__v', '-verificationCode']);
        res.status(200).send(userData);
    }
    catch (ex) {
        res.status(200).send(new Error(ex));
    }
});

module.exports = router;