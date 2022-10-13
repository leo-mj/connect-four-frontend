import { changeCellValue } from "../utils/changeCellValue";
import { connectedFour } from "../utils/connectedFour";
import { aColor, bColor, Board, CellValue, white } from "../utils/types";

interface IPropsCell {
  player: "A" | "B";
  setPlayer: React.Dispatch<React.SetStateAction<"A" | "B">>;
  setWinner: React.Dispatch<React.SetStateAction<"A" | "B" | null>>;
  cellValue: CellValue;
  allRows: Board;
  setAllRows: React.Dispatch<React.SetStateAction<Board>>;
  col: number;
}

export function Cell({
  player,
  setPlayer,
  setWinner,
  cellValue,
  allRows,
  setAllRows,
  col,
}: IPropsCell): JSX.Element {
  const handleCellClick = () => {
    changeCellValue(allRows, setAllRows, col, player);
    if (connectedFour(allRows)) {
      setWinner(player);
    }
    setPlayer(player === "A" ? "B" : "A");
  };

  return (
    <>
      {cellValue === null && (
        <div
          className="cell"
          onClick={handleCellClick}
          style={{ backgroundColor: white }}
        ></div>
      )}
      {cellValue === "A" && (
        <div
          className="cell"
          onClick={handleCellClick}
          style={{ backgroundColor: aColor }}
        ></div>
      )}
      {cellValue === "B" && (
        <div
          className="cell"
          onClick={handleCellClick}
          style={{ backgroundColor: bColor }}
        ></div>
      )}
    </>
  );
}
