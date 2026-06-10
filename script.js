const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const gameboard = () => {
  let board = Array(9).fill(null);
  const getBoard = () => board;
  const markCell = (playerMark, index) => {
    if (board[index] === null) {
      board[index] = playerMark;
      return true;
    }
    return false;
  };
  const winningCheck = (playerMark) => {
    return WINNING_COMBOS.some((winningArray) => {
      return winningArray.every((cell) => board[cell] === playerMark);
    });
  };
  const resetBoard = () => {
    board = Array(9).fill(null);
  };

  const tieCheck = () => board.every((cell) => cell !== null);
  return {
    getBoard,
    markCell,
    winningCheck,
    tieCheck,
    resetBoard,
  };
};

const createPlayer = (playerNum, mark) => {
  let score = 0;
  const getPlayer = () => playerNum;
  const getMark = () => mark;
  const getScore = () => score;
  const addScore = () => score++;
  return { getPlayer, getMark, getScore, addScore };
};

const getPlayerName = (player) => {
  const id = player.getPlayer() === 1 ? "player1-name" : "player2-name";
  return (
    document.getElementById(id).value.trim() || `Player ${player.getPlayer()}`
  );
};

const displayGrid = (board, player1, player2) => {
  let currentPlayer = player1;
  let gameOver = false;

  const turnIndicator = document.getElementById("turn-indicator");
  const resultDisplay = document.getElementById("result-display");
  const container = document.querySelector(".grid-container");

  const updateTurnIndicator = () => {
    const name = getPlayerName(currentPlayer);
    turnIndicator.textContent = `${name}'s turn (${currentPlayer.getMark()})`;
  };

  const showResult = (message, isWin) => {
    resultDisplay.textContent = message;
    resultDisplay.className = "result-display " + (isWin ? "win" : "tie");
    resultDisplay.classList.remove("hidden");
  };

  const render = () => {
    container.innerHTML = "";
    const boardState = board.getBoard();

    boardState.forEach((mark, i) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      if (mark !== null) {
        cell.classList.add("taken");
        cell.textContent = mark;
      }
      container.appendChild(cell);
    });
  };

  const handleCellClick = (e) => {
    const cell = e.target.closest(".cell");
    if (!cell || gameOver || cell.classList.contains("taken")) return;

    const index = parseInt(cell.dataset.index);
    if (!board.markCell(currentPlayer.getMark(), index)) return;

    cell.textContent = currentPlayer.getMark();
    cell.classList.add("taken");

    if (board.winningCheck(currentPlayer.getMark())) {
      gameOver = true;
      currentPlayer.addScore();
      showResult(`${getPlayerName(currentPlayer)} wins!`, true);
    } else if (board.tieCheck()) {
      gameOver = true;
      showResult("It's a tie!", false);
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      updateTurnIndicator();
    }
  };

  const reset = () => {
    board.resetBoard();
    currentPlayer = player1;
    gameOver = false;
    resultDisplay.classList.add("hidden");
    resultDisplay.textContent = "";
    render();
    updateTurnIndicator();
  };

  container.addEventListener("click", handleCellClick);
  render();
  updateTurnIndicator();
  return { reset };
};

const setupGame = () => {
  const setupDiv = document.querySelector(".setup");
  const gameArea = document.querySelector(".game-area");
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");

  let board;
  let player1;
  let player2;
  let game;

  startBtn.addEventListener("click", () => {
    player1 = createPlayer(1, "X");
    player2 = createPlayer(2, "O");
    board = gameboard();
    game = displayGrid(board, player1, player2);

    setupDiv.classList.add("hidden");
    gameArea.classList.remove("hidden");
  });

  restartBtn.addEventListener("click", () => {
    game.reset();
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    gameArea.classList.add("hidden");
    setupDiv.classList.remove("hidden");
  });
};

setupGame();
