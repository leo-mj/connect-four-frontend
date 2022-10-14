import { handleCellClick } from "../utils/handleCellClick";
import { Board, CellValue } from "../utils/types";

interface IPropsCell {
  player: "A" | "B";
  setPlayer: React.Dispatch<React.SetStateAction<"A" | "B">>;
  winner: null | "A" | "B";
  setWinner: React.Dispatch<React.SetStateAction<"A" | "B" | null>>;
  cellValue: CellValue;
  allRows: Board;
  setAllRows: React.Dispatch<React.SetStateAction<Board>>;
  col: number;
}

export function Cell({
  player,
  setPlayer,
  winner,
  setWinner,
  cellValue,
  allRows,
  setAllRows,
  col,
}: IPropsCell): JSX.Element {
  return (
    <>
      {cellValue === null && (
        <div
          className="cell null"
          onClick={() =>
            handleCellClick(
              allRows,
              setAllRows,
              col,
              player,
              setPlayer,
              winner,
              setWinner
            )
          }
        ></div>
      )}
      {cellValue === "A" && (
        <div
          className="cell A"
          onClick={() =>
            handleCellClick(
              allRows,
              setAllRows,
              col,
              player,
              setPlayer,
              winner,
              setWinner
            )
          }
        ></div>
      )}
      {cellValue === "B" && (
        <div
          className="cell B"
          onClick={() =>
            handleCellClick(
              allRows,
              setAllRows,
              col,
              player,
              setPlayer,
              winner,
              setWinner
            )
          }
        ></div>
      )}
    </>
  );
}
