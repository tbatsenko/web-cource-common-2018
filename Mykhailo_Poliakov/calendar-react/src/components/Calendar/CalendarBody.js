import React from 'react';
import BEM from '../../utils/bem';
import { withProps, compose } from 'recompose';
import { splitEvery } from 'ramda';

const b = BEM('calendar');

const CalendarBody = ({ monthModel, children, calendarDate }) => (
  <section className={b('body')}>
    {monthModel().map((row, rowIndex) => (
      <ul key={rowIndex} className={b('row')}>
        {row.map(
          (day, dayIndex) =>
            !isNaN(parseInt(day)) ? (
              children(calendarDate, day)
            ) : (
              <li key={dayIndex + 100} className={b('cell')}>
                {day}
              </li>
            )
        )}
      </ul>
    ))}
  </section>
);

const enhancer = compose(
  withProps(({ calendarDate }) => ({
    daysList: (startMonday = true) => {
      let days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
      let firstDay = new Date(calendarDate.year, calendarDate.month).getDay();

      if (startMonday) {
        days.push(days.shift());
        firstDay = (firstDay + 6) % 7;
      }
      return [ days, firstDay ];
    },
    daysInMonth: () => {
      return new Date(calendarDate.year, calendarDate.month + 1, 0).getDate();
    }
  })),
  withProps(({ daysList, daysInMonth }) => ({
    monthModel: () => {
      let [ days, firstDay ] = daysList();
      return splitEvery(7, [
        ...days,
        ...Array(firstDay).fill(undefined),
        ...Array(daysInMonth()).fill(1).map((d, i) => i + 1),
        ...Array(42 - daysInMonth() - firstDay).fill(undefined)
      ]);
    }
  }))
);
export default enhancer(CalendarBody);
