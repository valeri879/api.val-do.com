const express = require('express');
const router = express.Router();

const { Categories } = require('../../models/categories.model');
const { Reviews } = require('../../models/reviews.model');
const { Blog } =  require('../../models/blog.model');


router.get('', async (req, res) => {
	const blogs = await Blog.find().limit(3);
	const topCategories = await Categories.find({isFavorite: true}).limit(3);
	const reviews = await Reviews.find({isFavorite: true}).limit(4).sort({date: -1});
	res.send({
		categories: topCategories,
		reviews: reviews,
		blogs: blogs
	});
});

module.exports = router;
