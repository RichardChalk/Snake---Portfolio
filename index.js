// Lets create the grid (14*14 = 196)
function createGrid(){
    for (let index = 1; index <=196; index++) {
        let newSquare = document.createElement("div");
        document.querySelector(".grid").appendChild(newSquare);
        
    }
}

createGrid();