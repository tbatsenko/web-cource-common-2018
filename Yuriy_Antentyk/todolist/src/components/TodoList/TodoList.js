import React from 'react'

import Item from './Item'
import Creator from './Creator'
import Header from "./Header"
import Nav from './Nav'

import bem from "../../helpers/js/bem"
import "./TodoList.scss"

const todoListBem = bem("todoList")

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
    <Header date={date} />
    <Creator onAddTodo={onAddTodo} />
    {todos.map(todo => (
      <Item
        key={todo.id}
        id={todo.id}
        text={todo.text}
        checked={todo.checked}
        onDeleteTodo={onDeleteTodo}
        onToggleTodo={onToggleTodo}
      />
    ))}
    <Nav
      onCheckAllTodos={onCheckAllTodos}
      onUncheckAllTodos={onUncheckAllTodos}
      onDeleteSelectedTodos={onDeleteSelectedTodos}
    />
  </div>
)

export default TodoList
