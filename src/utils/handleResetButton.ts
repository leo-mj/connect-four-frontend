import { Board } from "./types";

export function handleResetButton(
  setAllRows: React.Dispatch<React.SetStateAction<Board>>
): void {
  setAllRows([
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);
}
