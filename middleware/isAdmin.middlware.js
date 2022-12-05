const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

module.exports = async function isAdmin(req, res, next) {
	const token = req.header("x-auth-token");

	try {
		const userId = jwt.verify(token, process.env.PRIVATE_KEY)._id;
		const user = await User.findById(userId);
		if (!user.isAdmin) {
			res.status(403).send("ფუნქციონალზე წვდომა შეზღუდულია");
		}
		next();
	} catch (ex) {
		res.status(400).send("Invalid token.");
	}
};
