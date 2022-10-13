import { Board, Row } from "./types";

export function changeCellValue(
  allRows: Board,
  setAllRows: React.Dispatch<React.SetStateAction<Board>>,
  col: number,
  player: "A" | "B"
): void {
  const rowToFill: number | undefined = findLowestEmptyRowInCol(allRows, col);
  if (rowToFill === undefined) {
    return;
  }

  const changedBoard: Board = changeBoard(allRows, rowToFill, col, player);
  setAllRows(changedBoard);
  return;
}

function findLowestEmptyRowInCol(
  allRows: Board,
  col: number
): number | undefined {
  for (let currentRow = 0; currentRow < 6; currentRow++) {
    const rowToCheck = allRows[currentRow];
    const cellToCheck = rowToCheck[col];
    if (cellToCheck === null) {
      return currentRow;
    }
  }
  return undefined;
}

function changeBoard(
  allRows: Board,
  rowToFill: number,
  col: number,
  player: "A" | "B"
): Board {
  const changedBoard: Board = [...allRows];
  const rowToChange: Row = changedBoard[rowToFill];
  rowToChange.splice(col, 1, player);
  return changedBoard;
}
