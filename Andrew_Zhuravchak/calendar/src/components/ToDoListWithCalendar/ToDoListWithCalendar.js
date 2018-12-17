import React, { Component } from 'react'
import Calendar from '../Calendar/Calendar'
import ToDoList from '../ToDoList/ToDoList'
import './ToDoListWithCalendar.scss'

const FormatDate = ({ date }) => <div>{date.getDate()}</div>

class ToDoListWithCalendar extends Component {
  state = {
    date: new Date(),
  }

  render() {
    const { date } = this.state
    return (
      <div className="ToDoListWithCalendar">
        <Calendar date={date} onChange={this.passDateProps}>
          {date => <FormatDate date={date} />}
        </Calendar>
        <ToDoList
          year={date.getFullYear()}
          month={date.getMonth()}
          day={date.getDate()}
        />
      </div>
    )
  }

  passDateProps = date => {
    this.setState({ date })
  }
}

export default ToDoListWithCalendar
