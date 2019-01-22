import {getValidVerticalMoves, getValidHorizontalMoves, generateCombinations} from "./basic_moves";
import {bishopValidMoves} from "./bishop_moves";

function rockValidMoves(board, [row, col]) {
    let moves = getValidVerticalMoves(board, [row, col]);
    moves = moves.concat(getValidHorizontalMoves(board, [row, col]));
    return moves;
}

function knightValidMoves(board, [row, col]) {
    let moves = generateCombinations([-2, -1, 1, 2]);
    moves = moves.filter(([r, c]) => Math.abs(r) !== Math.abs(c));
    moves = moves.concat(moves.map(([x, y]) => [y, x]));
    moves = moves
        .map(([r, c]) => [row + r, col + c])
        .filter(([r, c]) => r >= 0 && r < 8 && (c >= 0 && c < 8))
        .filter(
            ([r, c]) =>
                board[r][c] == null || board[r][c].color !== board[row][col].color
        );
    console.log(moves);

    return moves;
}


function queenValidMoves(board, [row, col]) {
    return rockValidMoves(board, [row, col]).concat(
        bishopValidMoves(board, [row, col])
    );
}

function kingValidMoves(board, [row, col]) {
    let vertical_moves = getValidVerticalMoves(board, [row, col]);
    let horizontal_moves = getValidHorizontalMoves(board, [row, col]);
    let diagonal_moves = bishopValidMoves(board, [row, col]);

    let moves = [];
    // directions
    moves.push(vertical_moves.filter(([r, c]) => r < row).reverse()[0]);
    moves.push(vertical_moves.filter(([r, c]) => r > row)[0]);
    moves.push(horizontal_moves.filter(([r, c]) => c < col).reverse()[0]);
    moves.push(horizontal_moves.filter(([r, c]) => c > col)[0]);
    moves = moves.concat(
        diagonal_moves.filter(([r, c]) => r === row + 1 || r === row - 1)
    );
    console.log(moves);

    return moves.filter(item => item !== undefined);
}

export {
    rockValidMoves,
    knightValidMoves,
    queenValidMoves,
    kingValidMoves,
}