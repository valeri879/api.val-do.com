const express = require("express");
const router = express.Router();

const { Categories } = require("../../models/categories.model");
const { Course } = require("../../models/course.model");
const { Reviews } = require("../../models/reviews.model");
const { Blog } = require("../../models/blog.model");

router.get("", async (req, res) => {
	const blogs = await Blog.find().limit(3);
	const lastBlogs = await Blog.find().limit(3).sort({$natural: -1});
	const topCategories = await Categories.find({ isFavorite: true }).limit(3).lean();
	const reviews = await Reviews.find({ isFavorite: true }).limit(4).sort({ date: -1 });
	   

    /* კატეგორიაში შემავალი კურსების რაოდენობის გამოთვლა */
    for (let i = 0; i < topCategories.length; i++) {
      const count = await Course.find({ category: topCategories[i]._id }).count();
      topCategories[i].coursesCount = count;
    }
	res.send({
		categories: topCategories,
		reviews: reviews,
		blogs: blogs,
		lastBlogs: lastBlogs
	});
});

module.exports = router;
