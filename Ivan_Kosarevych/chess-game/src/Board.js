import React from "react";

function Square(props) {
  let is_selected = props.is_selected ? " board__square--selected" : "";
  let is_valid_move = props.is_valid_move ? " board__square--valid-move" : "";
  return (
    <button
      className={
        "board__square board__square--" +
        props.color +
        " figure-" +
        props.figure_color +
        is_selected +
        is_valid_move
      }
      onClick={props.onClick}
    >
      {props.icon}
    </button>
  );
}

export default class Board extends React.Component {
  renderSquare([row, col], color) {
    let figure = this.props.figures[row][col];
    let icon = figure ? figure.icon : null;

    let figure_color = null;
    if (figure) {
      figure_color = figure.color;
    }

    let selected_sq = "selected_square" in this.props ? this.props.selected_square : null;
    let is_selected = selected_sq && selected_sq[0] === row && selected_sq[1] === col;
    let is_valid_move = "valid_moves" in this.props ? this.props.valid_moves.find(([r, c]) => r === row && c === col) : null;
    let on_click = () => "onClick" in this.props ? () => {
        return this.props.onClick([row, col])
    } : () => {};
    return (
      <Square
          key={row*8+col}
        icon={icon}
        color={color}
        figure_color={figure_color}
        is_selected={is_selected}
        is_valid_move={is_valid_move}
        onClick={on_click}
      />
    );
  }

  generateBoard() {
    let board = [];
    let square_id = 0;
    let color = 0;
    for (let i = 0; i < this.props.HEIGHT; i++) {
      let row = [];
      for (let j = 0; j < this.props.WIDTH; j++) {
        row.push(this.renderSquare([i, j], this.props.COLOR_MAP[color]));
        color = (color + 1) % 2;
        square_id = square_id + 1;
      }
      color = (color + 1) % 2;
      board.push(row);
    }
    return board.map((row, i) => <div key={64+i} className={"board__row"}>{row}</div>);
  }

  render() {
    return <div>{this.generateBoard()}</div>;
  }
}
