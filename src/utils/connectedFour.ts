import { Board, Row } from "./types";

export function connectedFour(allRows: Board): boolean {
  console.log(fourInRow(allRows));
  if (fourInRow(allRows)) {
    return true;
  }
  // if (fourInCol(allRows)) {
  //     return true;
  // }
  // if (fourInDiagonal(allRows)) {
  //     return true;
  // }
  return false;
}

function fourInRow(allRows: Board) {
  for (const row of allRows) {
    let cellQueue: Row = [];
    for (const cell of row) {
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
  }
  return false;
}
