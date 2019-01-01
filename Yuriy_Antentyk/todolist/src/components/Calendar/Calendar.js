import React from 'react'
import { range, reverse, splitEvery } from 'ramda'

import { changeMonth } from '../../helpers/js/date'

import Day from './Day'
import Header from './Header'

import {
  getDaysInMonth,
  getWeekDayIndex,
  changeDay,
  getStartOfTheMonth,
  getEndOfTheMonth,
  sameMonth,
  sameDate,
  weekDayNames,
} from '../../helpers/js/date'

import bem from '../../helpers/js/bem'

import './calendar.scss'

const calendarBem = bem('calendar')

const BasicCalendar = ({ selectedDate, calendarDate, onChangeDate }) => {
  const startOfTheMonth = getStartOfTheMonth(calendarDate)
  const endOfTheMonth = getEndOfTheMonth(calendarDate)

  let datesToRender = []

  datesToRender = datesToRender.concat(
    reverse(range(1, getWeekDayIndex(startOfTheMonth) + 1)).map(delta =>
      changeDay(startOfTheMonth, -delta)
    )
  )

  datesToRender = datesToRender.concat(
    range(0, getDaysInMonth(calendarDate)).map(delta =>
      changeDay(startOfTheMonth, delta)
    )
  )

  datesToRender = datesToRender.concat(
    range(0, 6 - getWeekDayIndex(endOfTheMonth))
      .map(delta => delta + 1)
      .map(delta => changeDay(endOfTheMonth, delta))
  )

  datesToRender = datesToRender.map((currentDate, index) => (
    <td key={index}>
      <Day
        date={currentDate}
        disabled={!sameMonth(calendarDate, currentDate)}
        selected={sameDate(currentDate, selectedDate)}
        onChangeDate={onChangeDate}
      />
    </td>
  ))

  return (
    <table
      className={[
        calendarBem({ element: 'cells' }),
        calendarBem({ element: 'months-item' }),
      ].join(" ")}
    >
      <tbody>
        <tr key={-1}>
          {weekDayNames.map((weekDayName, index) => (
            <td key={index} className={calendarBem({ element: 'weekDayName' })}>
              {weekDayName}
            </td>
          ))}
        </tr>
        {splitEvery(7, datesToRender).map((week, index) => (
          <tr key={index}>{week}</tr>
        ))}
      </tbody>
    </table>
  )
}

const Calendar = ({
  selectedDate,
  calendarDate,
  onChangeDate,
  onIncrementMonth,
  onDecrementMonth,
}) => (
  <div className={calendarBem()}>
    <Header
      date={calendarDate}
      onIncrementMonth={onIncrementMonth}
      onDecrementMonth={onDecrementMonth}
    />
    <div className={calendarBem({ element: 'months' })}>
      {[-1, 0, 1]
        .map(delta => changeMonth(calendarDate, delta))
        .map((date, index) => (
          <BasicCalendar
            key={index}
            selectedDate={selectedDate}
            calendarDate={date}
            onChangeDate={onChangeDate}
          />
        ))}
    </div>
  </div>
)

export default Calendar
