import React from 'react';
import './Day.scss';
import BEM from '../../utils/bem';
import { withProps, compose, withPropsOnChange } from 'recompose';
import { holidays } from '../../utils/holidays.json';

const b = BEM('day');

const Day = ({ day, onSelect, isActive, isHoliday, isWeekend, url }) => (
  <a className={b({ isActive, isWeekend, isHoliday })} onClick={onSelect} href={url}>
    {day}
  </a>
);

const enhancer = compose(
  withProps(({ day, date }) => ({
    url: `/?year=${date.year}&month=${date.month}&day=${date.day}`,
    isActive: day === date.day,
    isHoliday: holidays.find((holiday) => {
      return day === holiday.day && date.month === holiday.month;
    }),
    isWeekend: [ 0, 6 ].includes(new Date(date.year, date.month, day).getDay())
  })),
  withPropsOnChange([ 'date' ], ({ isActive, date, url }) => {
    if (isActive) {
      window.history.pushState({ year: date.year, month: date.month, day: date.day }, null, url);
    }
  })
);

export default enhancer(Day);
