import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { GameBoard } from "./components/GameBoard";
import "./styles.scss";
import {
  generateEmptyBoard,
  handleResetButton,
} from "./utils/handleResetButton";
import { cleanupSocketIO, handleSocket } from "./utils/handleSocket";
import { Board, MainStates } from "./utils/types";

function App(): JSX.Element {
  const [gameMode, setGameMode] = useState<"multiplayer" | "one-screen">(
    "multiplayer"
  );
  const [allRows, setAllRows] = useState<Board>(generateEmptyBoard());
  const [player, setPlayer] = useState<"A" | "B">("A");
  const [myTurn, setMyTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<null | "A" | "B">(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  const mainStates: MainStates = {
    player: player,
    setPlayer: setPlayer,
    myTurn: myTurn,
    setMyTurn: setMyTurn,
    winner: winner,
    setWinner: setWinner,
    allRows: allRows,
    setAllRows: setAllRows,
    socket: socket,
    setSocket: setSocket,
  };

  useEffect(() => {
    handleSocket({ setAllRows, setMyTurn, setPlayer, setWinner, setSocket });
  }, []);

  const handleOneScreenButton = () => {
    setGameMode("one-screen");
    if (socket) {
      cleanupSocketIO(socket);
    }
    setSocket(null);
    handleResetButton(setAllRows, setWinner, setPlayer, socket);
    setMyTurn(true);
  };

  const handleMultiPlayerButton = () => {
    setGameMode("multiplayer");
    handleSocket({ setAllRows, setMyTurn, setPlayer, setWinner, setSocket });
    handleResetButton(setAllRows, setWinner, setPlayer, socket);
  };

  return (
    <div className="app">
      <div className="game-mode-buttons">
        {gameMode === "multiplayer" && (
          <button onClick={handleOneScreenButton}>Play on one screen</button>
        )}
        {gameMode === "one-screen" && (
          <button onClick={handleMultiPlayerButton}>Play online</button>
        )}
      </div>
      <GameBoard mainStates={mainStates} />
    </div>
  );
}

export default App;
