import React from 'react'
import { compose, pure, withState } from 'recompose'

import Calendar from '../Calendar'
import TodoList from '../TodoList'

import bem from '../../helpers/bem'

import './App.scss'

const appBem = bem('app')

const App = ({ date, onChangeDate }) => (
  <div className={appBem()}>
    <div className={appBem({ element: 'calendar' })}>
      <Calendar
        selectedDate={date}
        calendarDate={date}
        onChangeDate={onChangeDate}
      />
    </div>
    <div className={appBem({ element: 'todoList' })}>
      <TodoList date={date} />
    </div>
  </div>
)

const enhancer = compose(
  pure,
  withState('date', 'onChangeDate', ({ date }) => date)
)

export default enhancer(App)
