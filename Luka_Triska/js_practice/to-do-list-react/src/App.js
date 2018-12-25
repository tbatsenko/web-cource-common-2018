import React, {Component} from 'react';
import TodoList from './TodoList/TodoList'
import Calendar from './Calendar/Calendar'
import './App.css';

class App extends Component {



  static handleCellClick(key="awd", date="awd") {
    console.log("FROM APP: Click has been handled, key: " + key + " date: " + date);
    return date
  }

  render() {
    return (
      <div className="App">
        <Calendar />
        <TodoList />
      </div>
    );
  }
}

export default App;
