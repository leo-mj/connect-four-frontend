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
    if (!row.includes("A" || "B")) {
      return false;
    }
    const checkRow = [...row];
    let cellStack: Row = [];
    while (checkRow.length > 0) {
      const currentCell = checkRow.shift();
      console.log(currentCell);
      const topOfStack = checkRow[checkRow.length - 1];
      if (currentCell && currentCell !== topOfStack) {
        cellStack = [];
        cellStack.push(currentCell);
      } else if (currentCell && currentCell === topOfStack) {
        cellStack.push(currentCell);
      }

      if (cellStack.length === 4) {
        return true;
      }
    }
  }
  return false;
}
