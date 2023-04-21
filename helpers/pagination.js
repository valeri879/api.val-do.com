const pagination = (page, limit, totalDocuments) => {
	limit = parseInt(limit) || 12;
	page = parseInt(page) || 1;

	const totalPages = Math.ceil(totalDocuments / limit);
	let pagesArray = [];
	let gap = 3;

	if (totalPages - page < 3) {
		gap = totalPages - page;
	}
 
	for (let i = page; i <= (page + gap); i++)
		pagesArray.push(i)

	return {
		totalDocuments,
		totalPages,
		currentPage: page,
		next: page < totalPages,
		prev: page > 1,
		limit,
		skip: page > 1 ? ((page - 1) * limit) : 0,
		pagesArray
	}
}

module.exports = { pagination };