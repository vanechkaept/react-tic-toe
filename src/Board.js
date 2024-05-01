import { memo, useCallback } from "react";
import Square from "./Square";
import { O_VALUE, X_VALUE } from "./constants";

const Board = memo(({ xIsNext, squares, onPlay }) => {
  const calculateWinner = useCallback((squares) => {
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

    return lines.some((line) => {
      const [a, b, c] = line;
      return (
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      );
    });
  }, []);

  let status = "Next player: " + (xIsNext ? X_VALUE : O_VALUE);
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + (!xIsNext ? X_VALUE : O_VALUE);
  }

  function handleSquareClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? X_VALUE : O_VALUE;
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
});

export default Board;
