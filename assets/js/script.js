document.addEventListener("DOMContentLoaded", function() {
    let difficultyBtns = document.getElementsByClassName("difficulty-btn");

    for(let button of difficultyBtns) {
        button.addEventListener("click", function(){
            getQuestions();
            startGame();
        })
    }
})

function getQuestions() {
    alert("getquestions");
}

function startGame() {
    alert("startGame");
}