import { useState } from "react";
import { Socket } from "socket.io-client";
import { FindOpponent } from "./components/FindOpponent";
import { GameBoard } from "./components/GameBoard";
import "./styles.scss";
import {
  generateEmptyBoard,
  handleResetButton,
} from "./utils/handleResetButton";
import { cleanupSocketIO, handleSocket } from "./utils/handleSocket";
import { Board, MainStates, OnlinePlayer } from "./utils/types";

function App(): JSX.Element {
  const [gameMode, setGameMode] = useState<
    "multiplayer" | "find-opponent" | "one-screen"
  >("one-screen");

  const [allRows, setAllRows] = useState<Board>(generateEmptyBoard());
  const [player, setPlayer] = useState<"A" | "B">("A");
  const [winner, setWinner] = useState<null | "A" | "B">(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [username, setUsername] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [onlinePlayers, setOnlinePlayers] = useState<OnlinePlayer[]>([]);
  const [busyPlayers, setBusyPlayers] = useState<OnlinePlayer[]>([]);
  const [chosenOpponent, setChosenOpponent] = useState<OnlinePlayer | null>(
    null
  );
  const [myTurn, setMyTurn] = useState<boolean>(true);

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
    gameMode: gameMode,
    setGameMode: setGameMode,
    onlinePlayers: onlinePlayers,
    username: username,
    setUsername: setUsername,
    setOnlinePlayers: setOnlinePlayers,
    busyPlayers: busyPlayers,
    setBusyPlayers: setBusyPlayers,
    isOnline: isOnline,
    setIsOnline: setIsOnline,
    chosenOpponent: chosenOpponent,
    setChosenOpponent: setChosenOpponent,
  };

  const handleOneScreenButton = () => {
    setGameMode("one-screen");
    if (socket) {
      cleanupSocketIO(socket, mainStates);
    }
    setSocket(null);
    handleResetButton(mainStates);

    setMyTurn(true);
  };

  const handleMultiPlayerButton = () => {
    setGameMode("find-opponent");
    handleSocket(mainStates);
    handleResetButton(mainStates);
  };

  const handleLeaveGameButton = () => {
    if (socket && chosenOpponent !== null) {
      socket.emit("left game", chosenOpponent);
    }
    setGameMode("find-opponent");
  };

  return (
    <div className="app">
      <div className="game-mode-buttons">
        {gameMode === "find-opponent" && (
          <button onClick={handleOneScreenButton}>Play on one screen</button>
        )}
        {gameMode === "one-screen" && (
          <button onClick={handleMultiPlayerButton}>Play online</button>
        )}
        {gameMode === "multiplayer" && (
          <button onClick={handleLeaveGameButton}>Leave game</button>
        )}
      </div>
      {gameMode === "find-opponent" && socket && (
        <FindOpponent mainStates={mainStates} />
      )}
      {gameMode !== "find-opponent" && <GameBoard mainStates={mainStates} />}
    </div>
  );
}

export default App;
