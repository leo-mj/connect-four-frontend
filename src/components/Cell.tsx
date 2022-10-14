import { Socket } from "socket.io-client";
import { handleCellClick } from "../utils/handleCellClick";
import { Board, CellValue } from "../utils/types";

interface IPropsCell {
  player: "A" | "B";
  setPlayer: React.Dispatch<React.SetStateAction<"A" | "B">>;
  myTurn: boolean;
  setMyTurn: React.Dispatch<React.SetStateAction<boolean>>;
  winner: null | "A" | "B";
  setWinner: React.Dispatch<React.SetStateAction<"A" | "B" | null>>;
  cellValue: CellValue;
  allRows: Board;
  setAllRows: React.Dispatch<React.SetStateAction<Board>>;
  col: number;
  socket: Socket | null;
}

export function Cell({
  player,
  setPlayer,
  myTurn,
  setMyTurn,
  winner,
  setWinner,
  cellValue,
  allRows,
  setAllRows,
  col,
  socket,
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
              myTurn,
              setMyTurn,
              winner,
              setWinner,
              socket
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
              myTurn,
              setMyTurn,
              winner,
              setWinner,
              socket
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
              myTurn,
              setMyTurn,
              winner,
              setWinner,
              socket
            )
          }
        ></div>
      )}
    </>
  );
}
