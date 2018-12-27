import React from 'react'

import '../Calendar/Calendar.scss'
import bem from '../../helpers/bem'
import { withHandlers, withProps, withState, compose } from 'recompose'
import holidaysStore from '../../helpers/holidays'
const calendarBem = bem('calendar')

const Day = ({ date, handleOnClick, isHoliday, isActive }) => (
  <a
    className={calendarBem({ element: 'day', isHoliday, isActive })}
    href={date.toISOString()}
    onClick={handleOnClick}
  >
    {date.getDate()}
  </a>
)

const enhancer = compose(
  withState('holidays', 'setHolidays', () => holidaysStore.getHolidays()),

  withProps(({ setHolidays }) => {
    holidaysStore.subscribe(setHolidays)
    if (!holidaysStore.getHolidays()) {
      if (!holidaysStore.isPending()) holidaysStore.fetchHolidays()

      return { pending: true }
    }
  }),

  withProps(({ holidays, date, activeDay }) => ({
    isActive:
      date.getDate() === activeDay.getDate() &&
      date.getFullYear() === date.getFullYear() &&
      date.getMonth() === date.getMonth(),

    isHoliday: Boolean(
      (holidays || []).find(
        ({ date: day, month }) =>
          date.getDate() === day && date.getMonth() === month
      )
    ),
  })),
  withHandlers({
    handleOnClick: ({ onSelect, date }) => ev => {
      ev.preventDefault()
      onSelect(date)
    },
  })
)

export default enhancer(Day)
