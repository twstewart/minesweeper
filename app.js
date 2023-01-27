import createBoard from "./js/minesweeper";

const boardEl = document.querySelector("#board");

const boardSize = 10;
const numOfMines = 10;

const board = createBoard(boardSize, numOfMines);

board.forEach((row) => {
  row.forEach((tile) => {
    boardEl.append(tile.el);
  });
});

boardEl.style.setProperty("--numTiles", boardSize);
