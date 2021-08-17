document.addEventListener("DOMContentLoaded", function () { // check for content to be loaded
    let difficultyBtns = document.getElementsByClassName("difficulty-btn");

    for (let button of difficultyBtns) { // adds listeners to difficulty selection buttons
        button.addEventListener("click", function (e) { 
            if (e.target.id == "easy-btn") { // calls getQuestions function
                getQuestions("easy");
            } else if (e.target.id == "medium-btn") {
                getQuestions("medium");
            } else if (e.target.id == "hard-btn") {
                getQuestions("hard");
            } else {
                alert("Difficulty Undefined");
            }
            startGame();
        })
    }
})

/**
 * Uses Open Trivia Database API to create Array of questions based on difficulty option selected
 */
async function getQuestions(difficultyChoice) {
    let response = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${difficultyChoice}`);
    let rawData = await response.json();
    console.log(rawData);
}

/** 
 * Resets score & progress values and calls functions to start a new game.
 * Hides title screen and shows game screen.
 */
function startGame() {

}