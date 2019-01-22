import {rockValidMoves, knightValidMoves, queenValidMoves, kingValidMoves} from "./moves/other_figures_moves"
import {bishopValidMoves} from "./moves/bishop_moves";
import pawnValidMoves from "./moves/pawn_moves";

const A = 0;
const B = 1;
const C = 2;
const D = 3;
const E = 4;
const F = 6;
const G = 6;
const H = 7;

export default function placeFigures() {
    // WHITE
    const Ra1w = {
        title: "R",
        icon: "♖",
        color: "w",
        valid_moves: rockValidMoves,
        has_moved: false,
    };
    const Nb1w = {
        title: "N",
        icon: "♘",
        color: "w",
        valid_moves: knightValidMoves
    };
    const Bc1w = {
        title: "B",
        icon: "♗",
        color: "w",
        valid_moves: bishopValidMoves
    };
    const Qd1w = {
        title: "Q",
        icon: "♕",
        color: "w",
        valid_moves: queenValidMoves
    };
    const Ke1w = {
        title: "K",
        icon: "♔",
        color: "w",
        valid_moves: kingValidMoves,
        has_moved: false
    };
    const Bf1w = {
        title: "B",
        icon: "♗",
        color: "w",
        valid_moves: bishopValidMoves
    };
    const Ng1w = {
        title: "N",
        icon: "♘",
        color: "w",
        valid_moves: knightValidMoves
    };
    const Rh1w = {
        title: "R",
        icon: "♖",
        color: "w",
        valid_moves: rockValidMoves,
        has_moved: false,
    };
    const pa2w = {
        title: "P",
        icon: "♙",
        color: "w",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pb2w = {
        title: "P",
        icon: "♙",
        color: "w",
        valid_moves: pawnValidMoves,
        has_moved: false,
    };
    const pc2w = {
        title: "P",
        icon: "♙",
        color: "w",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pd2w = {
        title: "P",
        icon: "♙",
        color: "w",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pe2w = {
        title: "P",
        icon: "♙",
        color: "w",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pf2w = {
        title: "P",
        icon: "♙",
        color: "w",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pg2w = {
        title: "P",
        icon: "♙",
        color: "w",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const ph2w = {
        title: "P",
        icon: "♙",
        color: "w",
        valid_moves: pawnValidMoves,
        has_moved: false
    };

    // BLACK
    const Ra8b = {
        title: "R",
        icon: "♜",
        color: "b",
        valid_moves: rockValidMoves,
        has_moved: false,
    };
    const Nb8b = {
        title: "N",
        icon: "♞",
        color: "b",
        valid_moves: knightValidMoves
    };
    const Bc8b = {
        title: "B",
        icon: "♝",
        color: "b",
        valid_moves: bishopValidMoves
    };
    const Qd8b = {
        title: "Q",
        icon: "♛",
        color: "b",
        valid_moves: queenValidMoves
    };
    const Ke8b = {
        title: "K",
        icon: "♚",
        color: "b",
        valid_moves: kingValidMoves,
        has_moved: false
    };
    const Bf8b = {
        title: "B",
        icon: "♝",
        color: "b",
        valid_moves: bishopValidMoves
    };
    const Ng8b = {
        title: "N",
        icon: "♞",
        color: "b",
        valid_moves: knightValidMoves
    };
    const Rh8b = {
        title: "R",
        icon: "♜",
        color: "b",
        valid_moves: rockValidMoves,
        has_moved: false,
    };
    const pa7b = {
        title: "P",
        icon: "♟",
        color: "b",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pb7b = {
        title: "P",
        icon: "♟",
        color: "b",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pc7b = {
        title: "P",
        icon: "♟",
        color: "b",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pd7b = {
        title: "P",
        icon: "♟",
        color: "b",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pe7b = {
        title: "P",
        icon: "♟",
        color: "b",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pf7b = {
        title: "P",
        icon: "♟",
        color: "b",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const pg7b = {
        title: "P",
        icon: "♟",
        color: "b",
        valid_moves: pawnValidMoves,
        has_moved: false
    };
    const ph7b = {
        title: "P",
        icon: "♟",
        color: "b",
        valid_moves: pawnValidMoves,
        has_moved: false
    };

    // empty square
    const nill = null;

    return [
        [Ra8b, Nb8b, Bc8b, Qd8b, Ke8b, Bf8b, Ng8b, Rh8b],
        [pa7b, pb7b, pc7b, pd7b, pe7b, pf7b, pg7b, ph7b],
        [nill, nill, nill, nill, nill, nill, nill, nill],
        [nill, nill, nill, nill, nill, nill, nill, nill],
        [nill, nill, nill, nill, nill, nill, nill, nill],
        [nill, nill, nill, nill, nill, nill, nill, nill],
        [pa2w, pb2w, pc2w, pd2w, pe2w, pf2w, pg2w, ph2w],
        [Ra1w, Nb1w, Bc1w, Qd1w, Ke1w, Bf1w, Ng1w, Rh1w]
    ];
}