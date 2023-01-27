const tileStatuses = {
  HIDDEN: "hidden",
  NUMBER: "number",
  MARKED: "marked",
  MINE: "mine",
};

export default function createBoard(boardSize = 10, numOfMines = 10) {
  const board = [];

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const el = document.createElement("div");
      el.dataset.status = tileStatuses.HIDDEN;

      const tile = { x, y, el };
      row.push(tile);
    }
    board.push(row);
  }

  return board;
}
