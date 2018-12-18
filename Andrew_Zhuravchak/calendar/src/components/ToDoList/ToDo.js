import React, { Component } from 'react'

import PropTypes from 'prop-types'

import './ToDo.scss'

class ToDo extends Component {
  static propTypes = {
    id: PropTypes.string,
    note: PropTypes.string,
    completed: PropTypes.bool,
    date: PropTypes.object,
    onTaskRemove: PropTypes.func,
    onToggleTaskCompletement: PropTypes.func,
  }

  render() {
    const { onToggleTaskCompletement, onTaskRemove, completed, note, id } = this.props

    return (
      <div className="ToDo">
        <input type="checkbox"
               className="ToDo__checkbox"
               aria-label="Task is completed?"
               onChange={() => onToggleTaskCompletement(id)}
               checked={completed}
               name={note}
               id={id}
        />

        <label htmlFor={id}
               className={'ToDo__note ' + ((completed) ? 'ToDo__note--completed' : '')}>
          {note}
        </label>

        <button className="ToDo__remove-btn" onClick={() => onTaskRemove(id)}>✘</button>
      </div>
    )
  }
}

export default ToDo