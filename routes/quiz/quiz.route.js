const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const isAdmin = require('../../middleware/isAdmin.middlware');
const { Quiz } = require('../../models/quiz.model');

/* add quiz */
router.post(`/`, auth, isAdmin, async (req, res) => {
    try {
        let quiz = new Quiz({
            title: req.body.title,
            smallDescr: req.body.smallDescr,
            descr: req.body.descr,
            questions: req.body.questions
        });
    
        res.send(await quiz.save());
    } catch (error) {
        res.send(error.message).status(400);
    }

});

/* edit quiz */
router.put(`/:id`, auth, isAdmin, async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                smallDescr: req.body.smallDescr,
                descr: req.body.descr,
                questions: req.body.questions
            }
        },
        {
            new: true
        });
        res.send(quiz);
    } catch (error) {
        res.send(error).status(400);
    }
});

/* get quizes */
router.get(`/`, async (req, res) => {
    try {
        res.send(await Quiz.find());
    } catch (error) {
        res.send(error).status(400);        
    }
});

/* get current quiz by id */
router.get(`/:id`, async (req, res) => {
    try {
        res.send(await Quiz.findById(req.params.id));
    } catch (error) {
        res.send(error).status(400);        
    }
});

/* delete quiz */
router.delete(`/:id`, auth, isAdmin, async (req, res) => {
    try {
        res.send(await Quiz.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.send(error).status(400);
    }
});

/* check quiz */
router.post(`/check`, auth, async (req, res) => {
    try {
        /* ქვიზის წამოღება ID-ის მიხედვით ბაზიდან */
        let quiz = await Quiz.findById(req.body.quizId);

        /**
         * * ვამოწმებ გადმოცემული პასუხების რაოდენობა ემთხვევა თუ არა კითხვების რაოდენობას
        */
        if (req.body.answers.length != quiz.questions.length) {
            res.status(400).send(`გთხოვთ მონიშნოთ ყველა პასუხი`);
            return;
        }

        /**
         * * ვითვლი რამდენი პასუხი არის სწორი
        */
        let correctAnswer = 0;
        req.body.answers.forEach((answerIndex, index) => {
            quiz.questions[index]['answers'].forEach((e, i) => {
                if (e.isCorrect && i == answerIndex) correctAnswer +=1;
            });
        });
        /* ვითვლი პროცენტულობას */
        const percentage = `${(correctAnswer / quiz.questions.length * 100).toFixed(0)}%`;
        res.send({allAnswers: req.body.answers.length, correctAnswer, percentage});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;