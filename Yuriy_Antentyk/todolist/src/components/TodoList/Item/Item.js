import React from 'react'

import bem from '../../../helpers/js/bem'

import './item.scss'
import '../../../helpers/css/button.scss'
import '../../../helpers/css/checkbox.scss'

const itemBem = bem('item')
const buttonBem = bem('button')
const checkboxBem = bem("checkbox")

const TodoItem = ({ text, checked, onDeleteTodo, onToggleTodo }) => (
  <form onSubmit={onDeleteTodo} className={itemBem()}>
    <label className={itemBem({ element: 'label' })}>
      <input type="checkbox" checked={checked} onChange={onToggleTodo} className={checkboxBem()} />
      <p className={itemBem({ element: 'text' })}>{text}</p>
    </label>
    <button type="submit" className={[buttonBem(), itemBem({element: "delete"})].join(" ")}>
      Delete Todo
    </button>
  </form>
)

export default TodoItem
