const express = require('express');
const router = express.Router();

const { Cv } = require('../../models/cv.model');
const { Tags } = require('../../models/tags.model');
const auth = require('../../middleware/auth.middleware');

router.get('/', async (req, res) => {
    res.send(await Cv.find());
});

// უნარების წამოღება
router.get('/skills', auth, async (req, res) => {
    try {
        res.send(await Tags.find().select(['-__v', '-_id']));
    } catch (error) {
        res.status(400).send(new Error(error));
    }
});

// კონკრეტული Cv-ის წამოღება
router.get('/:id', async (req, res) => {
    try {
        const cv = await Cv.findById(req.params.id);
        if (!cv) return res.status(400).send({message: 'CV ვერ მოიძებნა'});
        res.send(cv);
    } catch (error) {
        res.status(400).send(new Error(error));
    }
});



// ახალი სვ-ის დამატება
router.post('/', auth, async (req, res) => {
    try {
        /**
         * * ვამოწმებ თუ არსებული მეილით სვ მოიძებნება აღარ ვაძლევ საშუალებას შეიქმნას ახალი ჩანაწერი
         */
        const exist = await Cv.findOne({ 'user.email': req.user.email });
        if (exist) return res.status(400).send({ message: 'თქვენ უკვე დამატებული გაქვთ სვ' });
    
        // ახალი სვ-ის შენახვა ბაზაში
        const cv = new Cv({
            user: req.user,
            role: req.body.role,
            about: req.body.about,
            location: req.body.location,
            address: req.body.address,
            skills: req.body.skills,
            experience: req.body.experience,
            education: req.body.education,
            languages: req.body.languages,
            links: req.body.links
        });
    
        res.send(await cv.save());        
    } catch (error) {
        res.status(400).send(new Error(error));
    }
});

// ახალი სვ-ის რედაქტირება
router.post('/edit', auth, async (req, res) => {
    try {
        const update = await Cv.findOneAndUpdate(
            {
                'user._id': req.user._id
            },
            {
                user: req.user,
                role: req.body.role,
                about: req.body.about,
                location: req.body.location,
                address: req.body.address,
                skills: req.body.skills,
                experience: req.body.experience,
                education: req.body.education,
                languages: req.body.languages,
                links: req.body.links
            },
            {
                new: true
            }
        );
        res.send(update);
    } catch (error) {
        res.status(400).send(new Error(error));
    }
});

// სვ-ის წაშლა
router.delete('/', auth, async (req, res) => {
    try {
        await Cv.findOneAndDelete({ 'user._id': req.user._id });
        res.send({ message: 'CV წარმატებით წაიშალა' });
    } catch (error) {
        res.status(400).send(new Error(error))
    }
});

module.exports = router;