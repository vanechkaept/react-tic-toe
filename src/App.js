import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}

export default function Board() {
  const startFields = Array(9).fill(null);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState([...startFields]);
  // const [history, setHistory] = useState([[...startFields]]);
  const [history, setHistory] = useState([
    { xIsNext: true, value: [...startFields] },
  ]);

  let gameFinished = false;
  let status = "Next player: " + (xIsNext ? "X" : "O");

  function handleClick(i) {
    if (gameFinished) return;
    if (calculateWinner(squares)) return;
    if (squares[i]) return console.log("already has value");

    const nextSquares = squares.slice();

    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

    setXIsNext(!xIsNext);
    setSquares(nextSquares);

    const nextHistory = [...history, { xIsNext: !xIsNext, value: nextSquares }];
    setHistory(nextHistory);
  }

  function moveInHistory(step) {
    console.log("go to step", step);
    const nextSquares = history[step].value;
    setSquares(nextSquares);
    const nextHistory = [...history.slice(0, step + 1)];
    console.log("nextHistory", nextHistory);
    setHistory(nextHistory);
    setXIsNext(nextHistory.slice(-1)[0].xIsNext);
  }

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

  const winner = calculateWinner(squares);
  if (winner) {
    console.log("winner is ", winner);
    status = "Winner is " + winner;
    gameFinished = true;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  console.log("update");

  return (
    <>
      <div className="status">{status}</div>
      <div className="status">
        <pre>{JSON.stringify(history)}</pre>
      </div>
      <div className="status">{historyMove}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
