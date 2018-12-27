import React from 'react'
import { range } from 'ramda'

import {
  getDaysInMonth,
  getMonthName,
  getWeekDayName,
  getWeekDayIndex,
  makeOrdinal,
  weekDayNames,
} from '../../helpers/date'

import { compose, pure, withProps } from 'recompose'
import { splitEvery } from 'ramda'
import './Calendar.scss'
import bem from '../../helpers/bem'
const calendarBem = bem('calendar')

const CalendarHeader = ({ date, handleMonthChange }) => {
  const headerText = [
    getWeekDayName(date),
    [makeOrdinal(date.getDate()), 'of', getMonthName(date)].join(' '),
    date.getFullYear(),
  ].join(', ')

  return (
    <div className={calendarBem({ element: 'header' })}>
      <button
        className={calendarBem({ element: 'header-month-backward' })}
        onClick={() => handleMonthChange(-1)}
      >
        Backward
      </button>

      <h3 className={calendarBem({ element: 'header-text' })}>{headerText}</h3>

      <button
        className={calendarBem({ element: 'header-month-forward' })}
        onClick={() => handleMonthChange(1)}
      >
        Forward
      </button>
    </div>
  )
}

class Calendar extends React.Component {
  handleMonthChange = delta =>
    this.props.onChangeDate(
      new Date(
        this.props.date.getFullYear(),
        this.props.date.getMonth() + delta,
        this.props.date.getDate()
      )
    )

  render() {
    const { date, children, monthModel } = this.props

    return (
      <div className={calendarBem()}>
        <CalendarHeader
          date={date}
          handleMonthChange={this.handleMonthChange}
        />
        <table className={calendarBem({ element: 'calendar' })}>
          <tbody>
            <tr className={calendarBem({ element: 'row' })}>
              {weekDayNames.map((weekDay, index) => (
                <td key={index} className={calendarBem({ element: 'cell' })}>
                  {weekDay}
                </td>
              ))}
            </tr>

            {monthModel.map((week, i) => (
              <tr key={i} className={calendarBem({ element: 'row' })}>
                {week.map((day, i) => (
                  <td
                    key={day ? day.toISOString() : i}
                    className={calendarBem({ element: 'cell', disabled: !day })}
                  >
                    {day && children(day)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const enhancer = compose(
  withProps(({ date }) => ({
    date: new Date(date.getFullYear(), date.getMonth(), 1),
  })),
  pure,

  withProps(({ date }) => {
    const month = {
      start: date,
      end: new Date(date.getFullYear(), date.getMonth(), getDaysInMonth(date)),
    }

    return {
      monthModel: splitEvery(7, [
        ...Array(getWeekDayIndex(month.start)).fill(null),
        ...range(1, getDaysInMonth(date) + 1).map(
          day => new Date(date.getFullYear(), date.getMonth(), day)
        ),
        ...Array(getWeekDayIndex(month.end)).fill(null),
      ]),
    }
  })
)

export default enhancer(Calendar)
