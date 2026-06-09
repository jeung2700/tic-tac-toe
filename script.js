const gameboard = () => {
  let board = Array(9).fill(null);
  const getBoard = () => board;
  const markCell = (playerMark, selectionCoordinates) => {
    if (board[selectionCoordinates] === null) {
      board[selectionCoordinates] = playerMark;
      return true;
    }
    return false;
  };
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const getWinningCombination = () => winningCombination;
  const winningCheck = (playerMark) => {
    return winningCombination.some((winningArray) => {
      return winningArray.every((cell) => board[cell] === playerMark);
    });
  };
  const resetBoard = () => {
    board = Array(9).fill(null);
  };

  const tieCheck = () => board.every((cell) => cell !== null);
  return {
    board,
    getBoard,
    markCell,
    winningCombination,
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

const playGame = () => {
  const player1 = createPlayer(1, "X");
  const player2 = createPlayer(2, "O");
  const board = gameboard();
  let turnNumber = 0;
  let turnPlayer = turnNumber % 2 == 0 ? player1 : player2;
  while (
    !(
      board.winningCheck(player1.getMark()) ||
      board.winningCheck(player2.getMark()) ||
      board.tieCheck()
    )
  ) {
    while (
      !board.markCell(turnPlayer.getMark(), Math.floor(Math.random() * 9))
    ) {
      //randoming until you can insert a cell
    }
    console.log(board.getBoard());
    if (board.winningCheck(turnPlayer.getMark())) turnPlayer.addScore();
    turnNumber++;
    turnPlayer = turnNumber % 2 == 0 ? player1 : player2;
  }
};

playGame();
