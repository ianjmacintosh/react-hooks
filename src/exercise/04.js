// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, handleMove}) {
  let nextValue = calculateNextValue(squares)
  let winner = calculateWinner(squares)
  let status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square]) {
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue

    handleMove(squaresCopy)
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function History({boards}) {
  return (
    <ol>
      {boards.map((board, i) => (
        <li key={JSON.stringify(boards[i])}>
          <button>Go to move #{i}</button>
        </li>
      ))}
    </ol>
  )
}

function Game() {
  const EMPTY_BOARD = Array(9).fill(null)
  const [boards, setBoards] = useLocalStorageState('boards', [EMPTY_BOARD])
  const squares = boards[boards.length - 1]

  function restart() {
    let boardsCopy = [EMPTY_BOARD]
    setBoards(boardsCopy)
  }

  function handleMove(newBoard) {
    let boardsCopy = [...boards]
    boardsCopy.push(newBoard)

    setBoards(boardsCopy)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} handleMove={handleMove} />
        <History boards={boards}></History>
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  // ijm: This is odd. tbh, I don't understand what "squares.filter(Boolean)" would return.
  // The idea of passing Boolean instead of a function to a filter is very mysterious to me
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
