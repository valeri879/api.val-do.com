const express = require("express");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin.middlware");
const { Blog } = require("../../models/blog.model");

/* add */
router.post("/", isAdmin, async (req, res) => {
	try {
		let blog = new Blog({
			title: req.body.title,
			description: req.body.description,
			image: req.body.image,
		});
		res.status(200).send(await blog.save());
	} catch (err) {
		res.status(400).send({ message: err });
	}
});

/* edit blog */
router.put("/:id", async (req, res) => {
	try {
		const blog = await Blog.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			description: req.body.description,
			image: req.body.image,
		});
		res.send(blog);
	} catch (error) {
		res.status(400).send(error);
	}
});

/* get current blog */
router.get("/:id", async (req, res) => {
	try {
		res.send(await Blog.findById(req.params.id).select(["-__v"]));
	} catch (error) {
		res.status(400).send(error);
	}
});

/* get all blogs */
router.get("/", async (req, res) => {
	try {
		res.send(await Blog.find());
	} catch (error) {
		res.send(error);
	}
});

/* delete */
router.delete("/:id", async (req, res) => {
	try {
		await Blog.findByIdAndDelete(req.params.id);
		res.send();
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
