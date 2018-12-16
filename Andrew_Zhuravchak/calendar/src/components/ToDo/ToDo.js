import React, { Component } from 'react'
import "./ToDo.scss"

class ToDo extends Component {
  constructor(props) {
    super(props)
  }

  checkToDo(event){
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    console.log(target, value)
  }

  render() {
    return <div className="ToDo">
      <input type="checkbox"
             aria-label="Task is completed?"
             checked={this.props.completed}
            // onChange={(e) => this.props.completed = e.target.value}
            onChange={this.checkToDo.bind(this)}
      />
      {this.props.note}
    </div>
  }
}

export default ToDo