export function createBoard(height, width, fillValue) {
  return Array(height).fill().map(() => Array(width).fill(fillValue))
}

export function getCellNeighbours(board, lineIndex, colIndex) {
  const offsets = [[1, 0], [0, 1], [-1, 0], [0, -1], [-1, -1], [-1, 1], [1, -1], [1, 1]]

  return offsets.reduce((neighbours, offset) => {
    const newRow = lineIndex + offset[1]
    const newCol = colIndex + offset[0]

    if (!(newRow < 0 || newCol < 0 || newRow >= board.length|| newCol >= board[0].length)) // check if "neighbour" cell inside board
      neighbours.push(board[newRow][newCol])

    return neighbours
  }, [])
}
