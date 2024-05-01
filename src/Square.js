import { memo } from "react";

const Square = memo(({ value, onSquareClick }) => (
  <button onClick={onSquareClick} className="square">
    {value}
  </button>
));

export default Square;
