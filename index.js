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
    clearGame();
    randomApple();
    displayScore();
    setDefaultSnake();  
    
    // Calls function "moveOutcomes" every interval time (every half second to start with)
    interval = setInterval(moveOutcomes, intervalTime);
}

function clearGame() {
    // Clear the game
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score=0;

    // Default direction is right (adding 1 to the array is the same as moving right)
    direction=1;
}

function setDefaultSnake(){
    intervalTime = 500;         // Snake moves every half second - 
    currentSnake = [2, 1, 0];   // Set default snake
    currentIndex = 0;

    // Now I can "fill" the snake
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
}

function moveOutcomes() {
    // Check is game is over - illegal move
    if (
      (currentSnake[0] % width === width - 1 && direction === 1) || // snake head hits right
      (currentSnake[0] - width < 0 && direction === -width) || // snake head hits top
      (currentSnake[0] % width === 0 && direction === -1) || // snake head hits left
      (currentSnake[0] + width >= width * width && direction === width) || // snake head hits bottom
      squares[currentSnake[0] + direction].classList.contains("snake") // snake hits self
    ) {
      scoreDisplay.style.color = "red";
      scoreDisplay.innerText = "Game Over! " + score;
      return clearInterval(interval); // ends game if any of the above happen
    }
  
    // remove the tail
    // The pop() method removes the last element from an array
    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
  
    // The unshift() method adds one or more elements to the BEGINNING of an array
    // give direction to the array
    currentSnake.unshift(currentSnake[0] + direction);
  
    // eats an apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      // The push() method adds one or more elements to the END of an array
      currentSnake.push(tail);
  
      randomApple();
  
      score++;
      if (score > 0) {
        scoreDisplay.style.color = "green";
      } else {
        scoreDisplay.style.color = "black";
      }
      scoreDisplay.textContent = "SCORE: " + score;
  
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
}
      
function displayScore(){
    if (score > 0) {
      scoreDisplay.style.color = "green";
    } else {
      scoreDisplay.style.color = "black";
    }
    scoreDisplay.textContent = "SCORE: " + score;
}

function randomApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
      } while (squares[appleIndex].classList.contains("snake"));
      squares[appleIndex].classList.add("apple");
}

// Setting direction of the snake=============================================================
function control(event) {
    squares[currentIndex].classList.remove("snake");
  
    // Stop snakey from ending the game if he reverses on himself
    if (event.key === "ArrowRight") {
      direction = 1;                        // snake moves 1 div to the right
    } else if (event.key === "ArrowUp") {
      direction = -width;                   // snake goes back 10 divs (appearing to move upwards)
    } else if (event.key === "ArrowLeft") {
      direction = -1;                       // snake moves 1 div to the left
    } else if (event.key === "ArrowDown") {
      direction = +width;                   // snake goes forward 10 divs (appearing to move downwards)
    }
  }

  // Event listeners============================================================================

document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);
  