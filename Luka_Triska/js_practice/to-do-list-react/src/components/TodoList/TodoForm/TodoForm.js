import React, {Component} from 'react';
import shortid from "shortid"

export default class TodoForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currDate: this.props.lastClickedDate,
      text: ''
    };
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      text: this.state.text,
      date: this.props.lastClickedDate,
      completed: false,
      id: shortid.generate()
    });
    this.setState({
      text: ''
    });

  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="container__add-todo-input"
          name="text"
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="add todo..."
        />
      </form>
    )
  }
}