const express = require('express');
const auth = require('../../middleware/auth.middleware');
const isAdmin = require('../../middleware/isAdmin.middlware');
const upload = require('../../middleware/upload.middleware');
const { Categories, CategoryValidation } = require('../../models/categories.model');
const router = express.Router();
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

/* get categories */
router.get(`/`, auth, isAdmin, async (req, res) => {
    try {
        const categories = await Categories.find().select(`-__v`);
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send(error);
    }
});

/* add category */
router.post(`/`, auth, isAdmin, async (req, res) => {
    const { error } = CategoryValidation.validate(req.body);
    if (error) return res.status(400).send(error.message);
    try {
        const exist = await Categories.findOne({ title: req.body.title });
        if (!exist) {
            new Categories({
                title: req.body.title,
                img: req.body.img,
            }).save();
            res.status(200).send({ message: `კატეგორია წარმატებით დაემატა 🎉` })
            return;
        }
        res.status(400).send({ message: `მოცემული კატეგორია უკვე არსებობს 🙁` });
    } catch (ex) {
        res.status(400).send(new Error(ex));
    }
});

/* upload category img */
router.post(`/upload`, auth, isAdmin, upload.single('img'), async (req, res) => {
    res.send({ path: req.file.path });
});

/* delete category */
router.delete(`/:id`, auth, isAdmin, async (req, res) => {

    const course = await Categories.findById(req.params['id']);
    /* delete img from directory if it exists */
    if (fs.existsSync(course.img)) await unlinkAsync(course.img);

    try {
        course.remove();
        res.send(`კატეგორია წარმატებით წაიშალა 🎉`);
    } catch (ex) {
        res.status(400).send(new Error(ex));
    }
});

/* edit category */
router.put(`/`, auth, isAdmin, async (req, res) => {
    try {
        await Categories.findByIdAndUpdate(req.body.id, {
            title: req.body.title
        });
        res.status(200).send({message: `კატეგორია წარმატებით განახლდა 🎉`});
    } catch (error) {
        res.status(400).send(new Error(error))
    }
});

module.exports = router;