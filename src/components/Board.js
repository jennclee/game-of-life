import React from 'react'
import Square from './Square'

const Board = ({ squares, handleOnClick }) => {
  return (
    <div>
      <div className="board-row">
        <Square id="0" squares={squares} handleOnClick={handleOnClick} />
        <Square id="1" squares={squares} handleOnClick={handleOnClick} />
        <Square id="2" squares={squares} handleOnClick={handleOnClick} />
        <Square id="3" squares={squares} handleOnClick={handleOnClick} />
        <Square id="4" squares={squares} handleOnClick={handleOnClick} />
        <Square id="5" squares={squares} handleOnClick={handleOnClick} />
      </div>
      <div className="board-row">
        <Square id="6" squares={squares} handleOnClick={handleOnClick} />
        <Square id="7" squares={squares} handleOnClick={handleOnClick} />
        <Square id="8" squares={squares} handleOnClick={handleOnClick} />
        <Square id="9" squares={squares} handleOnClick={handleOnClick} />
        <Square id="10" squares={squares} handleOnClick={handleOnClick} />
        <Square id="11" squares={squares} handleOnClick={handleOnClick} />
      </div>
      <div className="board-row">
        <Square id="12" squares={squares} handleOnClick={handleOnClick} />
        <Square id="13" squares={squares} handleOnClick={handleOnClick} />
        <Square id="14" squares={squares} handleOnClick={handleOnClick} />
        <Square id="15" squares={squares} handleOnClick={handleOnClick} />
        <Square id="16" squares={squares} handleOnClick={handleOnClick} />
        <Square id="17" squares={squares} handleOnClick={handleOnClick} />
      </div>
      <div className="board-row">
        <Square id="18" squares={squares} handleOnClick={handleOnClick} />
        <Square id="19" squares={squares} handleOnClick={handleOnClick} />
        <Square id="20" squares={squares} handleOnClick={handleOnClick} />
        <Square id="21" squares={squares} handleOnClick={handleOnClick} />
        <Square id="22" squares={squares} handleOnClick={handleOnClick} />
        <Square id="23" squares={squares} handleOnClick={handleOnClick} />
      </div>
      <div className="board-row">
        <Square id="24" squares={squares} handleOnClick={handleOnClick} />
        <Square id="25" squares={squares} handleOnClick={handleOnClick} />
        <Square id="26" squares={squares} handleOnClick={handleOnClick} />
        <Square id="27" squares={squares} handleOnClick={handleOnClick} />
        <Square id="28" squares={squares} handleOnClick={handleOnClick} />
        <Square id="29" squares={squares} handleOnClick={handleOnClick} />
      </div>
      <div className="board-row">
        <Square id="30" squares={squares} handleOnClick={handleOnClick} />
        <Square id="31" squares={squares} handleOnClick={handleOnClick} />
        <Square id="32" squares={squares} handleOnClick={handleOnClick} />
        <Square id="33" squares={squares} handleOnClick={handleOnClick} />
        <Square id="34" squares={squares} handleOnClick={handleOnClick} />
        <Square id="35" squares={squares} handleOnClick={handleOnClick} />
      </div>
    </div>
  )
}

export default Board
