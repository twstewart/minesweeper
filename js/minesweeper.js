const tileStatuses = {
  HIDDEN: "hidden",
  NUMBER: "number",
  MARKED: "marked",
  MINE: "mine",
};

export default function createBoard(boardSize = 10, numOfMines = 10) {
  const board = [];
  const minePositions = generateMinePositions(boardSize, numOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const el = document.createElement("div");
      el.dataset.status = tileStatuses.HIDDEN;

      const tile = {
        x,
        y,
        el,
        mine: minePositions.some((p) => positionMatch(p, { x, y })),
        get status() {
          return this.el.dataset.status;
        },
        set status(value) {
          this.el.dataset.status = value;
        },
      };
      row.push(tile);
    }
    board.push(row);
  }

  return board;
}

function generateMinePositions(boardSize, numOfMines) {
  const positions = [];

  while (positions.length < numOfMines) {
    const position = {
      x: randNum(boardSize),
      y: randNum(boardSize),
    };

    if (!positions.some((p) => positionMatch(p, position))) {
      positions.push(position);
    }
  }

  return positions;
}

function positionMatch(objA, objB) {
  return objA.x === objB.x && objA.y === objB.y;
}

function randNum(boardSize) {
  return Math.trunc(Math.random() * boardSize);
}
