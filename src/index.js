import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './components/Board'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: 5,
      colArray: Array(5).fill(false),
      rows: 5,
      rowArray: Array(5).fill(false),
      squares: [],
      gameState: 'initial',
      playInterval: null
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
    const { gameState, playInterval } = this.state
    if (gameState === 'playing') {
      this.setState({
        gameState: 'stop',
      })
      clearInterval(playInterval)
    } else {
      console.log(this.state.squares)
      this.setState({
        gameState: 'playing',
        playInterval: setInterval(this.playGame, 2000)
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

  playGame = () => {
    const { rows, columns, squares } = this.state
    const newSquares = squares.slice()
    console.log('here: ', newSquares)
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let aliveCount = 0

        // check row above current cell
        if (i > 0) {
          aliveCount += (j > 0 && squares[i - 1][j - 1]) ? 1 : 0
          aliveCount += (squares[i - 1][j]) ? 1 : 0
          aliveCount += (j < columns - 1 && squares[i - 1][j + 1]) ? 1 : 0
          console.log('above: ', i, j, aliveCount)
        }

        // check current row of cell
        aliveCount += (j > 0 && squares[i][j - 1]) ? 1 : 0
        aliveCount += (j < columns - 1 && squares[i][j + 1]) ? 1 : 0
        // console.log('current: ', aliveCount)

        // check row below current cell
        if (i < rows - 1) {
          aliveCount += (j > 0 && squares[i + 1][j - 1]) ? 1 : 0
          aliveCount += (squares[i + 1][j]) ? 1 : 0
          aliveCount += (j < columns - 1 && squares[i + 1][j + 1]) ? 1 : 0
          // console.log('below: ', i, j, aliveCount)
        }

        if (i === 1 && j === 1) {
          console.log(aliveCount)
        }

        if (squares[i][j]) {
          if (aliveCount < 2 || aliveCount > 3) {
            newSquares[i][j] = false
          }
        } else {
          if (aliveCount === 3) {
            newSquares[i][j] = 'X'
          }
        }
      }
    }

    this.setState({ squares: newSquares })
    // for (let i = 0; i < squares.length; i++) {
    //   if (i === squares.length - 1 && squares[i] === origSquares[i]) {
    //     this.setState({ gameState: 'complete' })
    //   }
    // }
  }

  render() {
    const { colArray, rowArray, squares, gameState } = this.state
    return (
      <div>
        <Board colArray={colArray} rowArray={rowArray} squares={squares} handleSquareToggle={this.handleSquareToggle} />
        { (gameState === 'playing')
        ? (
          <button type="button" onClick={this.handlePlayToggle}>
            Stop
          </button>
        ) : (
          <button type="button" onClick={this.handlePlayToggle}>
            Start
          </button>
        ) }
        <button type="button" onClick={this.handlePlayToggle}>
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
