// Refs
const titleScreenRef = document.querySelector("#title-screen");
const gameWindowRef = document.querySelector("#game-window");
const diffBtnsRef = document.getElementsByClassName("difficulty-btn");
const questionNumberRef = document.querySelector("#question-number");
const questionTextRef = document.getElementById("question");
const answersChoicesRef = Array.from(document.getElementsByClassName("answers-text"));
const strikesRef = document.querySelector("#strikes");
const progressMarkerRef = document.querySelector("#progress-marker");
const finishMarkerRef = document.querySelector("#finish-line");

// variables
let questionIndex = 0;
let answerCheck = "";
let strikes = "";
let strikeCounter = 0;
let ready = false;

document.addEventListener("DOMContentLoaded", async function () {
    const sessionToken = await getToken();

    for (let button of diffBtnsRef) {
        button.addEventListener("click", function (e) {
            let buttonPressed = e.target;
            switch (buttonPressed.id) {
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
        });
    }
});

/**
 * Gets a session token on page load to ensure questions are not duplicated
 * @returns {String} SessionToken
 */
async function getToken() {
    let response = await fetch("https://opentdb.com/api_token.php?command=request");
    let token = await response.json();
    return token.token;
}

/**
 * Uses Open Trivia Database API to create Array of questions based on difficulty option selected
 * @param {String} string chosen difficulty
 * @param {String} string session token
 * @returns {Array} Array of questions and their answers
 */
async function getQuestions(difficultyChoice, sessionToken) {
    const response = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${difficultyChoice}&type=multiple&token=${sessionToken}`);
    const rawData = await response.json();
    const questionsArray = extractData(rawData.results);
    return questionsArray;
}

/**
 * Extracts question and answers from data returned from database
 * @param {Array} Array of all question data from database
 * @returns {Array} Array of questions and their answers
 */
function extractData(questionList) {
    const questionsArray = [];
    questionList.map((item) => {
        let question = item.question;
        let answers = item.incorrect_answers;
        let correctAnswer = item.correct_answer;
        answers.push(correctAnswer);
        shuffle(answers);
        questionsArray.push({
            question: question,
            answers: answers,
            correctAnswer: correctAnswer
        });
    });
    return questionsArray;
}

/** 
 * Resets progress values and calls functions to load in question data and check answers.
 * @param {string} chosen difficulty
 * @param {string} session token
 */
async function startGame(difficulty, token) {
    const questionsArray = await getQuestions(difficulty, token);
    questionIndex = 0;
    strikes = "";
    strikeCounter = 0;
    showGameScreen(true);
    loadQuestion(questionsArray);
    checkAnswer(questionsArray);
}

/** 
 * Increments questionIndex and assigns question and answer values to respective
 * elements based off questionIndex. Stores correct answer in answerCheck variable.
 * @param {Array} Array of questions and answers
 */
function loadQuestion(questions) {
    const questionsArray = questions;
    if (strikeCounter >= 3) {
        displayMessage({
            title: 'Game Over!',
            text: `You have lost to the gauntlet.
            Final level: ${questionIndex}/50`,
            icon: 'error',
            confirmButtonText: 'Try Again?'
        });
        reset();
    } else {
        questionNumberRef.innerHTML = `Question ${questionIndex + 1}`;
        let currentQuestion = questionsArray[questionIndex];
        questionTextRef.innerHTML = `${currentQuestion.question}`;
        for (i = 0; i < answersChoicesRef.length; i++) {
            answersChoicesRef[i].innerHTML = currentQuestion.answers[i];
        }
        answerCheck = currentQuestion.correctAnswer;
        questionIndex++;
        progressMarkerRef.style.gridColumn = questionIndex;
        ready = true;
    }
}

/** 
 * Adds event listeners to answer buttons and checks selected answer against
 * answerCheck set by loadQuestion()
 * @param {Array} array of questions and answers
 */
function checkAnswer(questions) {
    const questionsArray = questions;
    for (let button of answersChoicesRef) {
        button.addEventListener("click", function (e) {
            const buttonPressed = e.target;
            const chosenAnswer = buttonPressed.innerHTML;
            if (ready == true) {
                if (chosenAnswer == answerCheck) {
                    ready = false;
                    strikesRef.innerHTML = strikes;
                    buttonPressed.classList.add("correct");
                    gameWon(questionsArray);
                    setTimeout(() => (
                        buttonPressed.classList.remove("correct"),
                        loadQuestion(questionsArray)
                    ), 1000);
                } else {
                    ready = false;
                    strikes += '<i class="fas fa-skull"></i>';
                    strikeCounter++;
                    strikesRef.innerHTML = strikes;
                    buttonPressed.classList.add("incorrect");
                    gameWon(questionsArray);
                    setTimeout(() => (
                        buttonPressed.classList.remove("incorrect"),
                        loadQuestion(questionsArray)
                    ), 1000);
                }
            }
        });
    }
}

/**
 * Toggles between title and game screen
 * @param {Boolean} If true shows game screen, if false shows title screen
 */
function showGameScreen(showScreen) {
    showScreen ? titleScreenRef.classList.add("hidden") : titleScreenRef.classList.remove("hidden");
    showScreen ? gameWindowRef.classList.remove("hidden") : gameWindowRef.classList.add("hidden");
}

/**
 * Checks with each round if player has gotten to the end
 * of the questions list
 * @param {Array} array of questions and answers
 */
function gameWon(questions) {
    if (questionIndex >= questions.length) {
        displayMessage({
            title: 'Winner!',
            text: 'You have challenged the gauntlet and won',
            icon: 'success',
            confirmButtonText: 'Play again?'
        });
        reset();
    }
}

/**
 * Uses Sweet Alerts 2 to fire alert based on object provided
 * @param {Object} Message details to be displayed in alert
 */
function displayMessage(message) {
    Swal.fire(message);
}

/**
 * Resets all values to starting values and calls function to return to title screen
 */
function reset() {
    showGameScreen(false);
    questionIndex = 0;
    strikesRef.innerHTML = "";
    strikeCounter = 0;
    progressMarkerRef.style.gridColumn = 1;
    finishMarkerRef.classList.remove = "hidden";
}

/**
 * Fisher-Yates algorithm. Shuffles array of answers provided
 * @param {Array} array of answers to each question
 * @returns {Array} array of answers shuffled
 */
function shuffle(answers) {
    let currentIndex = answers.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [answers[currentIndex], answers[randomIndex]] = [
            answers[randomIndex], answers[currentIndex]
        ];
    }
    return answers;
}