import React, { Component } from 'react';
import './Todo.scss';
import BEM from '../../helpers/BEM';

const b = BEM('todo-list');

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: []
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  };

  handleItemChange = (event) => {
    console.log(event);
  };

  render() {
    return (
      <div>
        <form className={b()} onSubmit={this.onSubmit}>
          <input value={this.state.term} onChange={this.onChange} placeholder="What needs to be done?"/>
          <button>Submit</button>
        </form>
        <ul>
          {
            this.state.items.map((item, index) => <li key={index} className={b("item")}><input className={b("task-checkbox")} type="checkbox"
                                                                                               onClick={this.handleItemChange}/>{item}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default Todo;