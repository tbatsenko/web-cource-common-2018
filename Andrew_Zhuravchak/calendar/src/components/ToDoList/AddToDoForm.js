import React, { Component } from 'react'

import PropTypes from 'prop-types'

import './AddToDoForm.scss'

class AddToDoForm extends Component {
  state = {
    newTaskNote: '',
  }

  static propTypes = {
    onAddNewTask: PropTypes.func,
  }

  addNewTask = event => {
    this.props.onAddNewTask(event, this.state.newTaskNote)
    this.setState({ newTaskNote: '' })
  }

  render() {
    return (

      <form
        action="POST"
        className="AddToDoForm"
        onSubmit={this.addNewTask}>

        <input
          type="text"
          className="AddToDoForm__input"
          value={this.state.newTaskNote}
          onChange={e => this.setState({ newTaskNote: e.target.value })}
          placeholder="Your next task is..."/>

        <button type="submit" className="AddToDoForm__submit">✪</button>
      </form>

    )
  }
}

export default AddToDoForm