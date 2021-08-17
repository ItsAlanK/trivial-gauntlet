document.addEventListener("DOMContentLoaded", async function () { // check for content to be loaded
    let difficultyBtns = document.getElementsByClassName("difficulty-btn");

    let sessionToken = await getToken();

    for (let button of difficultyBtns) { // adds listeners to difficulty selection buttons
        button.addEventListener("click", function (e) { 
            if (e.target.id == "easy-btn") { // calls getQuestions function
                getQuestions("easy", sessionToken);
                startGame();
            } else if (e.target.id == "medium-btn") {
                getQuestions("medium", sessionToken);
                startGame();
            } else if (e.target.id == "hard-btn") {
                getQuestions("hard", sessionToken);
                startGame();
            } else {
                alert("Difficulty Undefined");
            }
        })
    }
})

/**
 * Gets a session token on page load to ensure questions are not duplicated
 */
async function getToken() {
    let response = await fetch("https://opentdb.com/api_token.php?command=request");
    let token = await response.json();
    return token.token;
}

/**
 * Uses Open Trivia Database API to create Array of questions based on difficulty option selected
 */
async function getQuestions(difficultyChoice, sessionToken) {
    let response = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${difficultyChoice}&token=${sessionToken}`);
    let rawData = await response.json();
    console.log(rawData);
}

/** 
 * Resets score & progress values and calls functions to start a new game.
 * Hides title screen and shows game screen.
 */
function startGame() {

}