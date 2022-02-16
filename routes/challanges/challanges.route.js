const express = require('express');
const auth = require('../../middleware/auth.middleware');
const isAdmin = require('../../middleware/isAdmin.middlware');
const { Challange, ChallangeValidation } = require('../../models/challanges.model');
const router = express.Router();

/* get challanges */
router.get('', async (req, res) => {
    try {
        res.status(200).send(await Challange.find().select('-__v'));
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/* add challange */
router.post('', auth, isAdmin, async (req, res) => {
    const { error } = ChallangeValidation.validate(req.body);
    if (error) return res.status(400).send(error.message);

    try {
        let challange = new Challange({
            title: req.body.title,
            smallDescr: req.body.smallDescr,
            descr: req.body.descr,
            img: req.body.img,
            level: req.body.level,
            tags: req.body.tags,
        });

        challange = await challange.save();
        res.send(challange);
    } catch (error) {
        res.status(400).send(error);
    }
});

/* update challange */
router.put('', auth, isAdmin, async (req, res) => {
    const { error } = ChallangeValidation.validate(req.body);
    if (error) return res.status(400).send(error.message);

    try {
        let challange = await Challange.findByIdAndUpdate(req.body.id, {
            title: req.body.title,
            smallDescr: req.body.smallDescr,
            descr: req.body.descr,
            img: req.body.img,
            level: req.body.level,
            tags: req.body.tags,
        }, { new: true }).select('-__v');
        res.status(200).send(challange);
    } catch (error) {
        res.status(400).send(error);
    }
});

/* delete challange */
router.delete('/:id', auth, isAdmin, async (req, res) => {
    try {
        await Challange.findByIdAndDelete(req.params['id']);
        res.status(200).send(`გამოწვევა წარმატებით წაიშალა`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;