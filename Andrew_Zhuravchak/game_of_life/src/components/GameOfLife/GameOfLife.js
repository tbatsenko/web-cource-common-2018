import React, { Component } from 'react'

import './GameOfLife.scss'

export default class GameOfLife extends Component {
  createEmptyBoard = () => {
    const { cellsPerLine, lines } = this.props
    return Array(lines).fill().map(() => Array(cellsPerLine).fill(false))
  }

  state = {
    board: this.createEmptyBoard(),
  }

  generateInitPopulation = () => {
    const { probabilityOfAliveCell } = this.props

    const newBoard = this.state.board.map((line) => {
      return line.map(() => Math.random() >= (1 - probabilityOfAliveCell))
    })

    this.setState({ board: newBoard })
  }

  getAliveNeighboursForCell = (board, row, col) => {
    const offsets = [[1, 0], [0, 1], [-1, 0], [0, -1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    const { cellsPerLine, lines } = this.props

    return offsets.reduce((previousValue, offset) => {
      const newRow = row + offset[1]
      const newCol = col + offset[0]

      if (!(newRow < 0 || newCol < 0 || newRow >= lines || newCol > cellsPerLine)) // check if "neighbour" cell inside board
        if (board[newRow][newCol]) // check if it's alive
          return previousValue + 1

      return previousValue
    }, 0)
  }

  nextGeneration = () => {
    const { cellsPerLine, lines } = this.props
    const { board } = this.state

    let newBoard = this.createEmptyBoard()

    for (let i = 0; i < lines; i++) {
      for (let j = 0; j < cellsPerLine; j++) {
        const neighbours_num = this.getAliveNeighboursForCell(board, i, j)

        if (!board[i][j]) {
          if (neighbours_num === 3) {
            newBoard[i][j] = true
          }
        } else {
          newBoard[i][j] = (neighbours_num === 2 || neighbours_num === 3)
        }

      }
    }

    this.setState({ board: newBoard })
  }

  render() {
    const { board } = this.state

    return (
      <div className="GameOfLife">
        <div className="GameOfLife__board">

          {
            board.map((line, rowIndex) => {
              return (
                <div className="GameOfLife__board-line" key={rowIndex}>

                  {
                    line.map((cell, colIndex) => (
                      <div key={rowIndex * colIndex + colIndex}
                           className={(board[rowIndex][colIndex]) ? 'GameOfLife__board-cell GameOfLife__board-cell--active' : 'GameOfLife__board-cell'}
                      />
                    ))
                  }

                </div>
              )
            })
          }
        </div>

        <div className="GameOfLife__toolbar">
          <button className="GameOfLife__toolbar-btn" onClick={this.generateInitPopulation}>Init Population</button>
          <button className="GameOfLife__toolbar-btn" onClick={this.nextGeneration}>Next Population</button>
        </div>
      </div>
    )
  }
}