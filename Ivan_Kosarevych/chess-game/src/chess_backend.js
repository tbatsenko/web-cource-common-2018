export function calculateWinner(board) {
  return false;
}

export function calculateDraw(board) {
  return false;
}

export function getWhitePieces(board) {
  let pieces = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      let figure = board[r][c];
      if (figure && figure.color === "w") {
        pieces.push(figure);
      }
    }
  }
  return pieces;
}

export function getBlackPieces(board) {
  let pieces = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      let figure = board[r][c];
      if (figure && figure.color === "b") {
        pieces.push(figure);
      }
    }
  }
  return pieces;
}
