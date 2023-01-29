export const tileStatuses = {
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

export function markTile(tile) {
  if (tile.status !== tileStatuses.HIDDEN && tile.status !== tileStatuses.MARKED) {
    return;
  }

  if (tile.status === tileStatuses.HIDDEN) {
    tile.status = tileStatuses.MARKED;
  } else {
    tile.status = tileStatuses.HIDDEN;
  }
}

export function revealTile(tile, board) {
  if (tile.status !== tileStatuses.HIDDEN) {
    return;
  }

  if (tile.mine) {
    tile.status = tileStatuses.MINE;
    return;
  }

  tile.status = tileStatuses.NUMBER;

  const adjacentTiles = findNearbyTiles(tile, board);
  const mines = adjacentTiles.filter((tile) => tile.mine);

  if (mines.length === 0) {
    adjacentTiles.forEach((tile) => revealTile(tile, board));
  } else {
    tile.el.textContent = mines.length;
  }
}

export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === tileStatuses.NUMBER ||
        (tile.mine && tile.status === tileStatuses.HIDDEN) ||
        tile.status === tileStatuses.MARKED
      );
    });
  });
}

export function checkLose(board) {
  return board.some((row) => {
    return row.some((tile) => tile.status === tileStatuses.MINE);
  });
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

function findNearbyTiles(tile, board) {
  const nearbyTiles = [];

  for (let xOffset = -1; xOffset <= 1; xOffset += 1) {
    for (let yOffset = -1; yOffset <= 1; yOffset += 1) {
      const nearbyTile = board[tile.x + xOffset]?.[tile.y + yOffset];

      if (nearbyTile) {
        nearbyTiles.push(nearbyTile);
      }
    }
  }

  return nearbyTiles;
}
