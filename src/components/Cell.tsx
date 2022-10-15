import { handleCellClick } from "../utils/handleCellClick";
import { MainStates } from "../utils/types";

interface IPropsCell {
  mainStates: MainStates;
  cellValue: null | "A" | "B";
  col: number;
}

export function Cell({ mainStates, cellValue, col }: IPropsCell): JSX.Element {
  const {
    player,
    setPlayer,
    myTurn,
    setMyTurn,
    winner,
    setWinner,
    allRows,
    setAllRows,
    socket,
  } = mainStates;

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
