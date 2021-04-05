const availableMoves = ["Rock", "Paper", "Scissor"];

let getRandomInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
let computerPlay = () => {
  return getRandomInRange(0, availableMoves.length - 1);
};

let assignHands = (selection) => {
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

let playRound = (playerSelection) => {
  const playerHand = assignHands(playerSelection);
  const computerHand = computerPlay();
  return declareWinner(playerHand, computerHand);
};

let playGame = () => {
  const score = { playerScore: 0, computerScore: 0 };
  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt(
      "Choose a hand ['Rock','Paper','Scissor']:",
      ""
    );
    let result = playRound(playerSelection);
    result.playerWin ? ++score.playerScore : ++score.computerScore;
    console.log(result.message);
  }

  if (score.playerScore > score.computerScore) {
    console.log(
      `Player Wins! The score is ${score.playerScore} to ${score.computerScore}`
    );
  } else if (score.playerScore === score.computerScore) {
    console.log(
      `A Tie! The score is ${score.playerScore} to ${score.computerScore}`
    );
  } else {
    console.log(
      `Computer Wins! The score is ${score.playerScore} to ${score.computerScore}`
    );
  }
};

playGame();
