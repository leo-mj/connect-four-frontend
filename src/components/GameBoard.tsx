import { useEffect, useState } from "react";
import {
  handleResetButton,
  generateEmptyBoard,
} from "../utils/handleResetButton";
import { Board } from "../utils/types";
import { Cell } from "./Cell";
import { io, Socket } from "socket.io-client";
import { socketURL } from "../utils/socketURL";

export function GameBoard(): JSX.Element {
  const [allRows, setAllRows] = useState<Board>(generateEmptyBoard());
  const [player, setPlayer] = useState<"A" | "B">("A");
  const [myTurn, setMyTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<null | "A" | "B">(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("connecting to socket.io server");
    const newSocket: Socket = io(socketURL);
    setSocket(newSocket);
    console.log("connected to socket.io server");

    newSocket.prependAnyOutgoing((...args) => {
      console.log("sending to socket.io server: ", args);
    });
    newSocket.prependAny((...args) => {
      console.log("coming from socket.io server: ", args);
    });

    newSocket.on("connect", () => console.log("fully connected"));
    newSocket.on("reset", () =>
      handleResetButton(setAllRows, setWinner, setPlayer, null)
    );
    newSocket.on(
      "cell clicked by",
      (changedBoard: Board, otherPlayer: "A" | "B") => {
        setAllRows(changedBoard);
        setPlayer(otherPlayer === "A" ? "B" : "A");
      }
    );
    newSocket.on("next player", () => setMyTurn(true));
    newSocket.on("game won by", (winner: "A" | "B") => setWinner(winner));

    function cleanupSocketIO() {
      console.log(
        "disconnecting from socket.io server, deregistering listeners"
      );
      newSocket.removeAllListeners();
      newSocket.disconnect();
    }
    return cleanupSocketIO;
  }, []);

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
              <Cell
                player={player}
                setPlayer={setPlayer}
                myTurn={myTurn}
                setMyTurn={setMyTurn}
                winner={winner}
                setWinner={setWinner}
                cellValue={cell}
                allRows={allRows}
                setAllRows={setAllRows}
                col={j}
                socket={socket}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
