// Gameboard factory function
const Gameboard = (function () {
  return function () {
    // 3x3 Tic-Tac-Toe board
    const board = Array(9).fill(null);

    // Access to the board
    const getBoard = () => board;

    // Function to place a marker
    const placeMarker = (index, marker) => {
      if (board[index] === null) {
        board[index] = marker;
        return true;
      }
      return false;
    };

    // Reset board
    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = null;
      }
    };

    return { getBoard, placeMarker, resetBoard };
  };
})();

// Player factory function
const Player = (function () {
  return function (name, marker) {
    return { name, marker };
  };
})();

// Game control factory function
const GameController = (function () {
  return function (player1Name, player2Name) {
    // Setup variables
    const gameboard = Gameboard();
    const player1 = Player(player1Name, "X");
    const player2 = Player(player2Name, "O");
    // Keep track of state
    let currentPlayer = player1;
    let gameWon = false;

    // Winning combinations
    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    // Check for a winner
    const checkWinner = () => {
      const board = gameboard.getBoard();
      for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return currentPlayer;
        }
      }
      return null;
    };

    // Check for a draw
    const checkDraw = () => {
      return gameboard.getBoard().every((cell) => cell !== null);
    };

    // Switching player turns
    const switchTurns = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    // Playing a turn
    const playTurn = (index) => {
      if (gameWon) {
        console.log("Game Over. Please reset the game");
      }

      if (gameboard.placeMarker(index, currentPlayer.marker)) {
        console.log(`${currentPlayer.name} placed ${currentPlayer.marker} on index: ${index}.`);

        // Check for winner
        const winner = checkWinner;
        if (winner) {
          console.log(`${winner.name} won the game!`);
          return;
        }

        // Check for draw
        if (checkDraw()) {
          console.log("It's a draw!");
          return;
        }

        switchTurns();
      } else {
        console.log("Spot is taken! Please try again.");
      }
    };

    // Printing the board to console
    const printBoard = () => {
      console.log(gameboard.getBoard());
    };

    // Resetting the game
    const resetGame = () => {
      gameboard.resetBoard();
      gameWon = false;
      currentPlayer = player1;
      console.log("Game has been reset.");
    };

    return { playTurn, printBoard, resetGame };
  };
})();
