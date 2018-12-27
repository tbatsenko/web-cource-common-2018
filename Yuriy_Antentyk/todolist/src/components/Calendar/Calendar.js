import React from 'react'
import { range } from 'ramda'

import bem from '../../helpers/bem'
import {
  getDaysInMonth,
  getMonthName,
  getWeekDayName,
  getWeekDayIndex,
  makeOrdinal,
  weekDayNames,
  isWeekEnd,
} from '../../helpers/date'

import './Calendar.scss'

const calendarBem = bem('calendar')

class Calendar extends React.Component {
  handleOnClick = (ev, dayOfTheMonth) => {
    ev.preventDefault()
    const { date } = this.props
    this.props.onChangeDate(
      new Date(date.getFullYear(), date.getMonth(), dayOfTheMonth)
    )
  }

  handleMonthChange = delta =>
    this.props.onChangeDate(
      new Date(
        this.props.date.getFullYear(),
        this.props.date.getMonth() + delta,
        this.props.date.getDate()
      )
    )

  render() {
    const { date, holidaysMap } = this.props

    const headerText = [
      getWeekDayName(date),
      [makeOrdinal(date.getDate()), 'of', getMonthName(date)].join(' '),
      date.getFullYear(),
    ]
      .concat(
        holidaysMap.has(date.getDate()) ? [holidaysMap.get(date.getDate())] : []
      )
      .join(', ')

    const startOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const endOfTheMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      getDaysInMonth(date)
    )

    const emptyCell = key => (
      <td
        key={key}
        className={calendarBem({ element: 'cell', disabled: true })}
      />
    )

    const beforeEmpty = range(0, getWeekDayIndex(startOfTheMonth))
      .map(val => val - 100)
      .map(key => emptyCell(key))
    const afterEmpty = range(0, 6 - getWeekDayIndex(endOfTheMonth))
      .map(val => val + 100)
      .map(key => emptyCell(key))

    const days = range(1, getDaysInMonth(date) + 1).map(dayNumber => {
      const currentDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        dayNumber
      )
      return (
        <td
          title={holidaysMap.get(dayNumber)}
          key={dayNumber}
          className={calendarBem({
            element: 'cell',
            disabled: false,
            selected: dayNumber === date.getDate(),
            holiday:
              (holidaysMap.has(dayNumber) || isWeekEnd(currentDate)) &&
              dayNumber !== date.getDate(),
          })}
        >
          <a
            className={calendarBem({ element: 'link' })}
            href={currentDate.toISOString()}
            onClick={ev => this.handleOnClick(ev, dayNumber)}
          >
            {dayNumber}
          </a>
        </td>
      )
    })

    let allDays = beforeEmpty.concat(days).concat(afterEmpty)

    let weeks = [
      <tr key={-1} className={calendarBem({ element: 'row' })}>
        {weekDayNames.map((weekDay, index) => (
          <td key={index} className={calendarBem({ element: 'cell' })}>
            {weekDay}
          </td>
        ))}
      </tr>,
    ]
    while (allDays.length > 0)
      weeks.push(
        <tr key={allDays.length} className={calendarBem({ element: 'row' })}>
          {allDays.splice(0, 7)}
        </tr>
      )

    return (
      <div className={calendarBem()}>
        <div className={calendarBem({ element: 'header' })}>
          <button
            className={calendarBem({ element: 'header-month-backward' })}
            onClick={() => this.handleMonthChange(-1)}
          >
            Backward
          </button>

          <h3 className={calendarBem({ element: 'header-text' })}>
            {headerText}
          </h3>

          <button
            className={calendarBem({ element: 'header-month-forward' })}
            onClick={() => this.handleMonthChange(1)}
          >
            Forward
          </button>
        </div>
        <table className={calendarBem({ element: 'calendar' })}>
          <tbody>{weeks}</tbody>
        </table>
      </div>
    )
  }
}

export default Calendar
