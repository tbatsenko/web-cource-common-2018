import React from 'react'
import bem from '../../../helpers/bem'

const todoListBem = bem('todoList')

export default class TodoNav extends React.Component {
  render() {
    const {
      onCheckAllTodos,
      onUncheckAllTodos,
      onDeleteSelectedTodos,
    } = this.props
    return (
      <div className={todoListBem({ element: 'todoNav' })}>
        <button
          className={todoListBem({ element: 'todoNav-item' })}
          onClick={onCheckAllTodos}
        >
          Check all
        </button>
        <button
          className={todoListBem({ element: 'todoNav-item' })}
          onClick={onUncheckAllTodos}
        >
          Uncheck all
        </button>
        <button
          className={todoListBem({ element: 'todoNav-item' })}
          onClick={onDeleteSelectedTodos}
        >
          Delete Selected
        </button>
      </div>
    )
  }
}
