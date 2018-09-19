import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './components/Board'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: 5,
      colArray: Array(5).fill(null),
      rows: 5,
      rowArray: Array(5).fill(null),
      squares: [],
      gameState: 'initial'
    }
  }

  componentWillMount = () => {
    const { squares, columns, rows } = this.state
    for (let i = 0; i < rows; i++) {
      const newRow = Array(columns).fill(null)
      squares.push(newRow)
    }
    this.setState({ squares })
  }

  handleOnSubmit = async () => {
    const dummyEvent = document.createElement('button')
    dummyEvent.setAttribute('colindex', '')
    dummyEvent.setAttribute('rowindex', '')
    await this.handleOnClick({
      currentTarget: dummyEvent
    })
    console.log('submit: ', this.state.squares)
    this.setState({ gameState: 'playing' })
    this.playGame()
  }

  handleOnComplete = () => {
    const { columns, rows } = this.state
    const newSquares = []
    for (let i = 0; i < rows; i++) {
      const newRow = Array(columns).fill(null)
      newSquares.push(newRow)
    }
    this.setState({
      squares: newSquares,
      gameState: 'initial'
    })
  }

  handleOnClick = (event) => {
    console.log(event.currentTarget)
    const colIndex = event.currentTarget.getAttribute('colIndex')
    const rowIndex = event.currentTarget.getAttribute('rowIndex')
    let { squares } = this.state
    squares[rowIndex][colIndex] = (squares[rowIndex][colIndex] === 'X') ? null : 'X'
    this.setState({ squares }, function () {console.log(squares)})
  }

  nextGeneration = () => {
    this.playGame()
  }

  playGame = () => {
    const { rows, columns, squares } = this.state

    const origSquares = squares.slice()
    console.log(origSquares)
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let aliveCount = 0

        // check row above current cell
        if (i > 0) {
          aliveCount += (j > 0 && !!origSquares[i - 1][j - 1]) ? 1 : 0
          aliveCount += (!!origSquares[i - 1][j]) ? 1 : 0
          aliveCount += (j < columns - 1 && !!origSquares[i - 1][j + 1]) ? 1 : 0
          console.log('above: ', aliveCount)
        }

        // check current row of cell
        aliveCount += (j > 0 && !!origSquares[i][j - 1]) ? 1 : 0
        aliveCount += (j < columns - 1 && !!origSquares[i][j + 1]) ? 1 : 0
        console.log('current: ', aliveCount)

        // check row below current cell
        if (i < rows - 1) {
          aliveCount += (j > 0 && !!origSquares[i + 1][j - 1]) ? 1 : 0
          aliveCount += (!!origSquares[i + 1][j]) ? 1 : 0
          aliveCount += (j < columns - 1 && !!origSquares[i + 1][j + 1]) ? 1 : 0
          console.log('below: ', aliveCount)
        }

        if (!!origSquares[i][j]) {
          if (aliveCount < 2 || aliveCount > 3) {
            squares[i][j] = null
          }
        } else {
          if (aliveCount === 3) {
            squares[i][j] = 'X'
          }
        }
      }
    }

    this.setState({ squares })
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
        {gameState === 'initial'
          ? (
            <div>
              <Board colArray={colArray} rowArray={rowArray} squares={squares} handleOnClick={this.handleOnClick} />
              <button type="button" onClick={this.handleOnSubmit}>
                Confirm intial placement
              </button>
            </div>
          ) : null}
        {gameState === 'playing'
          ? (
            <div>
              <Board colArray={colArray} rowArray={rowArray} squares={squares} />
              <button type="button" onClick={this.nextGeneration}>
                Next generation
              </button>
              <button type="button" onClick={this.handleOnComplete}>
                Stop and play again
              </button>
            </div>
          ) : null}
        {gameState === 'complete'
          ? (
            <div>
              <Board colArray={colArray} rowArray={rowArray} squares={squares} />
              <button type="button" onClick={this.handleOnComplete}>
                Play again
              </button>
            </div>
          ) : null}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
