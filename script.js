const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const livesX = document.querySelector("#livesX");
const livesO = document.querySelector("#livesO")
const restertBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let oppositePlayer = "O";
let running = false;
let currentLife = 3;


initializeGame()
lifeX();
lifeO();


initializeGame()

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn` 
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){ 
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`
        lifeO();
        running = false;
    } 
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    } else{
        changePlayer();
    }

}

function restartGame(){
    currentPlayer = "X";
    oppositePlayer = "O";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent = "");
    running = true;

}


function lifeX() {
  livesX.textContent = `${currentPlayer} has ${currentLife} lives left`
  currentLife--;
  if (currentPlayer == "O" && roundWon == true){
    currentLife --;
  }
  else if (currentLife <= 0) {
    livesX.textContent= `${currentPlayer} you lose!`

    }
}
function lifeO() {
  livesO.textContent = `${oppositePlayer} has ${currentLife} lives left`;
  oppositePlayer--;
  if (oppositePlayer <= 0) {
    livesO.textContent= `${oppositePlayer} you lose!`
    }
}


  // TIMER 

  // let remainingTimeElement = document.querySelector("#remainingTime"),
  //   secondsLeft = 10;
  // const downloadTimer = setInterval(() => {
  //   if (secondsLeft <= 0) clearInterval(downloadTimer);
  //   remainingTimeElement.value = secondsLeft;
  //   remainingTimeElement.textContent = secondsLeft;
    
  //   secondsLeft -= 1;
  // }, 1000);

  let remainingTimeElement = document.getElementById("remainingTime"),
  secondsLeft = 10;
const downloadTimer = setInterval(() => {
  if (secondsLeft <= 0) clearInterval(downloadTimer);
  remainingTimeElement.value = secondsLeft;
  // remainingTimeElement.textContent = secondsLeft;
  remainingTimeElement.innerHTML = secondsLeft+  " seconds left"
  
  secondsLeft -= 1;
}, 1000);

