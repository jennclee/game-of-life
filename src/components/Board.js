import React from 'react'
import Square from './Square'

const Board = ({ colArray, rowArray, squares, handleOnClick }) => {
  return (
    <div>
      {rowArray.map((row, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {colArray.map((col, colIndex) => (
              <Square colIndex={colIndex} rowIndex={rowIndex} squares={squares} handleOnClick={handleOnClick} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default Board
