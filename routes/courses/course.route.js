const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const { Course } = require('../../models/course.model');
const { User } = require('../../models/user.model');
const upload = require('../../middleware/upload.middleware');
const isAdmin = require('../../middleware/isAdmin.middlware');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

/* add courses */
router.post(`/`, auth, async (req, res) => {
    const token = req.header(`x-auth-token`);
    const userId = jwt.verify(token, process.env.PRIVATE_KEY)._id;
    const user = await User.findOne({ _id: userId });
    try {
        if (user.isAdmin) {
            let newCourse = new Course({
                title: req.body.title,
                descr: req.body.descr,
                youtubeLink: req.body.youtubeLink,
                telegramLink: req.body.telegramLink || undefined,
                repoLink: req.body.repoLink || undefined,
                img: req.body.img,
                category: req.body.category,
            });
            newCourse.save();
            res.status(200).send({ message: `კურსი წარმატებით დაემატა` });
        }
        else {
            res.status(403).send(`ფუნქციონალზე წვდომა შეზღუდულია`);
        }
    }
    catch (ex) {
        res.status(400).send(new Error(ex));
    }
});

/* edit courses */
router.put(`/:id`, auth, isAdmin, async (req, res) => {
    console.log(req.body);
    try {
        /* delete img from directory if it exists */
        if (fs.existsSync(req.body.oldPath)) await unlinkAsync(req.body.oldPath);
        await Course.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            descr: req.body.descr,
            youtubeLink: req.body.youtubeLink,
            telegramLink: req.body.telegramLink || undefined,
            repoLink: req.body.repoLink || undefined,
            img: req.body.img,
            category: req.body.category,
        });
        res.status(200).send({ message: `კურსი წარმატებით დარედაქტირდა` });
    }
    catch (ex) {
        res.status(400).send(new Error(ex));
    }
});

/* image upload */
router.post(`/upload`, auth, upload.single('img'), async (req, res) => {
    res.status(200).send({ path: req.file.path });
});

/* get courses */
router.get(`/`, async (req, res) => {
    const courses = await Course.find().select(['-__v']);
    res.status(200).send(courses);
});

/* get specific course */
router.get(`/:id`, async (req, res) => {
    const course = await Course.findById(req.params.id).select('-__v');
    course ? res.status(200).send({ data: course }) : res.status(400).send({ data: 'კურსი ვერ მოიძებნა' });
});

/* delete course */
router.delete(`/:id`, auth, isAdmin, async (req, res) => {
    const course = await Course.findById(req.params.id);
    const imgPath = course.img;

    /* delete img from directory if it exists */
    if (fs.existsSync(imgPath)) await unlinkAsync(imgPath);
    /* delete course */
    await Course.findByIdAndDelete(req.params.id);
    try {
        res.status(200).send({ message: 'კურსი წარმატებით წაიშალა' });
    }
    catch (ex) {
        res.status(400).send(new Error(ex));
    }
});

module.exports = router;