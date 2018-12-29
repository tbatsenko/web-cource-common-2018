import React from 'react';
import ReactDOM from 'react-dom';

import "./styles/index.scss";
import "./styles/board.scss";
import "./styles/game.scss";

function Square(props) {
    return (
        <button
            className={"board__square board__square--" + props.color + " board__square--figure-" + props.figure_color}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    _renderSquare(i, color) {
        let figure = this.props.figures[i];
        let value = figure ? figure.title : null;
        let figure_color = null;
        if (figure) {
            let valid_figures = this.props.figures.filter(item => item);
            let white_figures = valid_figures.filter(figure => figure.id > 47);
            figure_color = white_figures.includes(figure) ? "white" : "black";
        }
        return <Square value={value}
                       color={color}
                       figure_color={figure_color}
                       onClick={() => this.props.onClick(i)}
        />
    }

    _generate_board() {
        let board = [];
        let square_id = 0;
        let color = 0;
        for (let i = 0; i < this.props.HEIGHT; i++) {
            let row = [];
            for (let j = 0; j < this.props.WIDTH; j++) {
                row.push(this._renderSquare(i * this.props.HEIGHT + j, this.props.COLOR_MAP[color]));
                color = (color + 1) % 2;
                square_id = square_id + 1;
            }
            color = (color + 1) % 2;
            board.push(<div>{row}</div>)
        }
        return board;
    }

    render() {
        return (
            <div>
                {this._generate_board()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.constants = {
            WIDTH: 8,
            HEIGHT: 8,
            COLOR_MAP: {
                0: "white",
                1: "black"
            },
            PLAYER_MAP: {
                0: get_white_figures,
                1: get_black_figures,
            }
        };
        this.state = {
            figures: put_figures(),
            current_player: 0,
            squares_modifications: {
                figure_selected_position: null,
                valid_moves: [],
            },

        }
    }

    handleClick(i) {
        let state = this.state;
        let player_figures = this.constants.PLAYER_MAP[this.state.current_player](this.state.figures);
        let player_figures_ids = player_figures.map(item => item.id);
        console.log(player_figures_ids);
        if (this.state.figures[i] && player_figures_ids.includes(this.state.figures[i].id)) {
            // player selects figure
            console.log("SELECT");
            state = this.handleSelect(i);
        } else {
            state = this.handleMove(i, player_figures_ids);
        }
        this.setState(state);
    }

    handleMove(i) {
        let figures = this.state.figures.slice();
        let next_player = this.state.current_player;
        let figure_selected_position = this.state.squares_modifications.figure_selected_position;
        if (figure_selected_position !== null) {
            let selected_figure = figures[figure_selected_position];
            let valid_moves = selected_figure.valid_moves(this.state.figures, selected_figure.id, figure_selected_position);
            console.log(valid_moves);
            if (valid_moves.includes(i)) {
                figures[i] = selected_figure;
                figures[figure_selected_position] = null;
                next_player = (this.state.current_player + 1) % 2;
            }
        }
        return {
            figures: figures,
            current_player: next_player,
            squares_modifications: {
                figure_selected_position: null,
                valid_moves: [],
            }
        };
    }

    handleSelect(i) {
        let figure = this.state.figures[i];
        let valid_moves = figure.valid_moves(this.state.figures, figure.id, i);
        return {
            figures: this.state.figures,
            current_player: this.state.current_player,
            squares_modifications: {
                figure_selected_position: i,
                valid_moves: valid_moves,
            }
        };
    }

    render() {
        let status;
        let winner = calculate_winner(this.state.figures);
        let draw = calculate_draw(this.state.figures);
        if (winner) {
            status = "Winner: " + winner;
        } else if (draw) {
            status = "Draw"
        } else {
            status = "Current player: " + this.state.current_player;
        }
        return (
            <main className="game">
                <div className="board">
                    <Board figures={this.state.figures}
                           HEIGHT={this.constants.HEIGHT}
                           WIDTH={this.constants.WIDTH}
                           COLOR_MAP={this.constants.COLOR_MAP}
                           onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {/*<ol>{moves}</ol>*/}
                </div>
            </main>
        );
    }
}

function put_figures() {
    let figures = new Array(64).fill(null);
    for (let i = 8; i < 15 + 1; i++) {
        figures[i] = {
            id: i,
            title: "P",
            valid_moves: pawn_valid_moves,
        };
    }
    for (let i = 48; i < 55 + 1; i++) {
        figures[i] = {
            id: i,
            title: "P",
            valid_moves: pawn_valid_moves,
        };
    }
    for (let i of [0, 7, 56, 63]) {
        figures[i] = {
            id: i,
            title: "R",
            valid_moves: rock_valid_moves,
        };
    }
    for (let i of [1, 6, 57, 62]) {
        figures[i] = {
            id: i,
            title: "Kn",
            valid_moves: knight_valid_moves,
        };
    }
    for (let i of [2, 5, 58, 61]) {
        figures[i] = {
            id: i,
            title: "B",
            valid_moves: bishop_valid_moves,
        };
    }
    for (let i of [3, 59]) {
        figures[i] = {
            id: i,
            title: "Q",
            valid_moves: queen_valid_moves,
        };
    }
    for (let i of [4, 60]) {
        figures[i] = {
            id: i,
            title: "K",
            valid_moves: king_valid_moves,
        };
    }
    return figures;
}

function calculate_winner(figures) {
    return false;
}

function calculate_draw(figures) {
    return false;
}

function pawn_valid_moves(figures, id, i) {
    let moves = [];
    let vertical_moves = get_vertical_moves(i);
    let diagonal_moves = get_diagonal_moves(i);
    let params = {
        first_move_min: id > 47 ? 31 : i,
        first_move_max: id > 47 ? i : 32,
        vertical_move_min: id > 47 ? -(8+1) : 0,
        vertical_move_max: id > 47 ? 0 : 8+1,
        diagonal_move_min: id > 47 ? -(9+1) : 0,
        diagonal_move_max: id > 47 ? 0 : 9+1,
        enemy_id_min: id > 47 ? -1 : 47,
        enemy_id_max: id > 47 ? 16 : 64,
    };

    // check if first move
    if (i === id) {
        moves = vertical_moves.filter(index => params.first_move_min < index && index < params.first_move_max);
    }
    else {
        moves = vertical_moves.filter(index => i + params.vertical_move_min < index && index < i + params.vertical_move_max)
    }
    console.log(moves);

    // eliminate other figures in front
    let front_figures = moves.filter(index => figures[index] !== null);
    if (front_figures.length > 0){
        let nearest_figure = id > 47 ? front_figures.reduce((max, p) => p > max ? p : max, front_figures[0]) :
            front_figures.reduce((min, p) => p < min ? p : min, front_figures[0]);
        moves = id > 47 ? moves.filter(index => index > nearest_figure) : moves.filter(index => index < nearest_figure);
    }

    //check for possible enemies
    console.log(moves);
    moves = moves.concat(diagonal_moves.filter(index => i + params.diagonal_move_min < index && index < i+params.diagonal_move_max &&
        figures[index] !== null && params.enemy_id_min < figures[index].id && figures[index].id < params.enemy_id_max));

    return moves;
}

function get_nearest_figure(moves, figures, i) {
    let around_figures = moves.filter(index => figures[index] !== null);
    console.log("aaaaaa");
    return around_figures.sort((ind0, ind1)=>Math.abs(ind0 - i) > Math.abs(ind1 - i))[0];
}

function rock_valid_moves(figures, id, i) {
    let moves;
    let vertical_moves = get_vertical_moves(i);
    let horizontal_moves = get_horizontal_moves(i);

    // check for figures
    let moves_by_direction = {
        frontal_moves: vertical_moves.filter(index => index < i),
        backward_moves: vertical_moves.filter(index => index > i),
        left_moves: horizontal_moves.filter(index => index < i),
        right_moves: horizontal_moves.filter(index => index > i),
    };
    // vertical front
    let nearest_figure = get_nearest_figure(moves_by_direction.frontal_moves, figures, i);
    moves = nearest_figure != null ? moves_by_direction.frontal_moves
        .filter(index => Math.abs(figures[nearest_figure].id - id) < 16 ? index > nearest_figure : index >= nearest_figure) :
        moves_by_direction.frontal_moves;

    // vertical back
    nearest_figure = get_nearest_figure(moves_by_direction.backward_moves, figures, i);
    moves = nearest_figure!=null ? moves.concat(moves_by_direction.backward_moves
        .filter(index => Math.abs(figures[nearest_figure].id - id) < 16 ? index < nearest_figure : index <= nearest_figure)) :
    moves.concat(moves_by_direction.backward_moves);

    // horizontal left
    nearest_figure = get_nearest_figure(moves_by_direction.left_moves, figures, i);
    moves = nearest_figure != null ? moves.concat(moves_by_direction.left_moves
        .filter(index => Math.abs(figures[nearest_figure].id - id) < 16 ? index > nearest_figure : index >= nearest_figure)) :
        moves.concat(moves_by_direction.left_moves);

    // horizontal right
    nearest_figure = get_nearest_figure(moves_by_direction.right_moves, figures, i);
    moves = nearest_figure != null ? moves.concat(moves_by_direction.right_moves
        .filter(index =>  Math.abs(figures[nearest_figure].id - id) < 16 ? index < nearest_figure : index <= nearest_figure)) :
        moves.concat(moves_by_direction.right_moves);

    return moves;
}

function knight_valid_moves(figures, id, i) {
    let moves = [];
    return moves;
}

function bishop_valid_moves(figures, id, i) {
    let moves = [];
    return moves;
}

function queen_valid_moves(figures, id, i) {
    let moves = [];
    return moves;
}

function king_valid_moves(figures, id, i) {
    let moves = [];
    return moves;
}

function get_white_figures(figures) {
    return figures.filter(figure => figure && figure.id > 47);
}

function get_black_figures(figures) {
    return figures.filter(figure => figure && figure.id < 16);
}

function get_vertical_moves(i) {
    return Array.from(new Array(64), (val, index) => index).filter(index => index % 8 === i % 8 && index !== i)
}

function get_horizontal_moves(i) {
    return Array.from(new Array(8), (val, index) => index + 8 * Math.floor(i / 8)).filter(item => item !== i);
}

function get_diagonal_moves(i) {
    let square_row = Math.floor(i / 8);
    let square_col = i % 8;
    return Array.from(new Array(64), (val, index) => index).filter(
        index => (Math.floor(index / 8) - (square_row - square_col) === index % 8 ||
            Math.floor(index / 8) + (8 - 1 - square_col - square_row) === 8 - 1 - index % 8) && index !== i
    )
}

ReactDOM.render(<Game/>, document.getElementById("root"));