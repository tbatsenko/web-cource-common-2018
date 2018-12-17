import React, { Component } from 'react'
import './App.scss'
import ToDoListWithCalendar from './components/ToDoListWithCalendar/ToDoListWithCalendar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDoListWithCalendar/>
      </div>
    )
  }
}

export default App
