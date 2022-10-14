import { findFour } from "./connectedFour";
import { Row } from "./types";

test("fourInRow", () => {
  const fullRow: Row = ["A", "A", "A", "A", "A", "A", "A"];
  const emptyRow: Row = [null, null, null, null, null, null, null];
  const closeRowWin: Row = ["A", "B", "B", "B", "B", null, "A"];
  expect(findFour(fullRow)).toBe(true);
  expect(findFour(emptyRow)).toBe(false);
  expect(findFour(closeRowWin)).toBe(true);
});
