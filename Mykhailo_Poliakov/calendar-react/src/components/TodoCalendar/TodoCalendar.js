import React from 'react'
import Calendar from '../Calendar/Calendar'
import Todo from '../Todo/Todo'
import './TodoCalendar.scss'

import BEM from '../../utils/bem'

import { withState, withProps, compose, lifecycle } from 'recompose'

const b = BEM('todocalendar')

const TodoCalendar = props => (
  <div className={b()}>
    <Calendar {...props} />
    <Todo {...props} />
  </div>
)

const enhancer = compose(
  withState('date', 'setDate', {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  }),
  withProps(() => ({
    monthList: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    daysInMonth: (year, month) => {
      return new Date(year, month + 1, 0).getDate()
    },

    updateURL: (year, month, day) => {
      let url = `/?year=${year}&month=${month}&day=${day}`

      window.history.pushState(
        { year: year, month: month, day: day },
        null,
        url
      )
    },
  })),
  withProps(({ date, setDate, daysInMonth, updateURL }) => ({
    onNextMonth: () => {
      let newYear = date.month === 11 ? date.year + 1 : date.year
      let newMonth = (date.month + 1) % 12
      let newDay = date.day > daysInMonth(newYear, newMonth) ? 1 : date.day
      setDate({ year: newYear, month: newMonth, day: newDay })
      updateURL(newYear, newMonth, newDay)
    },
    onPreviousMonth: () => {
      let newYear = date.month === 0 ? date.year - 1 : date.year
      let newMonth = date.month === 0 ? 11 : date.month - 1
      let newDay = date.day > daysInMonth(newYear, newMonth) ? 1 : date.day
      setDate({ year: newYear, month: newMonth, day: newDay })
      updateURL(newYear, newMonth, newDay)
    },
    onSelect: e => {
      e.preventDefault()
      let newDay = parseInt(e.target.innerHTML)
      let isActive = e.target.className.includes('active')
      if (!isNaN(newDay) && !isActive) {
        setDate({ year: date.year, month: date.month, day: newDay })
        updateURL(date.year, date.month, newDay)
      }
    },
    onControlsClick: e => {
      if (e.state != null) {
        setDate({ year: e.state.year, month: e.state.month, day: e.state.day })
      }
    },
  })),
  lifecycle({
    componentDidMount() {
      const {
        date,
        setDate,
        daysInMonth,
        updateURL,
        onControlsClick,
      } = this.props

      const params = new URLSearchParams(window.location.search)
      let newYear = parseInt(params.get('year'))
      let newMonth = parseInt(params.get('month'))
      let newDay = parseInt(params.get('day'))
      if (
        newYear > 0 &&
        (newMonth >= 0 && newMonth < 12) &&
        (newDay > 0 && newDay <= daysInMonth(newMonth, newYear))
      ) {
        setDate({ year: newYear, month: newMonth, day: newDay })
        updateURL(newYear, newMonth, newDay)
      } else {
        updateURL(date.year, date.month, date.day)
      }
      window.addEventListener('popstate', onControlsClick)
    },
  })
)

export default enhancer(TodoCalendar)
