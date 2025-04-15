// const data = require("")
const data = require("../data/questions")
const js = require('json5');
const fs = require('fs').promises;
const path = require('path');
const result = true;



async function fetchQuestions(){
    try{
        const path_to_file = path.join(__dirname, '../data/questions.json');
        const data = await fs.readFile(path_to_file , 'utf8');
        const questionsData = JSON.parse(data);
        questionsData.level = "easy";

        console.log(questionsData.level == 'easy' ? questionsData.questions : 'No questions found');
        

    }
    catch(er){
        console.error('error : ', er);
    }
}
fetchQuestions();