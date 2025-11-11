import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner, getWinningLine } from '../utils/gameLogic';
import '../styles/Game.css';

function Game() {
  // Req 5. Display the location for each move in the format (row, col) in the move history list
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

  // Req 4. When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw)
  const winningLine = calculateWinner(currentSquares) ? getWinningLine(currentSquares) : null;

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      const row = Math.floor((move - 1) / 3) + 1;
      const col = ((move - 1) % 3) + 1;
      // Req 1. For the current move only, show “You are at move #…” instead of a button
      description = `You are at move #${move} (${row}, ${col})`;
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
    <>
      <div className="game-title">Tic Tac Toe</div>
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
          {/* Req 3. Add a toggle button that lets you sort the moves in either ascending or descending order */}
          <button
            className="sort-button"
            onClick={() => setIsAscending(!isAscending)}
          >
            {isAscending ? 'Sort Descending' : 'Sort Ascending'}
          </button>
          <ol>{sortedMoves}</ol>
        </div>
      </div>
    </>
  );
}

export default Game;