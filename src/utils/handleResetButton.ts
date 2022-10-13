import { Board } from "./types";

export function handleResetButton(
  setAllRows: React.Dispatch<React.SetStateAction<Board>>,
  setWinner: React.Dispatch<React.SetStateAction<"A" | "B" | null>>,
  setPlayer: React.Dispatch<React.SetStateAction<"A" | "B">>
): void {
  setAllRows([
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);
  setWinner(null);
  setPlayer("A");
}
