import React from 'react';
import './Days.scss';
import BEM from '../../../utils/bem';
import { withProps, compose } from 'recompose';
import { splitEvery } from 'ramda';
import Day from './Day';
const b = BEM('days');

const Days = ({ monthModel, date, onSelect }) => {
  return monthModel().map((row, rowIndex) => {
    return (
      <ul key={rowIndex} className={b()}>
        {row.map((day, dayIndex) => {
          return <Day key={dayIndex} day={day} date={date} onSelect={onSelect} />;
        })}
      </ul>
    );
  });
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
              .concat(Array(daysInMonth(date.year, date.month)).fill(1).map((d, i) => i + 1))
              .concat(Array(42 - daysInMonth(date.year, date.month) - firstDay).fill(''))
          )
        );
      }
    };
  })
);
export default enhancer(Days);
