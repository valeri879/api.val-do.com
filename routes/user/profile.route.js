const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload.middleware");
const auth = require("../../middleware/auth.middleware");
const { User } = require("../../models/user.model");
const fs = require("fs");

router.post("/image", auth, upload.single("img"), async (req, res) => {
	const userId = req.user._id;
	const { profileImage } = await User.findOne({ _id: userId }).select("profileImage");

	// თუ არსებობს ფაილი uploads დირექტორიაში ვამოწმებ და შემდეგ ვშლი;
	if (fs.existsSync(profileImage)) fs.unlinkSync(profileImage);

	/**
	 * * პროფილის ფოტოს ატვირთვა
	 */
	res.send(
		await User.findByIdAndUpdate(
			{ _id: userId },
			{
				$set: {
					profileImage: req.file.path,
				},
			},
			{ new: true }
		).select(["profileImage"])
	);
});

router.delete("/image/:id", auth, async (req, res) => {
	// ვიღებთ პროფილის ფოტოს
	const { profileImage } = await User.findById(req.params.id);

	// ვამოწმებ, თუ ფოტოს ჩანაწერი ცარიელი სთრინგი არაა, მაშინ ვშლი სისტემიდან და ვანულებ profileImage-ის ჩანაწერს
	if (profileImage !== "") {
		await User.findByIdAndUpdate(req.params.id, { $set: { profileImage: "" } });
		fs.unlinkSync(profileImage);
		res.status(200).send({ message: `🎉 ფოტო წარმატებით წაიშალა` });
		return;
	}

	res.status(400).send({ message: `ფოტო ვერ მოიძებნა` });
});

module.exports = router;
