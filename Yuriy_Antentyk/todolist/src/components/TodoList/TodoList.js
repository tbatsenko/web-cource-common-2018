import React from 'react'
import { compose, pure } from 'recompose'

import todosEnhancer from '../HOC/todos'

import TodoHeader from './TodoHeader'
import TodoCreator from './TodoCreator'
import TodoNav from './TodoNav'
import TodoItem from './TodoItem'

import bem from '../../helpers/bem'

import './TodoList.scss'

const todoListBem = bem('todoList')

const TodoList = ({
  date,
  onAddTodo,

  onDeleteTodo,
  onToggleTodo,

  onCheckAllTodos,
  onUncheckAllTodos,
  onDeleteSelectedTodos,
  todos,
}) => (
  <div className={todoListBem()}>
    <TodoHeader date={date} />
    <TodoCreator date={date} onAddTodo={onAddTodo} />
    {todos.map(todo => (
      <TodoItem
        id={todo.id}
        text={todo.text}
        checked={todo.checked}
        onDeleteTodo={onDeleteTodo}
        onToggleTodo={onToggleTodo}
      />
    ))}
    <TodoNav
      onCheckAllTodos={onCheckAllTodos}
      onUncheckAllTodos={onUncheckAllTodos}
      onDeleteSelectedTodos={onDeleteSelectedTodos}
    />
  </div>
)

const enhancer = compose(
  pure,
  todosEnhancer
)

export default enhancer(TodoList)
