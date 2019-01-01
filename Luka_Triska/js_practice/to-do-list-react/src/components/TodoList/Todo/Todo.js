import React, {Component} from "react";


export default class Todo extends Component {
  render() {
    return (
      <li className="container__todo">
        <input type="checkbox" className="check-box" onChange={this.props.toggleCompleted}/>
        <div
          style={{
            textDecoration: this.props.completed ? "line-through" : ""
          }}
        >
          {this.props.text}
          <span>{this.props.currDate === null ? new Date().toString() : this.props.currDate.toString()}</span>
        </div>
        <button className="container__todo--delete-button" onClick={this.props.onDelete}>X</button>
      </li>
    )
  }
}
