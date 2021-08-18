const titleScreenRef = document.querySelector("#title-screen");
const gameWindowRef = document.querySelector("#game-window");
const diffBtnsRef = document.getElementsByClassName("difficulty-btn");
const questionTextRef = document.getElementById("question");
const answersChoicesRef = document.getElementsByClassName("answers-text");

let questions = [];

document.addEventListener("DOMContentLoaded", async function () {
    let difficultyBtns = diffBtnsRef;
    let sessionToken = await getToken();

    for (let button of difficultyBtns) {
        button.addEventListener("click", function (e) {
            switch (e.target.id) {
                case "easy-btn":
                    startGame("easy", sessionToken);
                    break;
                case "medium-btn":
                    startGame("medium", sessionToken);
                    break;
                case "hard-btn":
                    startGame("hard", sessionToken);
                    break;
                default:
                    break;
            }
        })
    }
})

/**
 * Gets a session token on page load to ensure questions are not duplicated
 * @returns {string} sessionToken
 */
async function getToken() {
    let response = await fetch("https://opentdb.com/api_token.php?command=request");
    let token = await response.json();
    return token.token;
}

/**
 * Uses Open Trivia Database API to create Array of questions based on difficulty option selected
 * @param {string} difficultyChoice
 * @param {string} sessionToken
 */
async function getQuestions(difficultyChoice, sessionToken) {
    let response = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${difficultyChoice}&type=multiple&token=${sessionToken}`);
    let rawData = await response.json();
    rawData = rawData.results;
    extractData(rawData);
}

/**
 * Extracts question and answers from data returned from database
 * @param {array} questionList 
 */
function extractData(questionList) {
    questionList.map((item) => {
        let question = item.question;
        let answers = item.incorrect_answers;
        let correctAnswer = item.correct_answer;
        answers.push(correctAnswer);
        shuffle(answers);
        questions.push({
            question: question,
            answers: answers,
            correctAnswer: correctAnswer
        })
    })
}

/** 
 * Resets score & progress values and calls functions to start a new game.
 */
async function startGame(difficulty, token) {
    getQuestions(difficulty, token);
    hideScreen();
    await console.log(questions);
}

/**
 * Hides title screen and reveals game screen.
 */
function hideScreen() {
    titleScreenRef.className += " hidden";
    gameWindowRef.classList.remove("hidden");
}

//Fisher-Yates algorithm
function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}