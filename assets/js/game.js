// Refs
const titleScreenRef = document.querySelector("#title-screen");
const gameWindowRef = document.querySelector("#game-window");
const diffBtnsRef = document.getElementsByClassName("difficulty-btn");
const questionNumberRef = document.querySelector("#question-number");
const questionTextRef = document.getElementById("question");
const answersChoicesRef = Array.from(document.getElementsByClassName("answers-text"));
const strikesRef = document.querySelector("#strikes");
const progressMarkerRef = document.querySelector("#progress-marker");

// variables
let questions = [];
let questionIndex = 0;
let answerCheck = "";
let strikes = "";
let strikeCounter = 0;
let ready = false;

document.addEventListener("DOMContentLoaded", async function () {
    const sessionToken = await getToken();

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
        });
    }
});

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
 * @param {string} chosen difficulty
 * @param {string} session token
 */
async function getQuestions(difficultyChoice, sessionToken) {
    let response = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${difficultyChoice}&type=multiple&token=${sessionToken}`);
    let rawData = await response.json();
    rawData = rawData.results;
    extractData(rawData);
}

/**
 * Extracts question and answers from data returned from database
 * @param {array} List of all question data
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
        });
    });
}

/** 
 * Resets progress values and calls functions to start a new game.
 * @param {string} chosen difficulty
 * @param {string} session token
 */
async function startGame(difficulty, token) {
    await getQuestions(difficulty, token);
    questionIndex = 0;
    strikes = "";
    strikeCounter = 0;
    hideScreen();
    loadQuestion();
    checkAnswer();
}

/** 
 * Increments questionIndex and assigns question and answer values to respective
 * elements based off questionIndex.
 */
function loadQuestion() {
    if (strikeCounter >= 3) {
        Swal.fire({
            title: 'Game Over!',
            text: `You have lost to the gauntlet.
            Final level: ${questionIndex}/50`,
            icon: 'error',
            confirmButtonText: 'Try Again?',
        });
        reset();
    } else {
        questionNumberRef.innerHTML = `Question ${questionIndex + 1}`;
        let currentQuestion = questions[questionIndex];
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
 */
function checkAnswer() {
    for (let button of answersChoicesRef) {
        button.addEventListener("click", function (e) {
            const chosenAns = e.target.innerHTML;
            if (ready == true) {
                if (chosenAns == answerCheck) {
                    ready = false;
                    strikesRef.innerHTML = strikes;
                    e.target.classList.add("correct");
                    gameWon();
                    setTimeout(() => (
                        e.target.classList.remove("correct"),
                        loadQuestion()
                    ), 1000);
                } else {
                    ready = false;
                    strikes += '<i class="fas fa-skull"></i>';
                    strikeCounter++;
                    strikesRef.innerHTML = strikes;
                    e.target.classList.add("incorrect");
                    gameWon();
                    setTimeout(() => (
                        e.target.classList.remove("incorrect"),
                        loadQuestion()
                    ), 1000);
                }
            }
        });
    }
}

/**
 * Hides title screen and reveals game screen.
 */
function hideScreen() {
    titleScreenRef.classList.add("hidden");
    gameWindowRef.classList.remove("hidden");
}

/**
 * Checks with each round if player has gotten to the end
 * of the questions list
 */
function gameWon() {
    if (questionIndex > questions.length) {
        Swal.fire({
            title: 'Winner!',
            text: 'You have challenged the gauntlet and won',
            icon: 'success',
            confirmButtonText: 'Play again?'
        });
        reset();
    }
}

function reset() {
    titleScreenRef.classList.remove("hidden");
    gameWindowRef.classList.add("hidden");
    questionIndex = 0;
    strikesRef.innerHTML = "";
    strikeCounter = 0;
    progressMarkerRef.style.gridColumn = 1;
}

//Fisher-Yates algorithm
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