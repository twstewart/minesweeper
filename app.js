import createBoard, { markTile, tileStatuses } from "./js/minesweeper";

const boardEl = document.querySelector("#board");
const minesLeftEl = document.querySelector("#mines-left");

const boardSize = 10;
const numOfMines = 10;

const board = createBoard(boardSize, numOfMines);

board.forEach((row) => {
  row.forEach((tile) => {
    boardEl.append(tile.el);
    tile.el.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      calcMinesLeft();
    });
  });
});

function calcMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return count + row.filter((tile) => tile.status === tileStatuses.MARKED).length;
  }, 0);

  minesLeftEl.textContent = numOfMines - markedTilesCount;
}

boardEl.style.setProperty("--numTiles", boardSize);
minesLeftEl.textContent = numOfMines;
