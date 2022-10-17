import { useState } from "react";
import { Socket } from "socket.io-client";
import { OnlinePlayer } from "../utils/types";

interface IPropsFindOpponent {
  availablePlayers: OnlinePlayer[];
  setAvailablePlayers: React.Dispatch<React.SetStateAction<OnlinePlayer[]>>;
  setChosenOpponent: React.Dispatch<React.SetStateAction<OnlinePlayer | null>>;
  socket: Socket;
  gameMode: "multiplayer" | "find-opponent" | "one-screen";
  setGameMode: React.Dispatch<
    React.SetStateAction<"multiplayer" | "find-opponent" | "one-screen">
  >;
}

export function FindOpponent({
  availablePlayers,
  setAvailablePlayers,
  setChosenOpponent,
  socket,
  gameMode,
  setGameMode,
}: IPropsFindOpponent): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const submitUsername = () => {
    if (
      availablePlayers.some(
        (onlinePlayer) => onlinePlayer.username === username
      )
    ) {
      window.alert("That username is already taken");
    } else if (username !== "") {
      setIsOnline(true);
      socket.emit("new player online", username);
    }
  };

  const handleOpponentChoice = (onlinePlayer: OnlinePlayer) => {
    socket.emit("challenge", onlinePlayer.id, username);
  };

  return (
    <>
      {!isOnline && (
        <div className="username-choice">
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitUsername();
              }
            }}
          />
          <button onClick={submitUsername}>Submit</button>
        </div>
      )}
      {availablePlayers
        .filter((onlinePlayer) => onlinePlayer.id !== socket.id)
        .map((onlinePlayer, i) => (
          <button
            key={i}
            onClick={() => handleOpponentChoice(onlinePlayer)}
            disabled={!isOnline}
          >
            {onlinePlayer.username}
          </button>
        ))}
      {isOnline && "You are online"}
    </>
  );
}
