// Lets create the grid (14*14 = 196)
function createGrid(){
    for (let index = 1; index <=196; index++) {
        let newSquare = document.createElement("div");
        document.querySelector(".grid").appendChild(newSquare);
        
    }
}

createGrid();

// Variables neeeded
const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector("span");
const startBtn = document.querySelector(".start");

const width = 14;               // Width of my grid
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2,1,0]      // Index: 0=tail 1=body 2=head

let direction = 1;              // Number of squares my snake will move
let score = 0;
let speed = .85;                // Can be increased to make game more difficult
let intervalTime = 0;           // Used for timing
let interval = 0;               // Used for timing

// Start & restart the game
function startGame() {
    // Clear the game and create an apple
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score=0;
    randomApple();

    // Default direction is right (adding 1 to the array is the same as moving right)
    direction=1;

    if (score > 0) {
        scoreDisplay.style.color = "green"
    } else{
        scoreDisplay.style.color = "rgba(27, 44, 11, 0.8)"
    }
    scoreDisplay.innerText = "SCORE: " + score;
    intervalTime = 500;         // Snake moves every half second - 
    currentSnake = [2, 1, 0];   // Set default snake
    currentIndex = 0;

    // Now we can "fill" the snake
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
}

startGame();

function moveOutcomes() {
    
}

function randomApple() {
    
}