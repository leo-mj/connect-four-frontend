import { Board } from "./types";

export function handleResetButton(
  setAllRows: React.Dispatch<React.SetStateAction<Board>>,
  setWinner: React.Dispatch<React.SetStateAction<"A" | "B" | null>>,
  setPlayer: React.Dispatch<React.SetStateAction<"A" | "B">>
): void {
  setAllRows(generateEmptyBoard());
  setWinner(null);
  setPlayer("A");
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
