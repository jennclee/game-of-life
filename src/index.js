import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './components/Board'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: 20,
      colArray: Array(20).fill(false),
      rows: 20,
      rowArray: Array(20).fill(false),
      squares: [],
      gameState: 'initial',
      playInterval: null,
      delayInterval: 200
    }
  }

  componentWillMount = () => {
    this.createEmptyBoard()
  }

  createEmptyBoard = () => {
    const { columns, rows } = this.state
    const newBoard = []
    for (let i = 0; i < rows; i++) {
      const newRow = Array(columns).fill(false)
      newBoard.push(newRow)
    }
    this.setState({
      squares: newBoard,
      gameState: 'initial'
    })
  }

  handlePlayToggle = () => {
    const { gameState, playInterval, delayInterval } = this.state
    if (gameState === 'playing') {
      this.setState({
        gameState: 'stop',
      })
      clearInterval(playInterval)
    } else {
      console.log(this.state.squares)
      this.setState({
        gameState: 'playing',
        playInterval: setInterval(this.playGame, delayInterval)
      })
    }
  }

  handleSquareToggle = (event) => {
    const colIndex = event.currentTarget.getAttribute('colIndex')
    const rowIndex = event.currentTarget.getAttribute('rowIndex')
    const { squares } = this.state
    squares[rowIndex][colIndex] = (squares[rowIndex][colIndex] === 'X') ? false : 'X'
    this.setState({ squares })
  }

  checkNeighbors = (board, row, column) => {
    const i = row
    const j = column
    const { rows, columns } = this.state
    let aliveCount = 0

    // check row above current cell
    if (i > 0) {
      aliveCount += (j > 0 && board[i - 1][j - 1]) ? 1 : 0
      aliveCount += (board[i - 1][j]) ? 1 : 0
      aliveCount += (j < columns - 1 && board[i - 1][j + 1]) ? 1 : 0
    }

    // check current row of cell
    aliveCount += (j > 0 && board[i][j - 1]) ? 1 : 0
    aliveCount += (j < columns - 1 && board[i][j + 1]) ? 1 : 0

    // check row below current cell
    if (i < rows - 1) {
      aliveCount += (j > 0 && board[i + 1][j - 1]) ? 1 : 0
      aliveCount += (board[i + 1][j]) ? 1 : 0
      aliveCount += (j < columns - 1 && board[i + 1][j + 1]) ? 1 : 0
    }
    return aliveCount
  }

  playGame = () => {
    const { rows, columns, squares } = this.state
    const newSquares = JSON.parse(JSON.stringify(squares))
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const count = this.checkNeighbors(squares, i, j, rows, columns)
        if (squares[i][j]) {
          if (count < 2 || count > 3) {
            newSquares[i][j] = false
          }
        } else {
          if (count === 3) {
            newSquares[i][j] = 'X'
          }
        }
      }
    }
    this.setState({ squares: newSquares })
  }

  render() {
    const { colArray, rowArray, squares, gameState } = this.state
    return (
      <div>
        <Board colArray={colArray} rowArray={rowArray} squares={squares} handleSquareToggle={this.handleSquareToggle} />
        {(gameState === 'playing')
          ? (
            <button type="button" onClick={this.handlePlayToggle}>
              Stop
          </button>
          ) : (
            <button type="button" onClick={this.handlePlayToggle}>
              Start
          </button>
          )}
        <button type="button" onClick={this.playGame}>
          Next generation
        </button>
        <button type="button" onClick={this.createEmptyBoard}>
          Clear board
        </button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
