import { getRandomInt } from './utils'
import Cell from './Cell'

const field__cell_modifiers = [
  'field__cell_opened',
  'field__cell_closed',
  'field__cell_flagged',
  'field__cell_bombed',
]
for (let i = 1; i <= 8; ++i)
  field__cell_modifiers.push('field__cell_number_' + String(i))

export class Controller {
  static synchronizeCell(view, model) {
    let newModifiers = []

    newModifiers.push(
      model.isDiscovered ? 'field__cell_opened' : 'field__cell_closed'
    )
    if (model.isFlagged) newModifiers.push('field__cell_flagged')
    else if (model.isDiscovered) {
      if (model.isMine) newModifiers.push('field__cell_bombed')
      else if (model.surroundingMines > 0) {
        newModifiers.push(
          'field__cell_number_' + String(model.surroundingMines)
        )
        view.innerText = String(model.surroundingMines)
      }
    }

    for (let entry of field__cell_modifiers) view.classList.remove(entry)
    for (let entry of newModifiers) view.classList.add(entry)
  }

  static getFieldView() {
    return document.getElementById('field')
  }
  static getCellView(i, j, fieldSize) {
    return this.getFieldView().getElementsByClassName('field__cell')[
      i * fieldSize + j
    ]
  }

  static synchronizeField(field) {
    this.getFieldView().innerHTML = ''
    for (let i = 0; i < field.size(); ++i)
      for (let j = 0; j < field.size(); ++j)
        this.getFieldView().innerHTML += "<div class='field__cell'></div>"
    for (let i = 0; i < field.size(); ++i)
      for (let j = 0; j < field.size(); ++j)
        this.synchronizeCell(
          this.getCellView(i, j, field.size()),
          field.getCell(i, j)
        )
  }

  static getCellIndex(view, fieldSize) {
    const index = Array.from(view.parentNode.children).indexOf(view)
    return [Math.floor(index / fieldSize), index % fieldSize]
  }
}

const di = [-1, -1, -1, 0, 1, 1, 1, 0]
const dj = [-1, 0, 1, 1, 1, 0, -1, -1]

class Field {
  constructor(size) {
    let _size = size
    this.size = () => _size

    this.valid = (i, j) => i >= 0 && i < _size && j >= 0 && j < _size

    let _field = new Array(_size)
    _field = _field.fill(0).map(x => new Array(_size))
    for (let i = 0; i < _size; ++i)
      for (let j = 0; j < _size; ++j) _field[i][j] = new Cell()

    this.getCell = (i, j) => {
      if (!this.valid(i, j)) throw RangeError('Invalid property range')
      return _field[i][j]
    }

    let _initMines = () => {
      let minesMap = new Array(_size)
        .fill(0)
        .map(x => new Array(_size).fill(false))
      let minesCnt = Math.floor(_size * _size / 10)
      while (minesCnt > 0) {
        let i = getRandomInt(0, _size - 1)
        let j = getRandomInt(0, _size - 1)
        if (minesMap[i][j]) continue
        minesMap[i][j] = true
        --minesCnt
      }
      for (let i = 0; i < _size; ++i)
        for (let j = 0; j < _size; ++j)
          if (minesMap[i][j]) _field[i][j].isMine = true
      for (let i = 0; i < _size; ++i)
        for (let j = 0; j < _size; ++j)
          _field[i][j].surroundingMines = this.surroundingMines(i, j)
    }
    _initMines()
  }

  surroundingMines(i, j) {
    let res = 0
    for (let d = 0; d < di.length; ++d) {
      let ti = i + di[d]
      let tj = j + dj[d]
      if (!this.valid(ti, tj)) continue
      if (this.getCell(ti, tj).isMine) ++res
    }
    return res
  }
}

class Game {
  constructor(fieldSize = 4) {
    this.field = new Field(fieldSize)
    this.ended = false
    Controller.synchronizeField(this.field)
  }

  _discover(i, j) {
    if (
      !this.field.valid(i, j) ||
      this.field.getCell(i, j).isDiscovered ||
      this.field.getCell(i, j).isFlagged
    )
      return
    this.field.getCell(i, j).isDiscovered = true
    if (
      this.field.surroundingMines(i, j) == 0 &&
      !this.field.getCell(i, j).isMine
    )
      for (let d = 0; d < di.length; ++d) this._discover(i + di[d], j + dj[d])

    Controller.synchronizeCell(
      Controller.getCellView(i, j, this.field.size()),
      this.field.getCell(i, j)
    )
  }

  discover(i, j) {
    this._discover(i, j)
    this.handleEndOfTheGame()
  }

  flag(i, j) {
    if (!this.field.valid(i, j) || this.field.getCell(i, j).isDiscovered) return
    this.field.getCell(i, j).isFlagged ^= 1

    Controller.synchronizeCell(
      Controller.getCellView(i, j, this.field.size()),
      this.field.getCell(i, j)
    )
    this.handleEndOfTheGame()
  }

  checkLose() {
    for (let i = 0; i < this.field.size(); ++i)
      for (let j = 0; j < this.field.size(); ++j)
        if (
          this.field.getCell(i, j).isMine &&
          this.field.getCell(i, j).isDiscovered
        )
          return true
    return false
  }

  checkWin() {
    for (let i = 0; i < this.field.size(); ++i)
      for (let j = 0; j < this.field.size(); ++j) {
        let cell = this.field.getCell(i, j)
        if (!cell.isDiscovered && !cell.isMine) return false
      }
    return true
  }

  handleEndOfTheGame() {
    if (this.checkWin() || this.checkLose()) {
      this.ended = true
      if (this.checkLose()) {
        for (let i = 0; i < this.field.size(); ++i)
          for (let j = 0; j < this.field.size(); ++j)
            if (this.field.getCell(i, j).isMine) this._discover(i, j)
        Controller.synchronizeField(this.field)
      }
      setTimeout(() => {
        alert(this.checkWin() ? 'You won!' : 'You lost!')
        location.reload()
      }, 2000)
    }
  }
}

export default Game
