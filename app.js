import createBoard, { checkLose, checkWin, markTile, revealTile, tileStatuses } from "./js/minesweeper";

const boardEl = document.querySelector("#board");
const minesLeftEl = document.querySelector("#mines-left");
const subMsgText = document.querySelector("#sub-text");

const boardSize = 10;
const numOfMines = 10;

const board = createBoard(boardSize, numOfMines);

board.forEach((row) => {
  row.forEach((tile) => {
    boardEl.append(tile.el);
    tile.el.addEventListener("click", (_e) => {
      revealTile(tile, board);
      checkGameOver();
    });

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

function checkGameOver() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardEl.addEventListener("click", endPropagation, { capture: true });
    boardEl.addEventListener("contextmenu", endPropagation, { capture: true });
  }

  if (win) {
    subMsgText.textContent = "You won! 😀";
  }

  if (lose) {
    subMsgText.textContent = "You loss... 😭";

    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === tileStatuses.MARKED) {
          markTile(tile);
        }

        if (tile.mine) {
          revealTile(tile, board);
        }
      });
    });
  }
}

function endPropagation(e) {
  e.stopImmediatePropagation();
}

boardEl.style.setProperty("--numTiles", boardSize);
minesLeftEl.textContent = numOfMines;
