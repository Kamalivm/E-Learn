const express = require('express');
const router = express.Router();
const { fetchQuestions } = require('../controllers/questionsController');

router.get('/questions', fetchQuestions); // Fetch all questions
// router.get('/medium', getMediumQuestions);
// router.get('/hard', getHardQuestions);

module.exports = router;
