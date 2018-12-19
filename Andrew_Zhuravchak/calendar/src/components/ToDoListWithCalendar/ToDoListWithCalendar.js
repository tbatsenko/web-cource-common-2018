import React, { Component } from 'react'

import Calendar from '../Calendar'
import DateCell from '../Calendar/DateCell'
import ToDoList from '../ToDoList'

import Task from '../../models/Task'

import './ToDoListWithCalendar.scss'

class ToDoListWithCalendar extends Component {
  state = {
    date: new Date(),
    tasks: [],
  }

  passDateProps = date => {
    this.setState({ date })
  }

  componentDidMount() {
    Task.getAll().then(tasks => this.setState({ tasks }))
  }

  onTaskCreate = task => {
    Task.create(task).then(resp => {
      this.setState({ tasks: [...this.state.tasks, task] })
    })
  }

  onTaskRemove = taskId => {
    Task.delete(taskId).then(resp => {
      this.setState({ tasks: this.state.tasks.filter(task => task.id !== taskId) })
    })
  }

  onTaskEdit = (editedTask) => {
    Task.edit(editedTask).then(resp => {

      this.setState({
        tasks: this.state.tasks.map(task => {
          task.completed = (task.id === editedTask.id) ? editedTask.completed : task.completed
          return task
        })
      })

    })
  }

  render() {
    const { date, tasks } = this.state

    return (
      <div className="ToDoListWithCalendar">
        <Calendar date={date} onChange={this.passDateProps}>
          {date => <DateCell date={date} tasks={tasks.filter(task => {
            return task.date.getMonth() === date.getMonth() &&
              task.date.getFullYear() === date.getFullYear() &&
              task.date.getDate() === date.getDate()
          })}/>}
        </Calendar>

        <ToDoList date={date} tasks={tasks} onTaskRemove={this.onTaskRemove} onTaskCreate={this.onTaskCreate}
                  onTaskEdit={this.onTaskEdit}/>
      </div>
    )
  }
}

export default ToDoListWithCalendar
