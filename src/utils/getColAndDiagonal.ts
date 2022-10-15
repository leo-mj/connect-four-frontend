import { Board, Col, Diagonal } from "./types";

export function getCol(allRows: Board, col: number): Col {
  const cellCol: Col = [];
  for (const cellRow of allRows) {
    const colInRow = cellRow[col];
    cellCol.push(colInRow);
  }
  return cellCol;
}

export function getNorthEastDiagonal(
  allRows: Board,
  col: number,
  row: number
): Diagonal {
  const diagonalNE: Diagonal = [];
  const startingRow = row - col >= 0 ? row - col : 0;
  const startingCol = col - row >= 0 ? col - row : 0;
  for (
    let currentRow = startingRow, currentCol = startingCol;
    currentRow < 6 && currentCol < 7;
    currentRow++, currentCol++
  ) {
    const currentCell = allRows[currentRow][currentCol];
    diagonalNE.push(currentCell);
  }
  return diagonalNE;
}

export function getNorthWestDiagonal(
  allRows: Board,
  col: number,
  row: number
): Diagonal {
  const diagonalNW: Diagonal = [];
  const startingRow = row - (6 - col) >= 0 ? row - (6 - col) : 0;
  const startingCol = col + row <= 6 ? col + row : 6;
  for (
    let currentRow = startingRow, currentCol = startingCol;
    currentRow < 6 && currentCol >= 0;
    currentRow++, currentCol--
  ) {
    const currentCell = allRows[currentRow][currentCol];
    diagonalNW.push(currentCell);
  }
  return diagonalNW;
}
