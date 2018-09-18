import React from 'react'

const Square = ({ colIndex, rowIndex, squares, handleOnClick }) => {
  return (
    <div>
      <button colIndex={colIndex} rowIndex={rowIndex} className="square" onClick={handleOnClick}>
        {squares[rowIndex][colIndex]}
      </button>
    </div>
  )
}

export default Square
