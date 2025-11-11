import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner, getWinningLine } from '../utils/gameLogic';
import '../styles/Game.css';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = (currentMove % 2) === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const winnerInfo = calculateWinner(currentSquares);
  const winningLine = winnerInfo ? getWinningLine(currentSquares) : null;

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      const row = Math.floor((move - 1) / 3) + 1;
      const col = ((move - 1) % 3) + 1;
      description = `Go to move #${move} (${row}, ${col})`;
    } else {
      description = 'Go to game start';
    }

    if (move === currentMove) {
      return (
        <li key={move}>
          <span className='current-move'> Current move #{move} </span>
        </li>
      );
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          winningLine={winningLine}
        />
      </div>
      <div className="game-info">
        <button
          className="sort-button"
          onClick={() => setIsAscending(!isAscending)}
        >
          {isAscending ? 'Sort Descending' : 'Sort Ascending'}
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}

export default Game;