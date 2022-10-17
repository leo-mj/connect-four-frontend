import { io, Socket } from "socket.io-client";
import { handleResetButton } from "./handleResetButton";
import { socketURL } from "./socketURL";
import { Board, MainStates, OnlinePlayer } from "./types";

export function handleSocket(mainStates: MainStates): (socket: Socket) => void {
  const {
    setAllRows,
    setMyTurn,
    setPlayer,
    setWinner,
    setSocket,
    availablePlayers,
    setAvailablePlayers,
    setChosenOpponent,
    setGameMode,
  } = mainStates;

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

  newSocket.on("players online updated", (playersOnline: OnlinePlayer[]) =>
    setAvailablePlayers(playersOnline)
  );

  newSocket.on("challenged", (challenger: OnlinePlayer) => {
    const challengeAccepted = window.confirm(
      `${challenger.username} is challenging you to a game. Do you accept?`
    );
    if (challengeAccepted) {
      newSocket.emit("challenge accepted", challenger.id);
      setChosenOpponent(challenger);
      setGameMode("multiplayer");
    } else {
      newSocket.emit("challenge rejected");
    }
  });

  newSocket.on("your challenge accepted", (opponentId: string) => {
    const yourOpponent: OnlinePlayer = availablePlayers.filter(
      (onlinePlayer) => onlinePlayer.id === opponentId
    )[0];
    setChosenOpponent(yourOpponent);
    setGameMode("multiplayer");
  });

  newSocket.on("reset", () => handleResetButton(mainStates));

  newSocket.on(
    "cell clicked by",
    (changedBoard: Board, otherPlayer: "A" | "B") => {
      setAllRows(changedBoard);
      setPlayer(otherPlayer === "A" ? "B" : "A");
      setMyTurn(true);
    }
  );

  newSocket.on("game won by", (winner: "A" | "B") => setWinner(winner));

  return cleanupSocketIO;
}

export function cleanupSocketIO(socket: Socket): void {
  console.log("disconnecting from socket.io server, deregistering listeners");
  socket.removeAllListeners();
  socket.disconnect();
}
