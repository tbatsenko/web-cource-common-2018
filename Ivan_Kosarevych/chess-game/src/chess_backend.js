export function calculateWinner(board) {
  return false;
}

export function calculateDraw(board) {
  return false;
}

export function getWhiteFigures(board) {
  let figures = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      let figure = board[r][c];
      if (figure && figure.color === "w") {
        figures.push(figure);
      }
    }
  }
  return figures;
}

export function getBlackFigures(board) {
  let figures = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      let figure = board[r][c];
      if (figure && figure.color === "b") {
        figures.push(figure);
      }
    }
  }
  return figures;
}
