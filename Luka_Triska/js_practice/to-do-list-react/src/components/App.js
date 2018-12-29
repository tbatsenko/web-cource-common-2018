import React, {Component} from 'react';

import TodoList from './TodoList/TodoList'
import Calendar from './Calendar/Calendar'

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currDate: null
    };
  }

  handleCalendarClick = (currDate) => {
    this.setState({
      currDate: currDate
    });
  };


  render() {
    return <div className="App">
      <Calendar onClick={this.handleCalendarClick}/>
      <TodoList currDate={this.state.currDate}/>
    </div>;
  }
}
