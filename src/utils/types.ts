import { Socket } from "socket.io-client";

export type Board = (null | "A" | "B")[][];
export type Row = (null | "A" | "B")[];
export type Col = (null | "A" | "B")[];
export type Diagonal = (null | "A" | "B")[];
export type CellValue = null | "A" | "B";

export interface OnlinePlayer {
  username: string;
  id: string;
}

export interface MainStates {
  player: "A" | "B";
  setPlayer: React.Dispatch<React.SetStateAction<"A" | "B">>;
  myTurn: boolean;
  setMyTurn: React.Dispatch<React.SetStateAction<boolean>>;
  winner: null | "A" | "B";
  setWinner: React.Dispatch<React.SetStateAction<"A" | "B" | null>>;
  allRows: Board;
  setAllRows: React.Dispatch<React.SetStateAction<Board>>;
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  gameMode: "multiplayer" | "find-opponent" | "one-screen";
  setGameMode: React.Dispatch<
    React.SetStateAction<"multiplayer" | "find-opponent" | "one-screen">
  >;
  onlinePlayers: OnlinePlayer[];
  setOnlinePlayers: React.Dispatch<React.SetStateAction<OnlinePlayer[]>>;
  busyPlayers: OnlinePlayer[];
  setBusyPlayers: React.Dispatch<React.SetStateAction<OnlinePlayer[]>>;
  chosenOpponent: OnlinePlayer | null;
  setChosenOpponent: React.Dispatch<React.SetStateAction<OnlinePlayer | null>>;
}
