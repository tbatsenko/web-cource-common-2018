import React, {Component} from 'react';

import TodoList from './TodoList/TodoList'
import Calendar from './Calendar/Calendar'

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      currDate: null
    };
  }

  handleCalendarClick = (currDate) => {
    this.setState({
      currDate: currDate
    });
    this.child.current.setCurrDate(this.state.currDate)
  };


  render() {
    return <div className="App">
      <Calendar onClick={this.handleCalendarClick}/>
      <TodoList ref={this.child} currDate={this.state.currDate}/>
    </div>;
  }
}
