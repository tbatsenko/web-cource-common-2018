import React, { Component } from 'react';

import Todo from '../Todo'
import Calendar from '../Calendar'

import './App.css';


class App extends Component {
  render() {
    return (
      
        <div className="App">
          <div className="todo-list-wrapper">
            <h2 className="todo-list-wrapper__header">To-Do List</h2>
            <Todo/>
          </div>
          <div className="calendar-wrapper">
            <h2 className="calendar-wrapper__header">Calendar</h2>
            <Calendar/>
          </div>
        </div>
      );
  }
}

export default App;
