import React, { Component } from 'react'

import b from '../../helpers/BEM'
import { createBoard, getCellNeighbours } from '../../helpers/board'

import './GameOfLife.scss'

const GoLBlock = b('GameOfLife')

const CELL_ALIVE = true
const CELL_DEAD = false

export default class GameOfLife extends Component {
  state = {
    board: createBoard(this.props.lines, this.props.cellsPerLine, CELL_DEAD),
  }

  generateInitPopulation = () => {
    const { probabilityOfAliveCell } = this.props

    const board = this.state.board.map((line) =>
      line.map(() => Math.random() >= (1 - probabilityOfAliveCell)))

    this.setState({ board })
  }

  getAliveNeighboursForCell = (board, row, col) => {
    return getCellNeighbours(board, row, col).reduce((aliveNeighbours, currentNeighbour) =>
      (currentNeighbour === CELL_DEAD) ? aliveNeighbours : aliveNeighbours + 1, 0)
  }

  nextGeneration = () => {
    const { board } = this.state
    const { lines, cellsPerLine } = this.props

    let newBoard = createBoard(lines, cellsPerLine, CELL_DEAD)

    board.forEach((line, lineIndex) => {
      line.forEach((cell, cellIndex) => {
        const cell_neighbours_num = this.getAliveNeighboursForCell(board, lineIndex, cellIndex)
        cell = board[lineIndex][cellIndex]

        if (cell === CELL_DEAD && cell_neighbours_num === 3)
          newBoard[lineIndex][cellIndex] = CELL_ALIVE

        if (cell === CELL_ALIVE)
          newBoard[lineIndex][cellIndex] = (cell_neighbours_num === 2 || cell_neighbours_num === 3)
      })
    })

    this.setState({ board: newBoard })
  }

  render() {
    const { board } = this.state

    return (
      <div className={GoLBlock()}>
        <div className={GoLBlock('board')}>
          {board.map((line, rowIndex) => {
            return (
              <div className={GoLBlock('board-line')} key={rowIndex}>
                {line.map((cell, colIndex) => (
                  <div key={rowIndex * colIndex + colIndex}
                       className={GoLBlock('board-cell', { active: (board[rowIndex][colIndex]) })}/>
                ))}
              </div>
            )
          })}
        </div>

        <div className={GoLBlock('toolbar')}>
          <button className={GoLBlock('toolbar-btn')} onClick={this.generateInitPopulation}>Init Population</button>
          <button className={GoLBlock('toolbar-btn')} onClick={this.nextGeneration}>Next Population</button>
        </div>
      </div>
    )
  }
}