import React, { Component } from 'react'
import './ToDoList.scss'
import ToDo from '../ToDo/ToDo'

class ToDoList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      new_task_note: '',
      tasks: []
    }
  }

  addNewTask(event) {
    event.preventDefault()

    if(this.state.new_task_note === '')
      return

    let new_task = {
      note: this.state.new_task_note,
      date: new Date(this.props.year, this.props.month, this.props.day),
      completed: false
    }

    this.state.tasks.push(new_task)

    this.setState({
      new_task_note: ''
    })
  }

  getTasksForCurrentDate(){
    return this.state.tasks.filter((task) => {
      return task.date.getMonth() === this.props.month && task.date.getFullYear() === this.props.year && task.date.getDate() === this.props.day
    })
  }

  render() {
    let tasks = this.getTasksForCurrentDate()

    return <div className="ToDoList">
      <div className="ToDoList--header">
        Tasks for: <em>{this.props.day}.{this.props.month + 1}.{this.props.year}</em>
      </div>

      <div className="ToDoList--controls">
        Controls coming soon...
      </div>

      <div className="ToDoList--tasks">
        {
          (tasks.length !== 0) ? tasks.map((todo, index) => <ToDo note={todo.note} completed={todo.completed} date={todo.date} key={index}/> )
            : <div className="ToDoList--tasks-placeholder">No tasks yet...</div>
        }

      </div>

      <div className="ToDoList--footer">
        <form action="POST" className="ToDoList--footer-form" onSubmit={this.addNewTask.bind(this)}>
          <input type="text" className="ToDoList--footer-input" value={this.state.new_task_note}
                 onChange={(e) => this.setState({ new_task_note: e.target.value })} placeholder="Your next task is..."/>
          <button type="submit" className="ToDoList--footer-submit">✪</button>
        </form>
      </div>
    </div>
  }
}

export default ToDoList