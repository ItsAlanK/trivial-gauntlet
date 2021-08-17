document.addEventListener("DOMContentLoaded", function () {
    let difficultyBtns = document.getElementsByClassName("difficulty-btn");

    for (let button of difficultyBtns) {
        button.addEventListener("click", function () {
            getQuestions();
            startGame();
        })
    }
})

/**
 * Uses Open Trivia Database API to create Array of questions based on difficulty option selected
 */
function getQuestions() {
    alert("getquestions");
}

/** 
 * Resets score and progress values and calls functions to start a new game
 */
function startGame() {
    alert("startGame");
}