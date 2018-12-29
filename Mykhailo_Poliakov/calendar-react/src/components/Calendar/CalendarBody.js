import React from 'react';
import BEM from '../../utils/bem';
import { withProps, compose } from 'recompose';
import { splitEvery } from 'ramda';

const b = BEM('calendar');

const CalendarBody = ({ monthModel, children }) => {
  return (
    <section className={b('body')}>
      {monthModel().map((row, rowIndex) => {
        return (
          <ul key={rowIndex} className={b('row')}>
            {row.map((day, dayIndex) => {
              return children(day, dayIndex);
            })}
          </ul>
        );
      })}
    </section>
  );
};

const enhancer = compose(
  withProps(({ date }) => {
    return {
      daysList: (startMonday = true) => {
        let days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
        let firstDay = new Date(date.year, date.month).getDay();

        if (startMonday) {
          days.push(days.shift());
          firstDay = (firstDay + 6) % 7;
        }
        return [ days, firstDay ];
      },
      daysInMonth: () => {
        return new Date(date.year, date.month + 1, 0).getDate();
      }
    };
  }),
  withProps(({ date, daysList, daysInMonth }) => {
    return {
      monthModel: () => {
        let [ days, firstDay ] = daysList();
        return splitEvery(
          7,
          days.concat(
            Array(firstDay)
              .fill('')
              .concat(Array(daysInMonth()).fill(1).map((d, i) => i + 1))
              .concat(Array(42 - daysInMonth() - firstDay).fill(''))
          )
        );
      }
    };
  })
);
export default enhancer(CalendarBody);
