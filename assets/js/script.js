// Refs
const titleScreenRef = document.querySelector("#title-screen");
const gameWindowRef = document.querySelector("#game-window");
const diffBtnsRef = document.getElementsByClassName("difficulty-btn");
const questionNumberRef = document.querySelector("#question-number");
const questionTextRef = document.getElementById("question");
const answersChoicesRef = Array.from(document.getElementsByClassName("answers-text"));

// variables
let questions = [];
let questionIndex = 0;
let answerCheck = "";
let score = 0;
let strikes = 0;


document.addEventListener("DOMContentLoaded", async function () {
    let sessionToken = await getToken();

    for (let button of diffBtnsRef) {
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
 * @param {string} difficulty
 * @param {string} sessionToken
 */
async function startGame(difficulty, token) {
    await getQuestions(difficulty, token);
    score = 0;
    questionIndex = 0;
    strikes = 0;
    hideScreen();
    loadQuestion();
    checkAnswer();
}

/** 
 * Increments questionIndex and assigns question and answer values to respective
 * elements based off questionIndex.
 */
function loadQuestion() {
    questionNumberRef.innerHTML = `Question ${questionIndex + 1}`;
    let currentQuestion = questions[questionIndex];
    questionTextRef.innerHTML = `${currentQuestion.question}`;
    for (i = 0; i < answersChoicesRef.length; i++) {
        answersChoicesRef[i].innerHTML = currentQuestion.answers[i];
    }
    answerCheck = currentQuestion.correctAnswer;
    questionIndex++;
}

/** 
 * Adds event listeners to answer buttons and checks selected answer against
 * answerCheck set by loadQuestion()
 */
function checkAnswer() {
    for (let button of answersChoicesRef) {
        button.addEventListener("click", function (e) {
            const chosenAns = e.target.innerHTML;
            if (chosenAns == answerCheck) {
                score += 1;
                e.target.classList.add("correct");
                setTimeout(() => (
                    e.target.classList.remove("correct"),
                    loadQuestion()
                ), 2000);
            } else {
                strikes += 1;
                e.target.classList.add("incorrect");
                setTimeout(() => (
                    e.target.classList.remove("incorrect"),
                    loadQuestion()
                ), 2000);
            }
        })
    }
}

/**
 * Hides title screen and reveals game screen.
 */
function hideScreen() {
    titleScreenRef.classList.add("hidden");
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