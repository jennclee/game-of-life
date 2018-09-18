import React from 'react'

const Square = ({ id, squares, handleOnClick }) => {
  return (
    <div>
      <button id={id} className="square" onClick={handleOnClick}>
        {squares[id]}
      </button>
    </div>
  )
}

export default Square
