import React, { Component } from 'react'

import Calendar from '../Calendar'
import DateCell from '../Calendar/DateCell'
import ToDoList from '../ToDoList'

import './ToDoListWithCalendar.scss'

class ToDoListWithCalendar extends Component {
  state = {
    date: new Date(),
    tasks: [],
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

        <ToDoList date={date} tasks={tasks} onTasksListChange={this.passTasksProps}/>
      </div>
    )
  }

  passDateProps = date => {
    this.setState({ date })
  }

  passTasksProps = tasks => {
    this.setState({ tasks })
  }
}

export default ToDoListWithCalendar
