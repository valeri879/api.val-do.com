const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");
const { User } = require("../../models/user.model");
const { Cv } = require("../../models/cv.model");

router.get(`/`, auth, async (req, res) => {
	try {
		const userData = await User.findOne({ _id: req.user._id }).select(["-password", "-__v", "-verificationCode"]);
		const cv = await Cv.findOne({ "user._id": req.user._id });
		res.status(200).send({ user: userData, cv: cv });
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

router.put(`/add-to-favorites`, auth, async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				$addToSet: {
					favorites: req.body.courseId,
				},
			},
			{ new: true }
		);
		res.status(200).send(user);
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

router.delete(`/delete-from-favorites/:id`, auth, async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{
				$pull: {
					favorites: {
						$eq: req.params.id,
					},
				},
			},
			{ new: true }
		);
		res.status(200).send(user);
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

module.exports = router;
