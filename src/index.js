import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './components/Board'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(36).fill(null),
      gameState: 'initial',
    }
  }

  handleOnSubmit = () => {
    this.setState({ gameState: 'playing' })
    this.playGame()
  }

  handleOnComplete = () => {
    this.setState({
      squares: Array(36).fill(null),
      gameState: 'initial'
    })
  }

  handleOnClick = (event) => {
    const id = event.target.id
    let { squares } = this.state
    squares[id] = (squares[id] === 'X') ? null : 'X'
    this.setState({ squares })
  }

  nextGeneration = () => {
    this.playGame()
  }

  playGame = () => {
    const { squares } = this.state
    let { gameState } = this.state

    const origSquares = squares.slice()
    for (let i = 0; i < squares.length; i++) {
      let aliveCount = 0
      if (origSquares[i - 7]) {
        aliveCount++
      }
      if (origSquares[i - 6]) {
        aliveCount++
      }
      if (origSquares[i - 5]) {
        aliveCount++
      }
      if (origSquares[i - 1]) {
        aliveCount++
      }
      if (origSquares[i + 1]) {
        aliveCount++
      }
      if (origSquares[i + 5]) {
        aliveCount++
      }
      if (origSquares[i + 6]) {
        aliveCount++
      }
      if (origSquares[i + 7]) {
        aliveCount++
      }

      if (origSquares[i]) {
        if (aliveCount < 2 || aliveCount > 3) {
          squares[i] = null
        }
      } else {
        if (aliveCount === 3) {
          squares[i] = 'X'
        }
      }
    }
    
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] !== origSquares[i]) {
        this.setState({ squares })
        return
      } else if (i === squares.length - 1 && squares[i] === origSquares[i]) {
        gameState = 'complete'
        this.setState({ gameState })
      }
    }
  }

  render() {
    const { squares, gameState } = this.state
    return (
      <div>
        {gameState === 'initial'
          ? (
            <div>
              <Board squares={squares} handleOnClick={this.handleOnClick} />
              <button type="button" onClick={this.handleOnSubmit}>
                Confirm intial placement
              </button>
            </div>
          ) : null}
        {gameState === 'playing'
          ? (
            <div>
              <Board squares={squares} />
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
              <Board squares={squares} />
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
