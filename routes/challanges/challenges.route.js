const express = require("express");
const auth = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/isAdmin.middlware");
const { Challange, ChallengeValidation } = require("../../models/challenges.model");
const router = express.Router();

/* get challenges */
router.get("", async (req, res) => {
	try {
		res.status(200).send(await Challange.find().select("-__v"));
	} catch (error) {
		res.status(400).send(error.message);
	}
});

/* get current challenge */
router.get("/:id", async (req, res) => {
	try {
		res.status(200).send(await Challange.findById(req.params["id"]).select("-__v"));
	} catch (error) {
		res.status(400).send(error.message);
	}
});

/* add challange */
router.post("", auth, isAdmin, async (req, res) => {
	const { error } = ChallengeValidation.validate(req.body);
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
router.put("", auth, isAdmin, async (req, res) => {
	console.log(req.body);
	const { error } = ChallengeValidation.validate(req.body);
	if (error) return res.status(400).send(error.message);

	try {
		let challange = await Challange.findByIdAndUpdate(
			req.body._id,
			{
				title: req.body.title,
				smallDescr: req.body.smallDescr,
				descr: req.body.descr,
				img: req.body.img,
				level: req.body.level,
				tags: req.body.tags,
			},
			{ new: true }
		).select("-__v");
		res.status(200).send(challange);
	} catch (error) {
		res.status(400).send(error);
	}
});

/* delete challange */
router.delete("/:id", auth, isAdmin, async (req, res) => {
	try {
		await Challange.findByIdAndDelete(req.params["id"]);
		res.status(200).send({ message: `გამოწვევა წარმატებით წაიშალა` });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
