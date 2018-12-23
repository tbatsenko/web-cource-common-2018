import React, {Component} from 'react';
import shortid from "shortid"

export default class TodoForm extends Component {
  state = {
    text: ''
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="text" type="text" value={this.state.text} onChange={this.handleChange} placeholder="add todo..."/>
      </form>
    )
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text: this.state.text,
      completed: false
    });
    this.setState({
      text: ''
    });

  };
}