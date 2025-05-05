const fs = require('fs').promises;
const path = require('path');

async function fetchQuestions(req, res) {
    try {
        const path_to_file = path.join(__dirname, '../data/questions.json');
        const data = await fs.readFile(path_to_file, 'utf8');
        const questionsData = JSON.parse(data);

        const easyQuestions = questionsData.questions.find((levelData) => levelData.level === 'easy');

        if (easyQuestions) {
            return res.json(easyQuestions.questions);
        } else {
            return res.status(404).json({ message: 'No easy questions found' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error fetching questions' });
    }
}

module.exports = { fetchQuestions };
