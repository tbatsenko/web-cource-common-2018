import React from 'react'

import Calendar from '../Calendar'
import TodoList from '../TodoList'

import { getStartOfTheMonth, hashDate } from '../../helpers/js/date'
import bem from '../../helpers/js/bem'

import './app.scss'

const appBem = bem('app')

const App = ({
  date,
  onChangeDate,
  onAddTodo,
  onDeleteTodo,
  onToggleTodo,
  onCheckAllTodos,
  onUncheckAllTodos,
  onDeleteSelectedTodos,
  todos,
}) => (
  <div className={appBem()}>
    <div className={appBem({ element: 'calendar' })}>
      <Calendar
        calendarDate={getStartOfTheMonth(date)}
        selectedDate={date}
        onChangeDate={onChangeDate}
      />
    </div>
    <div className={appBem({ element: 'todoList' })}>
      <TodoList
        date={date}
        onChangeDate={onChangeDate}
        onAddTodo={onAddTodo}
        onDeleteTodo={onDeleteTodo}
        onToggleTodo={onToggleTodo}
        onCheckAllTodos={onCheckAllTodos}
        onUncheckAllTodos={onUncheckAllTodos}
        onDeleteSelectedTodos={onDeleteSelectedTodos}
        todos={todos.get(hashDate(date))}
      />
    </div>
  </div>
)

export default App
