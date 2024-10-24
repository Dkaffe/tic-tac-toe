import { GameController } from "./game.js";

// Once you have a working console game, create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).

const updateDOM = (function () {
  let player1 = document.querySelector("#player1");
  player1.addEventListener("input", (e) => {
    player1.innerText = e.target.value;
  });

  // Initialize a game
  const game = GameController(player1.innerText, player2);

  // Display board to the screen
  game.printBoard();
})();
