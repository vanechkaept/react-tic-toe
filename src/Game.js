import { useState } from "react";
import Board from "./Board";
import { O_VALUE, X_VALUE } from "./constants";

export default function Game() {
  const startFields = Array(9).fill(null);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentSquares, setSquares] = useState([...startFields]);
  const [history, setHistory] = useState([
    { xIsNext: xIsNext, value: [...startFields] },
  ]);

  const historyMove = history
    .map((h, index) => {
      const description =
        index === 0 ? "Go to start game" : "Go to move " + index;
      return (
        <li>
          <button onClick={() => moveInHistory(index)}>{description}</button>
        </li>
      );
    })
    .slice(0, -1);

  function moveInHistory(step) {
    const nextSquares = history[step].value;
    setSquares(nextSquares);
    const nextHistory = [...history.slice(0, step + 1)];
    setHistory(nextHistory);
    setXIsNext(nextHistory.slice(-1)[0].xIsNext);
  }

  function restartGame(startFrom = X_VALUE) {
    const xIsNext = startFrom === X_VALUE;
    setXIsNext(xIsNext);
    setHistory([{ xIsNext, value: [...startFields] }]);
    setSquares([...startFields]);
  }

  function handleSquareClick(nSquares) {
    const nextSquares = nSquares.slice();

    setXIsNext(!xIsNext);
    setSquares(nextSquares);

    setHistory((prevHistory) => [
      ...prevHistory,
      { xIsNext: !xIsNext, value: nextSquares },
    ]);
  }

  return (
    <>
      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        history={history}
        onPlay={handleSquareClick}
      />
      <div className="status">
        <pre>{JSON.stringify(history)}</pre>
      </div>
      <div className="status">{historyMove}</div>
      <div className="status">
        <button onClick={() => restartGame(O_VALUE)}>START FROM O</button>
        <button onClick={() => restartGame(X_VALUE)}>START FROM X</button>
      </div>
    </>
  );
}
