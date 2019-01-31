import {getDiagonalMoves, getNearestFigure} from './basic_moves';

export function bishopValidMoves(board, [row, col]) {
    let moves = [];
    let diagonal_moves = getDiagonalMoves([row, col]);
    let moves_by_directions = {
        nw: diagonal_moves.filter(([r, c]) => r < row && c < col),
        ne: diagonal_moves.filter(([r, c]) => r < row && c > col),
        se: diagonal_moves.filter(([r, c]) => r > row && c > col),
        sw: diagonal_moves.filter(([r, c    ]) => r > row && c < col)
    };
    moves = moves.concat(bishopNWMoves(moves_by_directions.nw, board, [row, col]));
    moves = moves.concat(bishopNEMoves(moves_by_directions.ne, board, [row, col]));
    moves = moves.concat(bishopSEMoves(moves_by_directions.se, board, [row, col]));
    moves = moves.concat(bishopSWMoves(moves_by_directions.sw, board, [row, col]));
    console.log("moves");
    console.log(moves);
    return moves;
}

function bishopNWMoves(moves, board, [row, col]) {
    // north-west
    let nearest_figure = getNearestFigure(moves, board, [row, col]);
    if (nearest_figure != null) {
        let nf_row = nearest_figure[0];
        let nf_col = nearest_figure[1];
        moves = moves.filter(([r, c]) =>
            board[nf_row][nf_col].color === board[row][col].color
                ? r > nf_row
                : r >= nf_row
        );
    }
    return moves;
}

function bishopNEMoves(moves, board, [row, col]) {
    // north-east
    let nearest_figure = getNearestFigure(moves, board, [row, col]);
    if (nearest_figure != null) {
        let nf_row = nearest_figure[0];
        let nf_col = nearest_figure[1];
        moves = moves
            .filter(([r, c]) =>
                board[nf_row][nf_col].color === board[row][col].color
                    ? r > nf_row
                    : r >= nf_row
            );
    }
    return moves;
}

function bishopSEMoves(moves, board, [row, col]) {
    // south-east
    let nearest_figure = getNearestFigure(moves, board, [row, col]);
    if (nearest_figure) {
        let nf_row = nearest_figure[0];
        let nf_col = nearest_figure[1];
        moves = moves
            .filter(([r, c]) =>
                board[nf_row][nf_col].color === board[row][col].color
                    ? r < nf_row
                    : r <= nf_row
            );
    }
    return moves;
}

function bishopSWMoves(moves, board, [row, col]) {
    // south-west
    let nearest_figure = getNearestFigure(moves, board, [row, col]);
    if (nearest_figure != null) {
        let nf_row = nearest_figure[0];
        let nf_col = nearest_figure[1];
        moves = moves
            .filter(([r, c]) =>
                board[nf_row][nf_col].color === board[row][col].color
                    ? r < nf_row
                    : r <= nf_row
            );
    }
    return moves;
}
