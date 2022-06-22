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

    updateScore();

    scoreDisplay.innerText = "SCORE: " + score;
    intervalTime = 500;         // Snake moves every half second - 
    currentSnake = [2, 1, 0];   // Set default snake
    currentIndex = 0;

    // Now we can "fill" the snake
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
}

function moveOutcomes() {
    checkForGameEnd();
    updateSnake();
    eatsAnApple();
    updateScore();
    squares[currentSnake[0]].classList.add("snake");
}

function checkForGameEnd(){
    if (
        (currentSnake[0] % width === width - 1 && direction === 1) ||           // snake head hits right
        (currentSnake[0] - width < 0 && direction === -width)||                 // snake head hits top
    (currentSnake[0] % width === 0 && direction === -1) ||                      // snake head hits left
        (currentSnake[0] + width >= width * width && direction === width) ||    // snake head hits bottom
        squares[currentSnake[0] + direction].classList.contains("snake")        // snake hits self
      ) {
        scoreDisplay.style.color = "red";
        scoreDisplay.innerText = "Game Over! " + score;
        return clearInterval(interval);                                         // ends game if any of the above happen
      }
}

function updateSnake() {
    // remove the tail
    // The pop() method removes the last element from an array
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");

    // The unshift() method adds one or more elements to the BEGINNING of an array
    // give direction to the array
    currentSnake.unshift(currentSnake[0] + direction);
}

function eatsAnApple(params) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    // The push() method adds one or more elements to the END of an array
    currentSnake.push(tail);

    randomApple();
    updateScore();

    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcomes, intervalTime);
  }
}

updateScore(){
    score++;
    if (score > 0) {
      scoreDisplay.style.color = "green";
    } else {
      scoreDisplay.style.color = "black";
    }
    scoreDisplay.textContent = "My score: " + score;
}

function randomApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
      } while (squares[appleIndex].classList.contains("snake"));
      squares[appleIndex].classList.add("apple");
}

startGame();