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