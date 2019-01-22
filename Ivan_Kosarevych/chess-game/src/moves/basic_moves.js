function getVerticalMoves(col) {
    return Array.from(new Array(8), (val, index) => index).map(row => [row, col]);
}

function getHorizontalMoves(row) {
    return Array.from(new Array(8), (val, index) => index).map(col => [row, col]);
}

function getDiagonalMoves([row, col]) {
    let squares = generateCombinations(
        Array.from(new Array(8), (val, index) => index)
    );
    squares = squares.concat(squares.map(([x, y]) => [y, x]));
    squares = squares.concat(
        Array.from(new Array(8), (val, index) => index).map(index => [index, index])
    );
    return squares.filter(
        ([r, c]) =>
            (r - (row - col) === c || r + (8 - 1 - col - row) === 8 - 1 - c) &&
            (r !== row || c !== col)
    );
}

function getNearestFigure(moves, board, [row, col]) {
    let around_figures = moves.filter(([r, c]) => board[r][c] != null);
    return around_figures.sort(
        ([r0, c0], [r1, c1]) =>
            Math.abs(r0 - row) + Math.abs(c0 - col) >
            Math.abs(r1 - row) + Math.abs(c1 - col)
    )[0];
}

function getValidVerticalMoves(board, [row, col]) {
    let moves = [];
    let vertical_moves = getVerticalMoves(col);
    let moves_by_direction = {
        n: vertical_moves.filter(([r, c]) => r < row),
        s: vertical_moves.filter(([r, c]) => r > row)
    };

    // front
    let nearest_figure = getNearestFigure(moves_by_direction.n, board, [
        row,
        col
    ]);
    if (nearest_figure != null) {
        let nf_row = nearest_figure[0];
        let nf_col = nearest_figure[1];
        moves = moves_by_direction.n.filter(([r, c]) =>
            board[nf_row][nf_col].color === board[row][col].color
                ? r > nf_row
                : r >= nf_row
        );
    } else {
        moves = moves_by_direction.n;
    }

    // back
    nearest_figure = getNearestFigure(moves_by_direction.s, board, [row, col]);
    if (nearest_figure != null) {
        let nf_row = nearest_figure[0];
        let nf_col = nearest_figure[1];
        moves = moves.concat(
            moves_by_direction.s.filter(([r, c]) =>
                board[nf_row][nf_col].color === board[row][col].color
                    ? r < nf_row
                    : r <= nf_row
            )
        );
    } else {
        moves = moves.concat(moves_by_direction.s);
    }
    return moves;
}

function getValidHorizontalMoves(board, [row, col]) {
    let moves = [];
    let horizontal_moves = getHorizontalMoves(row);
    let moves_by_direction = {
        w: horizontal_moves.filter(([r, c]) => c < col),
        e: horizontal_moves.filter(([r, c]) => c > col)
    };

    // left
    let nearest_figure = getNearestFigure(moves_by_direction.w, board, [
        row,
        col
    ]);
    if (nearest_figure != null) {
        let nf_row = nearest_figure[0];
        let nf_col = nearest_figure[1];
        moves = moves_by_direction.w.filter(([r, c]) =>
            board[nf_row][nf_col].color === board[row][col].color
                ? c > nf_col
                : c >= nf_col
        );
    } else {
        moves = moves_by_direction.w;
    }
    // right
    nearest_figure = getNearestFigure(moves_by_direction.e, board, [row, col]);
    if (nearest_figure != null) {
        let nf_row = nearest_figure[0];
        let nf_col = nearest_figure[1];
        moves = moves.concat(
            moves_by_direction.e.filter(([r, c]) =>
                board[nf_row][nf_col].color === board[row][col].color
                    ? c < nf_col
                    : c <= nf_col
            )
        );
    } else {
        moves = moves.concat(moves_by_direction.e);
    }

    return moves;
}

function generateCombinations(array) {
    let results = [];
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            results.push([array[i], array[j]]);
        }
    }
    return results;
}

export {
    getNearestFigure,
    getDiagonalMoves,
    generateCombinations,
    getValidHorizontalMoves,
    getValidVerticalMoves,
}