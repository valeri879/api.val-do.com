const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");
const { Course, validate } = require("../../models/course.model");
const { Categories } = require("../../models/categories.model");
const upload = require("../../middleware/upload.middleware");
const isAdmin = require("../../middleware/isAdmin.middlware");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

/* add courses */
router.post(`/`, auth, isAdmin, async (req, res) => {
	const { error } = validate.validate(req.body);

	if (error) return res.status(400).send(error.message);
	try {
		let newCourse = new Course({
			title: req.body.title,
			descr: req.body.descr,
			youtubeLink: req.body.youtubeLink,
			telegramLink: req.body.telegramLink || undefined,
			repoLink: req.body.repoLink || undefined,
			img: req.body.img,
			category: req.body.category,
			iframe: req.body.iframe,
			tags: req.body.tags,
		});
		const data = await newCourse.save();
		res.status(200).send({
			id: data._id,
			message: `კურსი წარმატებით დამატა`,
		});
	} catch (ex) {
		res.status(400).send(ex);
	}
});


/**
 * edit course
 * * კურსის რედაქტირებისთვის საჭიროა კონკრეტული კურსის პარამეტრი, რომლის რედაქტირებაც გვსურს
 * @param id დასრედაქტირებელი კურსის ID
 */
router.put(`/:id`, auth, isAdmin, async (req, res) => {
	const { error } = validate.validate(req.body);

	if (error) return res.status(400).send(error.message);

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
			iframe: req.body.iframe,
			tags: req.body.tags,
		});
		res.status(200).send({ message: `კურსი წარმატებით დარედაქტირდა` });
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

/* image upload */
router.post(`/upload`, auth, isAdmin, upload.single("img"), async (req, res) => {
	res.status(200).send({ path: req.file.path });
});

/* get courses */
router.get(`/:id`, async (req, res) => {
	try {
		let courses;
		/* sort by tags */
		if (req.query.tag) {
			courses = await Course.find({
				tags: {
					$elemMatch: {
						_id: req.query.tag,
					},
				},
			}).sort({ date: req.query.date || "1" });
			res.status(200).send(courses);
			return;
		}
		courses = await Course.find({ category: req.params["id"] })
			.sort(req.query.date ? { date: req.query.date } : { index: 1 }) // ვასორტირებთ თარიღით ან ინდექსით
			.select(["-__v"]).lean();
		

		if (courses.length) {
			const categoryData = await Categories.findById(courses[0].category).lean();
			res.status(200).send(
				{
					...categoryData,
					data: courses
				});
			return;
		}
		res.status(404).send();
	} catch (error) {
		res.status(400).send(error);
	}
});

/* course search */
router.get(`/search/filter`, async (req, res) => {
	try {
		console.log(req.query.keyword);
		let courses = await Course.find({
			$text: {
				$search: req.query.keyword,
			},
		}).select(["title"]);
		res.send(courses);
	} catch (error) {
		res.status(404).send(error);
	}
});

/* get courses by tags */
router.get(`/tag/:id`, async (req, res) => {
	try {
		let courses = await Course.find({
			tags: {
				$elemMatch: {
					_id: req.params.id,
				},
			},
		}).select(["-__v"]);
		res.send(courses).status(200);
	} catch (error) {
		res.send(error).status(400);
	}
});

/* get favorites */
router.post(`/get-favorites`, auth, async (req, res) => {
	try {
		const courses = await Course.find({
			_id: { $in: req.body.favorites },
		}).select("-__v");
		res.status(200).send(courses);
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

/* get specific course */
router.get(`/detail/:id`, async (req, res) => {
	try {
		const course = await Course.findById(req.params.id).select("-__v");
		course ? res.status(200).send({ data: course }) : res.status(400).send({ data: "კურსი ვერ მოიძებნა" });
	} catch (error) {
		res.status(400).send(new Error(error));
	}
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
		res.status(200).send({ message: "კურსი წარმატებით წაიშალა" });
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

/* course comment */
router.put(`/comment/:id`, auth, async (req, res) => {});

router.post(`/sorting`, auth, isAdmin, async (req, res) => {
	try {
		let courses = await Course.find({ category: req.body.categoryId }).sort({ index: 1 });

		const previousCourse = courses[req.body.previousIndex];
		const currentCourse = courses[req.body.currentIndex];

		await Course.findOneAndUpdate(
			{ '_id': previousCourse._id },
			{
				$set: {
					index: currentCourse.index
				}
			}
		);

		await Course.findOneAndUpdate(
			{ '_id': currentCourse._id },
			{
				$set: {
					index: previousCourse.index
				}
			}
		);

		// courses = await Course().find().sort({ index: -1 });
		res.status(200).send(
			{
				pre: previousCourse,
				curr: currentCourse,
				// ts:await Course.findById(currentCourse._id),
				// dx:await Course.find({ category: req.body.categoryId }).sort({ index: -1 })
			}
			
			// 
		);
	} catch (error) {
		res.status(400).send({err: error.message})
	}
})
module.exports = router;
