import createBoard from "./js/minesweeper";

const boardEl = document.querySelector("#board");
const minesLeftEl = document.querySelector("#mines-left");

const boardSize = 10;
let numOfMines = 10;

const board = createBoard(boardSize, numOfMines);

board.forEach((row) => {
  row.forEach((tile) => {
    boardEl.append(tile.el);
  });
});

boardEl.style.setProperty("--numTiles", boardSize);
minesLeftEl.textContent = numOfMines;
