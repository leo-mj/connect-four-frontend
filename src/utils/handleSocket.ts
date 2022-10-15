import { io, Socket } from "socket.io-client";
import { handleResetButton } from "./handleResetButton";
import { socketURL } from "./socketURL";
import { Board } from "./types";

interface SocketParams {
  setPlayer: React.Dispatch<React.SetStateAction<"A" | "B">>;
  setMyTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setWinner: React.Dispatch<React.SetStateAction<"A" | "B" | null>>;
  setAllRows: React.Dispatch<React.SetStateAction<Board>>;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

export function handleSocket({
  setAllRows,
  setMyTurn,
  setPlayer,
  setWinner,
  setSocket,
}: SocketParams): (socket: Socket) => void {
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

  return cleanupSocketIO;
}

export function cleanupSocketIO(socket: Socket): void {
  console.log("disconnecting from socket.io server, deregistering listeners");
  socket.removeAllListeners();
  socket.disconnect();
}
