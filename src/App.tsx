import { GameBoard } from "./components/GameBoard";
import "./styles.scss";

function App(): JSX.Element {
  return (
    <div className="app">
      <GameBoard />
    </div>
  );
}

export default App;
