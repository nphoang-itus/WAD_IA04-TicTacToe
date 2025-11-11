import React from 'react';
import Square from './Square';
import { calculateWinner } from '../utils/gameLogic';

function Board({ xIsNext, squares, onPlay, winningLine }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    onPlay(nextSquares);
  }

  // When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw)
  const winner = calculatesWinner(squares);
  let status;
  let statusClass = '';
  if (winner) {
    status = 'Winner: ' + winner;
    statusClass = 'status-win';
  } else if (squares.every(square => square !== null)) {
    status = 'Draw!';
    statusClass = 'status-draw';
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    statusClass = '';
  }

  // Req 2. Rewrite the Board to use two loops to make the squares instead of hardcoding them
  const boardRows = [];
  for (let row = 0; row < 3; ++row) {
    const squaresInRow = [];
    for (let col = 0; col < 3; ++col) {
      const index = row * 3 + col;
      const isWinningSquare = winningLine && winningLine.includes(index);
      squaresInRow.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isWinningSquare={isWinningSquare}
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
      <div className={`status ${statusClass}`}>{status}</div>
      {boardRows}
    </>
  )

  // return (
  //   <>
  //     <div className='status'>{status}</div>
  //     <div className="board-row">
  //       <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
  //       <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
  //       <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
  //     </div>
  //     <div className="board-row">
  //       <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
  //       <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
  //       <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
  //     </div>
  //     <div className="board-row">
  //       <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
  //       <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
  //       <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
  //     </div>
  //   </>
  // );
}

export default Board;