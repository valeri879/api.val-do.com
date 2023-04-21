const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/isAdmin.middlware");
const { Tags } = require("../../models/tags.model");
const { pagination } = require("../../helpers/pagination");

/* get all tags */
router.get(`/`, auth, isAdmin, async (req, res) => {
	const paginationData = pagination(req.query.page, req.query.limit, await Tags.countDocuments());
	const tags = await Tags.find().select("-__v").skip(paginationData.skip).limit(paginationData.limit);
	try {
		res.status(200).send({
			data: tags,
			...paginationData
		});
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

/* add new tag */
router.post(`/`, auth, isAdmin, async (req, res) => {
	try {
		const tagExist = await Tags.findOne({ title: req.body.title });
		if (!tagExist) {
			const tags = new Tags({
				title: req.body.title,
			});
			tags.save();
			res.status(200).send({ message: `თეგი წარმატებით დაემატა` });
			return;
		}
		res.status(400).send({ message: `მოცემული თაგი უკვე დამატებულია` });
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

/* edit new tag */
router.put(`/`, auth, isAdmin, async (req, res) => {
	try {
		await Tags.findByIdAndUpdate(
			{ _id: req.body.id },
			{
				title: req.body.title,
			}
		);
		res.status(200).send({ message: `თეგი წარმატებით განახლდა` });
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

/* delete tag */
router.delete(`/:id`, auth, isAdmin, async (req, res) => {
	try {
		await Tags.findByIdAndRemove(req.params.id);
		res.status(200).send({ message: `თეგი წარმატებით წაიშალა` });
	} catch (ex) {
		res.status(400).send(new Error(ex));
	}
});

module.exports = router;
