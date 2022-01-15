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
        res.status(400).send(new Error(ex));
    }
});

router.put(`/add-to-favorites`, auth, async (req, res) => {
    const token = req.header(`x-auth-token`);
    const userId = jwt.verify(token, process.env.PRIVATE_KEY)._id;
    try {
        const user = await User.findByIdAndUpdate(userId, {
            $addToSet: {
                favorites: req.body.courseId,
            }
        },
            { new: true });
        res.status(200).send(user);
    }
    catch (ex) {
        res.status(400).send(new Error(ex));
    }
});


router.delete(`/delete-from-favorites/:id`, auth, async (req, res) => {
    const token = req.header(`x-auth-token`);
    const userId = jwt.verify(token, process.env.PRIVATE_KEY)._id;
    try {
        const user = await User.findByIdAndUpdate(userId, {
            $pull: {
                favorites: {
                    $eq: req.params.id
                }
            }
        },
            { new: true });
        res.status(200).send(user);
    }
    catch (ex) {
        res.status(400).send(new Error(ex));
    }
});

module.exports = router;