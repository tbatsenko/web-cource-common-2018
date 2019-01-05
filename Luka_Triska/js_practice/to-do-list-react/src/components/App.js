import React, {Component} from 'react';

import TodoList from './TodoList/TodoList'
import Calendar from './Calendar/Calendar'

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  handleCalendarClick = (currDate) => this.child.current.setLastClickedDate(currDate);

  render() {
    return <div className="App">
      <Calendar onClick={this.handleCalendarClick}/>
      <TodoList ref={this.child}/>
    </div>;
  }
}