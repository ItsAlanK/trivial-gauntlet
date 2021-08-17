document.addEventListener("DOMContentLoaded", async function () { // check for content to be loaded
    let difficultyBtns = document.getElementsByClassName("difficulty-btn");
    let sessionToken = await getToken(); // assigns session token on page load

    for (let button of difficultyBtns) { // adds listeners to difficulty selection buttons
        button.addEventListener("click", function (e) {
            if (e.target.id == "easy-btn") { // calls startGame function, passes difficulty and session token
                startGame("easy", sessionToken);
            } else if (e.target.id == "medium-btn") {
                startGame("medium", sessionToken);
            } else if (e.target.id == "hard-btn") {
                startGame("hard", sessionToken);
            } else {
                alert("Difficulty Undefined: Refreshing Page");
                location.reload();
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
    let response = await fetch(`https://opentdb.com/api.php?amount=50&difficulty=${difficultyChoice}&type=multiple&token=${sessionToken}`);
    let rawData = await response.json();
    rawData = rawData.results;
    extractData(rawData);

}

function extractData(questionList) {
    console.log(questionList);
    questionList.map((item) => {
        let question = item.question;
        console.log(question);
        let answers = item.incorrect_answers;
        console.log(answers);
    })
}

/** 
 * Resets score & progress values and calls functions to start a new game.
 */
function startGame(difficulty, token) {
    getQuestions(difficulty, token);
    hideScreen();

}

/**
 * Hides title screen and reveals game screen.
 */
function hideScreen() {
    document.getElementById("title-screen").className += " hidden";
    document.getElementById("game-window").classList.remove("hidden");
}