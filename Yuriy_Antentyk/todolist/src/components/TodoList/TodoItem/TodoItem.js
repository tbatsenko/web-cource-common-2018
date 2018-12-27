import React from 'react'
import bem from '../../../helpers/bem'

import './TodoItem.scss'

const todoListBem = bem('todoList')

export default class TodoItem extends React.Component {
  render() {
    const { id, text, onDeleteTodo, checked, onToggleTodo } = this.props

    return (
      <form
        className={todoListBem({ element: 'item' })}
        onSubmit={ev => {
          ev.preventDefault()
          onDeleteTodo(id)
        }}
      >
        <label className={todoListBem({element: 'item-label'})}>
        <input
          type="checkbox"
          checked={checked}
          className={todoListBem({ element: 'item-checkbox' })}
          onChange={() => onToggleTodo(id)}
        />
        <p className={todoListBem({ element: 'item-text' })}>{text}</p>
        </label>
        <button
          type="submit"
          className={todoListBem({ element: 'item-delete' })}
        >
          Delete Todo
        </button>
      </form>
    )
  }
}
