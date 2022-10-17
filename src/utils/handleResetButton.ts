import { Board, MainStates } from "./types";

export function handleResetButton({
  setAllRows,
  setWinner,
  setPlayer,
  setMyTurn,
  socket,
}: MainStates): void {
  setAllRows(generateEmptyBoard());
  setWinner(null);
  setPlayer("A");
  setMyTurn(true);
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
