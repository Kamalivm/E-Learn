

const fs = require('fs');
const path = require('path');

const filterQuestions = (difficulty, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'questions.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading questions.json:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    try {
      const questionsData = JSON.parse(data);

      const difficultyLevel = questionsData.questions.find((q) => q.level === difficulty);

      if (!difficultyLevel || difficultyLevel.questions.length === 0) {
        return res.status(404).json({ message: `No ${difficulty} questions found.` });
      }

      res.status(200).json(difficultyLevel.questions);
    } catch (parseError) {
      console.error('Error parsing questions.json:', parseError);
      return res.status(500).json({ message: 'Error parsing questions.json' });
    }
  });
};

const getEasyQuestions = (req, res) => filterQuestions('easy', res);
const getMediumQuestions = (req, res) => filterQuestions('medium', res);
const getHardQuestions = (req, res) => filterQuestions('hard', res);

module.exports = { getEasyQuestions, getMediumQuestions, getHardQuestions };
