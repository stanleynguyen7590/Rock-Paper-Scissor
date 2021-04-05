const availableMoves = ["Rock", "Paper", "Scissor"];

let getRandomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
let computerPlay = () => {
  return getRandomInRange(0, availableMoves.length - 1);
};

let assignHands = selection => {
  if (selection.toLowerCase() === "rock") {
    return 0;
  } else if (selection.toLowerCase() === "paper") {
    return 1;
  } else {
    return 2;
  }
};
let declareWinner = (playerSelection, computerSelection) => {
  let playerWin, computerWin, message;
  if ((playerSelection + 1) % 3 === computerSelection) {
    message = `Computer Won! ${availableMoves[computerSelection]} beats ${availableMoves[playerSelection]}`;
    computerWin = true;
    playerWin = false;
  } else if (playerSelection === computerSelection) {
    message = `A Tie!`;
    computerWin = false;
    playerWin = false;
  } else {
    message = `Player Won! ${availableMoves[playerSelection]} beats ${availableMoves[computerSelection]}`;
    computerWin = false;
    playerWin = true;
  }
  return { playerWin, message, computerWin };
};

let playRound = playerSelection => {
  const playerHand = assignHands(playerSelection);
  const computerHand = computerPlay();
  return declareWinner(playerHand, computerHand);
};
const score = { playerScore: 0, computerScore: 0 };
let playGame = playerSelection => {
  let result = playRound(playerSelection);
  if (result.playerWin) {
    ++score.playerScore;
  } else if (result.computerWin) {
    ++score.computerScore;
  }
  // result.playerWin ? ++score.playerScore : ++score.computerScore;
  return { ...result, score };
};

let resultDisplay = document.querySelector("#Result");
let playerScoreDisplay = document.querySelector("#playerScore");
let computerScoreDisplay = document.querySelector("#computerScore");

let buttons = document.querySelectorAll("button");
buttons.forEach(button =>
  button.addEventListener("click", e => {
    let { message, score } = playGame(e.target.value);
    let { playerScore, computerScore } = score;
    resultDisplay.textContent = message;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    if (playerScore === 5) {
      resultDisplay.textContent = "You have won!";
      buttons.forEach(button => button.setAttribute("disabled", "true"));
    } else if (computerScore === 5) {
      resultDisplay.textContent = "Computer have won!";
      buttons.forEach(button => button.setAttribute("disabled", "true"));
    }
  })
);
