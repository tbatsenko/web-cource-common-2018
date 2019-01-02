import React from 'react'
import { compose, pure, withHandlers } from 'recompose'

import bem from '../../../helpers/bem'

import './TodoItem.scss'
import '../../../css/bem/button.scss'

const itemBem = bem('todoItem')
const buttonBem = bem('button')

const TodoItem = ({ text, checked, onDeleteTodo, onToggleTodo }) => (
  <form onSubmit={onDeleteTodo} className={itemBem()}>
    <label className={itemBem({ element: 'label' })}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggleTodo}
      />
      <p className={itemBem({ element: 'text' })}>{text}</p>
    </label>
    <button
      type="submit"
      className={[buttonBem(), itemBem({ element: 'delete' })].join(' ')}
    >
      Delete Todo
    </button>
  </form>
)

const enhancer = compose(
  pure,
  withHandlers({
    onDeleteTodo: ({ id, onDeleteTodo }) => ev => {
      ev.preventDefault()
      onDeleteTodo(id)
    },
    onToggleTodo: ({ id, onToggleTodo }) => ev => {
      onToggleTodo(id)
    },
  })
)

export default enhancer(TodoItem)
