import { Socket } from "socket.io-client";
import { connectedFour } from "./connectedFour";
import { Board, Row } from "./types";

export function handleCellClick(
  allRows: Board,
  setAllRows: React.Dispatch<React.SetStateAction<Board>>,
  col: number,
  player: "A" | "B",
  setPlayer: React.Dispatch<React.SetStateAction<"A" | "B">>,
  myTurn: boolean,
  setMyTurn: React.Dispatch<React.SetStateAction<boolean>>,
  winner: null | "A" | "B",
  setWinner: React.Dispatch<React.SetStateAction<"A" | "B" | null>>,
  socket: Socket | null
): void {
  const rowToFill = findLowestEmptyRowInCol(allRows, col);
  if (rowToFill === undefined || winner !== null || !myTurn) {
    return;
  }
  const changedBoard: Board = changeBoard(allRows, rowToFill, col, player);
  if (socket) {
    socket.emit("cell click", changedBoard, player);
  }
  if (connectedFour(changedBoard, col, rowToFill)) {
    socket !== null
      ? socket.emit("winner", player)
      : console.log("not connected to socket");
  }
  setMyTurn(false);
  setPlayer(player === "A" ? "B" : "A");
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
  const changedBoard: Board = JSON.parse(JSON.stringify(allRows));
  const rowToChange: Row = changedBoard[rowToFill];
  rowToChange.splice(col, 1, player);
  return changedBoard;
}
