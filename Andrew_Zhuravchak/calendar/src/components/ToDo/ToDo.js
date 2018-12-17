import React, { Component } from 'react'
import './ToDo.scss'

class ToDo extends Component {
  constructor(props) {
    super(props)
  }

  checkToDo(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    console.log(target, value)
  }

  render() {
    return <div className="ToDo">
      <input type="checkbox"
             className="ToDo__checkbox"
             aria-label="Task is completed?"
             // checked={this.props.completed}
             // onChange={this.checkToDo.bind(this)}
             name={this.props.note}
             id={this.props.note}
      />
      <label for={this.props.note} className="ToDo__note">{this.props.note}</label>
      <button className="ToDo__remove-btn">✘</button>

    </div>
  }
}

export default ToDo