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
        online
        <div className="players">
          {onlinePlayers
            .filter(
              (onlinePlayer) =>
                !busyPlayers.some(
                  (busyPlayer) => busyPlayer.id === onlinePlayer.id
                )
            )
            .map((onlinePlayer, i) => (
              <button
                className="B"
                key={i}
                onClick={() => handleOpponentChoice(onlinePlayer)}
                disabled={!isOnline}
                style={{
                  backgroundColor:
                    socket.id === onlinePlayer.id ? "#8eecf5" : "#06d6a0",
                }}
              >
                {onlinePlayer.username}
              </button>
            ))}
        </div>
      </div>
      <div className="player-group">
        busy
        <div className="players">
          {busyPlayers.map((busyPlayer, i) => (
            <button
              className="A"
              key={i}
              onClick={() => handleOpponentChoice(busyPlayer)}
              style={{
                backgroundColor:
                  socket.id === busyPlayer.id ? "#8eecf5" : "#ef476f",
              }}
            >
              {busyPlayer.username}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
