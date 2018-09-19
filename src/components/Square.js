import React from 'react'

const Square = ({ colIndex, rowIndex, squares, handleSquareToggle }) => {
  return (
    <div>
      <button colIndex={colIndex} rowIndex={rowIndex} className="square" onClick={handleSquareToggle}>
        {squares[rowIndex][colIndex]}
      </button>
    </div>
  )
}

export default Square
