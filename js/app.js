///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn = "X"
let win;
let pointsX = 0;
let pointsO = 0;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("pickX").onclick = pickX;
document.getElementById("pickO").onclick = pickO;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", "",
  ];
turn = turn;
  win = null;
  render();
};

// who going first
function pickX() {
  document.getElementById("turn").innnerHTML = "Turn: X";
  turn = "X";
};

function pickO() {
  document.getElementById("turn").innerHTML = "Turn: O";
  turn = "O";
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });
  message.textContent = win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;

};

function takeTurn(e) {
  if (!win) {
  let index = squares.findIndex(function(square){
    return square === e.target
  });

if (board[index] === "") {
  board[index] = turn;
  turn = turn === "X" ? "O" : "X";
  win = getWinner();
  render();
    }
  }
};

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] && board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });

//score count
  if (winner === "X") {
    pointsX++;
    document.getElementById("scoreX").innerHTML = pointsX;
  }

  if (winner === "O") {
    pointsO++;
    document.getElementById("scoreO").innerHTML = pointsO;
  }


  return winner ? winner : board.includes("") ? null : "T";



};
