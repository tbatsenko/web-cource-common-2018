class Cell {
  constructor(isMine = false) {
    this.isMine = isMine
    this.isFlagged = false
    this.isDiscovered = false
    this.surroundingMines = 0
  }
}

export default Cell
