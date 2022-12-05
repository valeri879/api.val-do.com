const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../../models/user.model");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
	const { error } = validate.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("მომხმარებელი ან პაროლი არასწორია");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("მომხმარებელი ან პაროლი არასწორია");

	const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);
	res.send({
		token,
		isVerify: user.isVerify,
		_id: user._id,
	});
});

const validate = Joi.object({
	email: Joi.string().min(2).max(255).email().required(),
	password: Joi.string().min(8).max(50).required(),
});

module.exports = router;
