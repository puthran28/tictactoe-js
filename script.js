const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
var timer;
var button;
var timeLeft;
var label;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
label = document.getElementById('label')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()
takeMove()

restartButton.addEventListener('click', startGame, takeMove)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
    cell.addEventListener("click", takeMove);
  })
  
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}



function countdown() {
  if (timeLeft) {
    label.innerHTML = timeLeft;
    timeLeft--;
    timer = setTimeout(countdown, 1000);
  } else {
    label.innerHTML = "Fail";
    timer = undefined;
    swapTurns()
    setBoardHoverClass()
    takeMove()
  }
}

function takeMove() {
  if (typeof(timer) === "undefined") {
    label.innerHTML = "Move";
    timeLeft = 10;
    countdown();
  } else {
    clearTimeout(timer);
    timeLeft = 10;
    countdown();
  }
}


function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    
    swapTurns()
    setBoardHoverClass()
    takeMove()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  setMessage("X get's to Start")
  cell.classList.add(currentClass)
  
  
}

function swapTurns() {
  circleTurn = !circleTurn
  
 

}


function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
    setMessage("O's turn")
  } else {
    board.classList.add(X_CLASS)
    setMessage("X's turn")
  }
}

function setMessage(msg){
  document.getElementById("message").innerText = msg;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

