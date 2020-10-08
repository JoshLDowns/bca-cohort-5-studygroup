//DOM elements
let start = document.getElementById("start");
let status = document.getElementById("status");
let compMove = document.getElementById("comp-move");
let playerMoves = Array.from(document.getElementsByClassName("player-move"));

//Game variables
let playerScore = 0;
let compScore = 0;
let interval = 0;
let timer;

//Game reference variables
let moves = ["ROCK", "PAPER", "SCISSORS"];
let moveMap = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
};

//Start button event listener
start.addEventListener("click", startGame);

//Function that handles start timer
function countDown() {
  interval += 1;
  status.innerText = interval !== 4 ? interval : "GO!";
  if (interval === 4) {
    clearInterval(timer);
    playerMoves.forEach((move) => {
      move.disabled = false;
    });
  }
}

//Resets game board and starts game
function startGame() {
  start.disabled = true;
  status.innerText = "Starting In ...";
  timer = setInterval(countDown, 1000);
  for (let move of playerMoves) {
    move.addEventListener("click", playerMove);
    move.disabled = true;
  }
  compMove.disabled = true;
}

//Handles all game functions, determines computer move, player move, calls win function
function playerMove(event) {
  let comp = moves[Math.floor(Math.random() * 3)];
  let player = event.target.id.toUpperCase();
  playerMoves.forEach((move) => {
    move.removeEventListener("click", playerMove);
    if (event.target.id !== move.id) {
      move.disabled = true;
    }
  });
  compMove.disabled = false;
  compMove.innerText = comp;
  let winner = determineWin(comp, player);
  if (winner === "draw") {
    status.innerText = `It's a Draw! ... Score ${playerScore} - ${compScore}`;
  } else if (winner === "comp") {
    compScore += 1;
    status.innerText = `Computer Wins! ... Score ${playerScore} - ${compScore}`;
  } else {
    playerScore += 1;
    status.innerText = `You Win! ... Score ${playerScore} - ${compScore}`;
  }
  start.disabled = false;
  interval = 0;
}

//Determines win
function determineWin(comp, player) {
  if (comp === player) {
    return "draw";
  }
  //Modulus is weird AF but it works!
  if ((moveMap[comp] - moveMap[player] + 3) % 3 === 1) {
    return "comp";
  } else {
    return "player";
  }
}
