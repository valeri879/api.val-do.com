const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/isAdmin.middlware");
const { User } = require("../../models/user.model");

router.get(`/`, auth, isAdmin, async (req, res) => {
	res.status(200).send(await User.find().select("-password"));
});

module.exports = router;
