import React, {Component} from 'react';
import TodoList from './TodoList/TodoList'
import Calendar from './Calendar/Calendar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoList />
        <Calendar />
      </div>
    );
  }
}

export default App;
