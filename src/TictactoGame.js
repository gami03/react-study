import { useState } from 'react';
import './game.css';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
const boardsize = 3;
const boardRows = [];
for (let row = 0; row < boardsize; row++) {
  const squaresInRow = [];
  for (let col = 0; col < boardsize; col++) {
    const index = row * boardsize + col;
    squaresInRow.push(
      <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
    );
  }
  boardRows.push(
    <div key={row} className="board-row">
      {squaresInRow}
    </div>
  );
}

return (
  <>
    <div className="status">{status}</div>
    {boardRows}
  </>
);

}

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const [isSorting, setIsSorting] = useState(true);


    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
      setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            //description = 'Go to move #' + move;
            description = '#' + move + "번째 순서에 있습니다.";
        }
        else {
            description = 'Go to game start';
        }
        return (
        <li key={move}>
          {move > 0 ? (
            description
          ) : ( <button onClick={() => jumpTo(move)}>{description}</button>)}
        </li>
        );
    });

    if(!isSorting) {
      moves.reverse();
    }
    
    return(
        <div className='game'>
            <div className='game-board'>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className='game-info'>
              <button onClick={() => setIsSorting(!isSorting)}>
                {isSorting ? '내림차순 정렬' : '오름차순 정렬'}
              </button>
                <ol>{moves}</ol>
            </div>
        </div>
    )
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
