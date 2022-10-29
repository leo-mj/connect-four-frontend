import { MainStates, OnlinePlayer } from "../utils/types";

interface IPropsFindOpponent {
  mainStates: MainStates;
}

export function FindOpponent({ mainStates }: IPropsFindOpponent): JSX.Element {
  const {
    username,
    setUsername,
    isOnline,
    setIsOnline,
    onlinePlayers,
    busyPlayers,
    socket,
  } = mainStates;

  if (socket === null) {
    return <>Something has gone wrong</>;
  }

  const submitUsername = () => {
    if (
      onlinePlayers.some((onlinePlayer) => onlinePlayer.username === username)
    ) {
      window.alert("That username is already taken");
    } else if (username !== "" && socket) {
      setIsOnline(true);
      socket.emit("new player online", username);
    }
  };

  const handleOpponentChoice = (onlinePlayer: OnlinePlayer) => {
    if (socket) {
      socket.emit("challenge", onlinePlayer.id);
    }
  };

  return (
    <div className="find-opponent">
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
      <div className="player-group">
        Available Players
        <div className="players">
          {onlinePlayers
            .filter(
              (onlinePlayer) =>
                !busyPlayers.some(
                  (busyPlayer) => busyPlayer.id === onlinePlayer.id
                )
            )
            .map((onlinePlayer) => (
              <div className="players" key={onlinePlayer.id}>
                {onlinePlayer.id !== socket.id && (
                  <button
                    className="B"
                    onClick={() => handleOpponentChoice(onlinePlayer)}
                    disabled={!isOnline}
                  >
                    {onlinePlayer.username}
                  </button>
                )}
                {onlinePlayer.id === socket.id && (
                  <button
                    className="B"
                    onClick={() => handleOpponentChoice(onlinePlayer)}
                    disabled={!isOnline}
                    style={{
                      backgroundColor: "#8eecf5",
                    }}
                  >
                    You
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
