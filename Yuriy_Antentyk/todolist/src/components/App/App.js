import React from 'react'
import { compose, pure, withState, lifecycle, withProps } from 'recompose'

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
  withState('date', 'setDate', ({ date }) => date),
  withProps(({ setDate }) => ({
    onChangeDate: date => {
      window.history.pushState(date, date.toISOString(), date.toISOString())
      return setDate(date)
    },
  })),
  lifecycle({
    componentDidMount() {
      const { date, setDate } = this.props

      window.history.replaceState(date, date.toISOString(), date.toISOString())

      this.popstateEventLitener = ev => setDate(ev.state)
      window.addEventListener('popstate', this.popstateEventLitener)
    },

    componentWillUnmount() {
      window.removeEventListener('popstate', this.popstateEventLitener)
    },
  })
)

export default enhancer(App)
