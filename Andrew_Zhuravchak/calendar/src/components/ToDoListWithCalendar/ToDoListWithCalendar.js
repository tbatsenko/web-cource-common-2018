import React, { Component } from 'react'
import Calendar from '../Calendar/Calendar'
import ToDoList from '../ToDoList/ToDoList'
import './ToDoListWithCalendar.scss'

class ToDoListWithCalendar extends Component {
  constructor(params) {
    super(params)

    this.state = {
      year: null,
      month: null,
      day: null,
    }
  }

  render() {
    return <div className="ToDoListWithCalendar">
      <Calendar callback={this.passDateProps.bind(this)}/>
      <ToDoList year={this.state.year} month={this.state.month} day={this.state.day}/>
    </div>

  }

  passDateProps(year, month, day) {
    console.log('passDateProps function')
    console.log(year, month, day)

    this.setState({
      year: year,
      month: month,
      day: day,
    })
  }
}

export default ToDoListWithCalendar