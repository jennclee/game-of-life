import React from 'react'
import Square from './Square'

const Board = ({ colArray, rowArray, squares, handleSquareToggle }) => {

  return (
    <div>
      {rowArray.map((row, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {colArray.map((col, colIndex) => (
              <Square key={colIndex} colIndex={colIndex} rowIndex={rowIndex} squares={squares} handleSquareToggle={handleSquareToggle} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Board
