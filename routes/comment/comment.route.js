require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const fetch = require("isomorphic-fetch");
const { Comment } = require('../../models/comment.model');
const sendNotificationToMail = require('../../mail/send.mail');
/* add comment */
router.post('/:courseId', auth, async (req, res) => {
    try {
        /* captcha verification */
        const captcha_url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body.token}`;
        fetch(captcha_url, { method: 'post' })
            .then(resposne => resposne.json())
            .then(async response => {
                if (response.success) {
                    let comment = new Comment({
                        userId: req.body.userId,
                        courseId: req.params.courseId,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        comment: req.body.comment
                    });
                    await sendNotificationToMail(await comment.save());
                    return res.send(await comment.save());
                }
                res.send(`დაფიქსირდა შეცდომა`).status(400);
            })
            .catch(err => res.send(err))
    } catch (error) {
        res.send(error).status(400);
    }

});

/* get comments */
router.get(`/:courseId`, async (req, res) => {
    try {
        let comments = await Comment.find({ courseId: req.params.courseId }).sort({ date: -1 });
        res.send(comments);
    } catch (error) {
        res.send(error).status(400);
    }
});

/* delete comments */
router.delete(`/:commentId`, auth, async (req, res) => {
    try {
        let course = await Comment.findByIdAndDelete(req.params.commentId);
        res.send(course);
    } catch (error) {
        res.send(error).status(400)
    }
});

/* 

6Ldr7LUfAAAAABhXSJKEaB86-l0A_f4O4LtFTvYc

*/
module.exports = router;