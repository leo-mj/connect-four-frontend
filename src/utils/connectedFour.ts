import {
  getCol,
  getNorthEastDiagonal,
  getNorthWestDiagonal,
} from "./getColAndDiagonal";
import { Board, Col, Diagonal, Row } from "./types";

export function connectedFour(
  allRows: Board,
  col: number,
  row: number
): boolean {
  const cellRow: Row = allRows[row];
  if (findFour(cellRow)) {
    return true;
  }

  const cellCol: Col = getCol(allRows, col);
  if (findFour(cellCol)) {
    return true;
  }

  const diagonalNE: Diagonal = getNorthEastDiagonal(allRows, col, row);
  if (findFour(diagonalNE)) {
    return true;
  }

  const diagonalNW: Diagonal = getNorthWestDiagonal(allRows, col, row);
  if (findFour(diagonalNW)) {
    return true;
  }

  return false;
}

export function findFour(cells: Row | Col): boolean {
  let cellQueue: Row = [];
  for (const cell of cells) {
    const firstInQueue = cellQueue[0];
    if (cell !== firstInQueue) {
      cellQueue = [];
    }
    if (cell === "A" || cell === "B") {
      cellQueue.push(cell);
    }
    if (cellQueue.length === 4) {
      return true;
    }
  }
  return false;
}
