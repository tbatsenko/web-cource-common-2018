import React from 'react';
import './Day.scss';
import BEM from '../../utils/bem';
import { withProps, compose, withHandlers } from 'recompose';
import { holidays } from '../../utils/holidays.json';

const b = BEM('day');

const Day = ({ day, onSelect, isActive, isHoliday, isWeekend, url }) => (
  <a className={b({ isActive, isWeekend, isHoliday })} onClick={onSelect} href={url}>
    {day}
  </a>
);

const enhancer = compose(
  withProps(({ day, activeDate, calendarDate }) => ({
    url: `/?year=${calendarDate.year}&month=${calendarDate.month}&day=${day}`,
    isActive: activeDate.day === day && activeDate.month === calendarDate.month && activeDate.year === calendarDate.year,
    isHoliday: holidays.find(holiday => {
      return day === holiday.day && calendarDate.month === holiday.month;
    }),
    isWeekend: [ 0, 6 ].includes(new Date(calendarDate.year, calendarDate.month, day).getDay())
  })),
  withHandlers({
    onSelect: ({ calendarDate, isActive, url, day, onDaySelect }) => e => {
      e.preventDefault();
      if (!isActive) {
        window.history.pushState({ year: calendarDate.year, month: calendarDate.month, day: day }, null, url);
        onDaySelect(day);
      }
    }
  })
);

export default enhancer(Day);
