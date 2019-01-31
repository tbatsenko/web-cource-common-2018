import React from "react";
import {
  calculateDraw,
  calculateWinner,
  getBlackPieces,
  getWhitePieces
} from "../chess_backend";
import placeFigures from "../figures_placement";
import Board from "../Board";

export default class BaseGame extends React.Component {
  constructor(props) {
    super(props);
    this.constants = {
      WIDTH: 8,
      HEIGHT: 8,
      COLOR_MAP: {
        0: "w",
        1: "b"
      },
      PLAYER_MAP: {
        0: getWhitePieces,
        1: getBlackPieces
      }
    };
    this.state = {
      players: {
        0: "white",
        1: "black"
      },
      history: [
        {
          figures: placeFigures()
        }
      ],
      current_player: 0,
      current_move: 0,
      game_result: {
        winner: null,
        draw: null
      }
    };
  }

  move(board, [r0, c0], [r1, c1]) {
    let piece = Object.assign({}, board[r0][c0]);
    piece.has_moved = true;
    piece.position = [r1, c1];
    board[r1][c1] = piece;
    board[r0][c0] = null;
    return board;
  }

  render() {
    let status_key, status_value, status_value_modifier;
    let winner = calculateWinner(this.state.figures);
    let draw = calculateDraw(this.state.figures);
    if (winner) {
      status_key = "Winner:";
      status_value = winner;
      status_value_modifier = " game-info__value--" + winner;
    } else if (draw) {
      status_key = "Draw";
      status_value = "";
      status_value_modifier = "";
    } else {
      let player = !this.state.current_player ? "w" : "b";
      status_key = "Current player:";
      status_value = player;
      status_value_modifier = " game-info__value--" + player;
    }
    return (
      <main className="game">
        <div className="board">
          <Board
            figures={this.state.figures}
            current_player={this.state.current_player}
            HEIGHT={this.constants.HEIGHT}
            WIDTH={this.constants.WIDTH}
            COLOR_MAP={this.constants.COLOR_MAP}
          />
        </div>
        <dl className="game-info">
          <dt className={"game-info__key"}>{status_key}</dt>
          <dd className={"game-info__value" + status_value_modifier}>
            {status_value}
          </dd>
          {/*<ol>{moves}</ol>*/}
        </dl>
      </main>
    );
  }
}
