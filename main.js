import { GameController } from "./game.js";

// Once you have a working console game, create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).

const displayController = function () {
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const game = GameController(player1.value, player2.value);

  // Populate playing field with interactive cells
  const printBoard = () => {
    const gameboardCopy = game.gameboard.getBoard();
    const gameContainer = document.querySelector(".game-container");
    gameboardCopy.forEach((item, index) => {
      const cell = document.createElement("div");
      cell.innerText = item || "";
      cell.classList.add("cell");
      cell.addEventListener("click", () => {
        game.playTurn(index);
        gameContainer.innerHTML = "";
        printBoard();
      });
      gameContainer.appendChild(cell);
    });
  };

  printBoard();
};

// Start game logic when user decides to start the game
const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = "";
  displayController();
});
