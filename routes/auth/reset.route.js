const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../models/user.model');
const express = require('express');
const router = express.Router();
const reset = require('../../mail/reset.mail');

router.post('/', async (req, res) => {

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`ელფოსტა ${req.body.email} ვერ მოიძებნა`);

    const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);

    await reset({
        email: 'valeri.kharitonashvili1@gmail.com',
        token,
    });

    res.status(200).send({ data: `✅ პაროლის აღდგენის ბმული გაგზავნილია ${req.body.email}-ზე` })
});

router.post('/set-password', async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.PRIVATE_KEY);
        user = await User.findOne({ _id: decoded._id });
        const salt = await bcrypt.genSalt(10);
        await User.updateOne({ _id: decoded._id }, { $set: { password: await bcrypt.hash(req.body.password, salt) } });

        res.status(200).send({data: `🎉 პაროლი წარმატებით შეიცვალა`})
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;