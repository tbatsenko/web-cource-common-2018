import React from 'react'
import { compose, pure, withPropsOnChange } from 'recompose'
import {
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from 'date-fns'
import { splitEvery } from 'ramda'

import Day from '../../Day'

import { weekDaysNames } from '../../../helpers/date'
import bem from '../../../helpers/bem'

import '../Calendar.scss'

const calendarBem = bem('calendar')

const CalendarMonth = ({
  selectedDate,
  calendarDate,
  onChangeDate,
  monthModel,
}) => (
  <table className={calendarBem({ element: 'month' })}>
    <tbody>
      {
        <tr key={-1}>
          {weekDaysNames.map(dayName => (
            <td
              className={[
                calendarBem({ element: 'month-cell' }),
                calendarBem({ element: 'month-weekDays' }),
              ].join(' ')}
            >
              {dayName}
            </td>
          ))}
        </tr>
      }
      {monthModel.map((week, weekIndex) => (
        <tr key={weekIndex}>
          {week.map((date, dateIndex) => (
            <td
              key={dateIndex}
              className={calendarBem({ element: 'month-cell' })}
            >
              <Day
                date={date}
                disabled={!isSameMonth(date, calendarDate)}
                selected={isSameDay(date, selectedDate)}
                onChangeDate={onChangeDate}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

const _createMonthModel = date => {
  const startDate = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const endDate = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })

  const resultingMonthModel = []

  for (
    let currentDate = startDate;
    !isSameDay(currentDate, endDate);
    currentDate = addDays(currentDate, 1)
  )
    resultingMonthModel.push(currentDate)
  resultingMonthModel.push(endDate)

  return splitEvery(7, resultingMonthModel)
}

const enhancer = compose(
  pure,
  withPropsOnChange(['calendarDate'], ({ calendarDate }) => ({
    monthModel: _createMonthModel(calendarDate),
  }))
)

export default enhancer(CalendarMonth)
