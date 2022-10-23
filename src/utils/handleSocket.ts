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
    setOnlinePlayers,
    setChosenOpponent,
    setGameMode,
    setBusyPlayers,
  } = mainStates;

  // set up socket
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

  // update online and busy player lists
  newSocket.on(
    "players online updated",
    (playersOnline: OnlinePlayer[], playersBusy: OnlinePlayer[]) => {
      setOnlinePlayers(playersOnline);
      setBusyPlayers(playersBusy);
    }
  );

  // initiate and leave 1v1 game
  newSocket.on("challenged", (challenger: OnlinePlayer) => {
    const challengeAccepted = window.confirm(
      `${challenger.username} is challenging you to a game. Do you accept?`
    );
    if (challengeAccepted) {
      newSocket.emit("challenge accepted", challenger.id);
      setChosenOpponent(challenger);
      setGameMode("multiplayer");
    } else {
      newSocket.emit("challenge declined", challenger.id);
    }
  });

  newSocket.on("your challenge accepted", (yourOpponent: OnlinePlayer) => {
    setChosenOpponent(yourOpponent);
    setGameMode("multiplayer");
  });

  newSocket.on("your challenge declined", (yourOpponent: OnlinePlayer) => {
    alert(yourOpponent.username + " has declined your challenge");
  });

  newSocket.on("player busy", (busyPlayer: OnlinePlayer) => {
    window.alert(busyPlayer.username + " is in another game");
  });

  newSocket.on("opponent left game", (opponentName: string) => {
    alert(opponentName + " has left the game");
    setGameMode("find-opponent");
  });

  // play 1v1 game
  newSocket.on(
    "cell clicked by",
    (changedBoard: Board, otherPlayer: "A" | "B") => {
      setAllRows(changedBoard);
      setPlayer(otherPlayer === "A" ? "B" : "A");
      setMyTurn(true);
    }
  );

  newSocket.on("game won by", (winner: "A" | "B") => setWinner(winner));

  newSocket.on("reset", () => handleResetButton(mainStates));

  return cleanupSocketIO;
}

export function cleanupSocketIO(socket: Socket): void {
  console.log("disconnecting from socket.io server, deregistering listeners");
  socket.removeAllListeners();
  socket.disconnect();
}
