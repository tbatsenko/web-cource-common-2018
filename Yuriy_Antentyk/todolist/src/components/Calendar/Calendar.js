import React from 'react'
import { compose, withState, pure, withProps } from 'recompose'
import { addMonths } from 'date-fns'

import CalendarHeader from './CalendarHeader'
import CalendarMonth from './CalendarMonth'

import bem from '../../helpers/bem'

import './Calendar.scss'

const calendarBem = bem('calendar')

const Calendar = ({
  selectedDate,
  calendarDate,
  onChangeDate,
  onIncrementMonth,
  onDecrementMonth,
}) => (
  <div className={calendarBem()}>
    <CalendarHeader
      date={calendarDate}
      onIncrementMonth={onIncrementMonth}
      onDecrementMonth={onDecrementMonth}
    />

    <div className={calendarBem({ element: 'months' })}>
      <CalendarMonth
        selectedDate={selectedDate}
        calendarDate={addMonths(calendarDate, -1)}
        onChangeDate={onChangeDate}
      />
      <CalendarMonth
        selectedDate={selectedDate}
        calendarDate={calendarDate}
        onChangeDate={onChangeDate}
      />
      <CalendarMonth
        selectedDate={selectedDate}
        calendarDate={addMonths(calendarDate, 1)}
        onChangeDate={onChangeDate}
      />
    </div>
  </div>
)

const enhancer = compose(
  pure,
  withState(
    'calendarDate',
    'setCalendarDate',
    ({ calendarDate }) => calendarDate
  ),
  withProps(({ calendarDate, setCalendarDate }) => ({
    onIncrementMonth: () => setCalendarDate(addMonths(calendarDate, 1)),
    onDecrementMonth: () => setCalendarDate(addMonths(calendarDate, -1)),
  }))
)

export default enhancer(Calendar)
