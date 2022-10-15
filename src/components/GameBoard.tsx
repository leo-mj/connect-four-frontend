import { handleResetButton } from "../utils/handleResetButton";
import { MainStates } from "../utils/types";
import { Cell } from "./Cell";

interface IPropsGameBoard {
  mainStates: MainStates;
}

export function GameBoard({ mainStates }: IPropsGameBoard): JSX.Element {
  const { player, setPlayer, winner, setWinner, allRows, setAllRows, socket } =
    mainStates;

  return (
    <div className="board">
      <div className="board-header">
        {!winner && <p>Player {player}'s turn</p>}
        {winner && <p>🎉 Player {winner} is the Winner! 🎉 </p>}
        <button
          onClick={() => {
            handleResetButton(setAllRows, setWinner, setPlayer, socket);
          }}
        >
          Reset
        </button>
      </div>
      {allRows.map((row, i) => (
        <div className="row" key={i}>
          {row.map((cell, j) => (
            <div key={j}>
              <Cell mainStates={mainStates} cellValue={cell} col={j} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
