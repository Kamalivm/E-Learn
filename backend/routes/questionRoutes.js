const express = require('express');
const router = express.Router();
const { getEasyQuestions, getMediumQuestions, getHardQuestions } = require('../controllers/questionsController');

router.get('/easy', getEasyQuestions);
router.get('/medium', getMediumQuestions);
router.get('/hard', getHardQuestions);

module.exports = router;
