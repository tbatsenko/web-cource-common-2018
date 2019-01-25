import {getDiagonalMoves, getNearestFigure} from "./basic_moves";

export default function pawnValidMoves(board, [row, col]) {
    let pawn = board[row][col];

    let moves = pawnMovedCheck(pawn, [row, col]);
    moves = pawnFilterFigures(board, [row, col], moves);
    moves = moves.concat(pawnFindEnemies(board, [row, col]));

    console.log(moves);
    return moves;
}

function pawnMovedCheck(pawn, [row, col]){
    let moves = [];
    if (pawn.has_moved) {
        moves = pawn.color === "w" ? [[row - 1, col]] : [[row + 1, col]];
    } else {
        moves =
            pawn.color === "w"
                ? [[row - 1, col], [row - 2, col]]
                : [[row + 1, col], [row + 2, col]];
    }
    return moves;
}

function pawnFilterFigures(board, [row, col], moves) {
    // eliminate other figures in front
    let nearest_figure = getNearestFigure(moves, board, [row, col]);
    console.log(nearest_figure);

    if (nearest_figure != null) {
        let nf_row = nearest_figure[0];
        moves = moves.filter(([r, c]) =>
            board[row][col].color === "w" ? r > nf_row : r < nf_row
        );
    }
    return moves;
}

function pawnFindEnemies(board, [row, col]){
    //check for possible enemies
    let diagonal_moves = getDiagonalMoves([row, col]);
    let next_row = board[row][col].color === "w" ? row - 1 : row + 1;
    console.log(next_row);
    return diagonal_moves
        .reduce(function(arr, [r, c], i) {
            if (r === next_row) {
                arr.push([r, c]);
            }
            return arr;
        }, [])
        .filter(
            ([r, c]) => board[r][c] && board[r][c].color !== board[row][col].color
        );
}
