import React from 'react';
import BEM from '../../utils/bem';
import { withProps, compose } from 'recompose';
import { splitEvery } from 'ramda';

const b = BEM('calendar');

const CalendarBody = ({ monthModel, children }) => (
  <section className={b('body')}>
    {monthModel().map((row, rowIndex) => (
      <ul key={rowIndex} className={b('row')}>
        {row.map(
          (day, dayIndex) =>
            !isNaN(parseInt(day)) ? (
              children(day, dayIndex)
            ) : (
              <li key={dayIndex} className={b('cell')}>
                {day}
              </li>
            )
        )}
      </ul>
    ))}
  </section>
);

const enhancer = compose(
  withProps(({ date }) => ({
    daysList: (startMonday = true) => {
      let days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
      let firstDay = new Date(date.year, date.month).getDay();

      if (startMonday) {
        days.push(days.shift());
        firstDay = (firstDay + 6) % 7;
      }
      return [ days, firstDay ];
    }
  })),
  withProps(({ daysList, daysInMonth, date }) => ({
    monthModel: () => {
      let [ days, firstDay ] = daysList();
      return splitEvery(
        7,
        days.concat(
          Array(firstDay)
            .fill(undefined)
            .concat(Array(daysInMonth(date.year, date.month)).fill(1).map((d, i) => i + 1))
            .concat(Array(42 - daysInMonth(date.year, date.month) - firstDay).fill(undefined))
        )
      );
    }
  }))
);
export default enhancer(CalendarBody);
