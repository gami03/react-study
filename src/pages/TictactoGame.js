import { useState } from 'react';
import './game.css';

function Square({value, onSquareClick, highlight}) {
  return (
    <button className = {`square ${highlight ? 'highlight' : ''}`}
            onClick={onSquareClick}>
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
    onPlay(nextSquares, i);
  }
  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isDraw = !winner && squares.every(square => square !== null)

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!isDraw) {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  } else {
    status = '무승부!!';
  }
const boardsize = 3;
const boardRows = [];
for (let row = 0; row < boardsize; row++) {
  const squaresInRow = [];
  for (let col = 0; col < boardsize; col++) {
    const index = row * boardsize + col;
    squaresInRow.push(
      <Square 
        key={index} 
        value={squares[index]} 
        onSquareClick={() => handleClick(index)} 
        highlight={winningLine.includes(index)}
        />
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
    const [history, setHistory] = useState([{ squares: Array(9).fill(null), lastIndex: null }]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove].squares;
    const [isSorting, setIsSorting] = useState(true);


    function handlePlay(nextSquares, index) {
      const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, lastIndex: index }];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
      setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((step, move) => {
        let description;
        if (move > 0) {
            //description = 'Go to move #' + move;
            const col = (step.lastIndex % 3) + 1;
            const row = Math.floor(step.lastIndex / 3) + 1;
            description = `#${move}번째 순서에 있습니다. (${col}, ${row})`;
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
      <div className="game-center-wrapper">
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
      return { winner: squares[a], line: [a, b, c]};
    }
  }
  return null;
}
