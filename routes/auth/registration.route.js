const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, validate } = require("../../models/user.model");
const express = require("express");
const router = express.Router();
const mailer = require("../../mail/verify.mail");

router.post("/", async (req, res) => {
	const { error } = validate.validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send(`ელფოსიტთ ${req.body.email} უკვე რეგისტრირებულია სხვა მომხმარებელი`);

	user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		phone: req.body.phone,
		email: req.body.email,
		password: req.body.password,
		verificationCode: String(Math.random()).substr(2, 6),
	});

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();
	const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);
	await mailer(user);
	res.header("x-auth-token", token).send({ token });
});

router.post("/verification", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send(`ელფოსტა ${req.body.email} ვერ მოიძებნა`);

	if (user.verificationCode === req.body.code) {
		await User.updateOne({ email: req.body.email }, { $set: { isVerify: true, verificationCode: null } });
		res.status(200).send({ data: `ელფოსტა ${req.body.email} წარმატებით გააქტიურდა` });
	} else {
		res.status(400).send({ message: `ვეფიფიკაციის კოდი არასწორია` });
	}
});

module.exports = router;
