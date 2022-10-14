import { Socket } from "socket.io-client";
import { Board } from "./types";

export function handleResetButton(
  setAllRows: React.Dispatch<React.SetStateAction<Board>>,
  setWinner: React.Dispatch<React.SetStateAction<"A" | "B" | null>>,
  setPlayer: React.Dispatch<React.SetStateAction<"A" | "B">>,
  socket: Socket | null
): void {
  setAllRows(generateEmptyBoard());
  setWinner(null);
  setPlayer("A");
  if (socket) {
    socket.emit("reset");
  }
}

export function generateEmptyBoard(): Board {
  return [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];
}
