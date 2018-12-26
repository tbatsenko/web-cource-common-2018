import React from 'react'
import { defaultTo } from 'ramda'

import bem from '../../helpers/bem'

import './Calendar.scss'

const calendarBem = bem('calendar')

const daysInMonth = (iMonth, iYear) =>
  32 - new Date(iYear, iMonth, 32).getDate()
const monthNames = [
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
]
const weekDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default class Calendar extends React.Component {
  handleOnClick = (ev, dayOfTheMonth) => {
    ev.preventDefault()
    const { date } = this.props
    this.props.onChangeDate(
      new Date(date.getFullYear(), date.getMonth(), dayOfTheMonth)
    )
  }
  handleMonthChange = delta => {
    const { date } = this.props
    this.props.onChangeDate(
      new Date(date.getFullYear(), date.getMonth() + delta, date.getDate())
    )
  }

  render() {
    const { date, holidaysMap } = this.props

    const headerText = `${
      weekDayNames[(date.getDay() + 6) % 7]
    },${date.getDate()}${
      date.getDate() <= 3 ? ['st', 'nd', 'rd'][date.getDate() - 1] : 'th'
    } of${monthNames[date.getMonth()]},${date.getFullYear()} ${defaultTo('')(
      holidaysMap.get(date.getDate())
    )}`

    let days = new Array(
      (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7
    ).fill(null)
    days = days = days.concat(
      [...Array(daysInMonth(date.getMonth(), date.getFullYear())).keys()].map(
        num => num + 1
      )
    )
    days = days.concat(
      new Array(days.length % 7 === 0 ? 0 : 7 - (days.length % 7)).fill(null)
    )
    days = days.map((dayNumber, index) => {
      const className = calendarBem(
        dayNumber === null
          ? {
              element: 'cell',
              disabled: true,
            }
          : {
              element: 'cell',
              disabled: false,
              selected: dayNumber === date.getDate(),
              holiday: holidaysMap.has(dayNumber) || index % 7 >= 5,
            }
      )

      return (
        <td
          key={index}
          className={className}
          title={holidaysMap.get(dayNumber)}
        >
          {dayNumber ? (
            <a
              className={calendarBem({ element: 'link' })}
              href={new Date(
                date.getFullYear(),
                date.getMonth(),
                dayNumber
              ).toISOString()}
              onClick={
                dayNumber ? ev => this.handleOnClick(ev, dayNumber) : null
              }
            >
              {dayNumber}
            </a>
          ) : null}
        </td>
      )
    })

    let weeks = [
      <tr key={-1} className={calendarBem({ element: 'row' })}>
        {weekDayNames.map((weekDay, index) => (
          <td key={index} className={calendarBem({ element: 'cell' })}>
            {weekDay}
          </td>
        ))}
      </tr>,
    ]
    while (days.length > 0)
      weeks.push(
        <tr key={days.length} className={calendarBem({ element: 'row' })}>
          {days.splice(0, 7)}
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
