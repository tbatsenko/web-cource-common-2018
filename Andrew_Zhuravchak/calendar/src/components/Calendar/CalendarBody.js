import React from 'react'

import { getCalendarDays } from '../../helpers/date'

const CalendarBody = ({ onSelectDate, activeDate, children }) => (
  <div className="Calendar__days">
    {getCalendarDays(activeDate).map(
      (day, index) =>
        !day ? (
          <div className="day day--empty" key={index}/>
        ) : (
          <div
            className={
              'day day--number ' +
              (activeDate.getDate() === day.getDate()
                ? 'day--number-active'
                : '')
            }
            onClick={() => onSelectDate(day)}
            key={index}
          >
            {children(day)}
          </div>
        ),
    )}
  </div>
)
export default CalendarBody
