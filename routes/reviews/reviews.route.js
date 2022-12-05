const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/isAdmin.middlware");
/* models */
const { Reviews } = require("../../models/reviews.model");
const { User } = require("../../models/user.model");
const notification = require("../../mail/notification.mail");

/* send notification to mail */
const sendNotification = async (user, req, isEdit) => {
	/* შეტყობინების გაგზავნა ადმინისტრატორის მეილზე */
	let stars = "";
	for (let index = 0; index < req.body.star; index++) {
		stars += "⭐️ ";
	}
	await notification({
		subject: isEdit ? "⭐️ შეფასების რედაქტირება" : "⭐️ ახალი შეფასება",
		text: `${stars}\r\n\r\n${user.firstName} ${user.lastName}\r\n\r\n${req.body.description}`,
	});
};

/* add review */
router.post("/", auth, async (req, res) => {
	try {
		const token = req.header("x-auth-token");
		const { _id } = jwt.verify(token, process.env.PRIVATE_KEY);

		const user = await User.findById(_id).select(["firstName", "lastName"]);

		/* ვამოწმებ შეფასების რაოდენობას */
		if (req.body.star < 0 || req.body.star > 5) {
			res.status(400).send(`შეფასება უნდა იყოს მინიმუმ 0 ან მაქსიმუმ 5`);
			return;
		}

		/* ვალიდაცია: ვამოწმებ მომხმარებელს აქვს თუ არა დაწერილი შეფასება */
		const isExist = await Reviews.findOne({ "user.userId": user._id });

		if (!isExist) {
			/* თუ მომხმარებელს დაწერილი არ აქვს შეფასება ვამატებინებ ახალ შეფასებას */
			const review = await new Reviews({
				description: req.body.description,
				user: {
					userId: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
				},
				star: req.body.star,
			}).save();

			sendNotification(user, req);

			res.send(review);
			return;
		}
		/* თუ უკვე დაწერილი აქვს ვაბრუნებ შეტყობინებას */
		res.status(400).send("თქვენ უკვე დაწერილი გაქვთ შეფასება");
	} catch (error) {
		res.status(404).send(error);
	}
});

/* get all reviews */
router.get("/", async (req, res) => {
	try {
		res.send(await Reviews.find({ isPublished: true }).sort({ date: -1 }));
	} catch (error) {
		res.status(400).send(error);
	}
});

/* edit review */
router.put("/", async (req, res) => {
	try {
		const review = await Reviews.findByIdAndUpdate(
			req.body.id,
			{
				star: req.body.star,
				description: req.body.description,
				isPublished: false,
				...req.body.user,
				date: Date.now,
			},
			{ new: true }
		);
		res.send(review);
		sendNotification(review.user, req, true);
	} catch (error) {
		res.status(400).send(error);
	}
});

/* delete review */
router.delete("/:id", auth, async (req, res) => {
	try {
		const token = req.header("x-auth-token");
		const { _id } = jwt.verify(token, process.env.PRIVATE_KEY);
		const course = await Reviews.findById(req.params.id);

		if (_id == course.userId) {
			res.send(await course.delete());
			return;
		}

		res.status(401).send();
	} catch (error) {
		res.status(400).send(error);
	}
});

/* admin delete */
router.delete("/admin/:id", auth, isAdmin, async (req, res) => {
	try {
		const course = await Reviews.findByIdAndRemove(req.params.id);
		if (course) {
			res.send({ message: `კურსი წამრატებით წაიშალა`, course });
			return;
		}
		res.status(400).send(`კურსი ვერ მოიძებნა`);
	} catch (error) {
		res.status(400).send(error);
	}
});

/* admin get all courses */
router.get("/admin", auth, isAdmin, async (req, res) => {
	try {
		const data = await Reviews.find().sort({ date: -1 });
		res.send(data);
	} catch (error) {
		res.status(400).send(error);
	}
});

/* admin edit */
router.put("/admin", auth, isAdmin, async (req, res) => {
	try {
		// res.send(await Reviews.findById(req.body.courseId))
		res.send(
			await Reviews.updateOne(
				{ _id: req.body.courseId },
				{
					$set: {
						isPublished: req.body.isPublished,
					},
				}
			)
		);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
