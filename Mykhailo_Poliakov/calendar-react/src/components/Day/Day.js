import React from 'react';
import './Day.scss';
import BEM from '../../utils/bem';
import { withProps, compose } from 'recompose';
import { holidays } from '../../utils/holidays.json';
const b = BEM('day');
const Day = ({ date, day, onSelect, isDate, isActive, isHoliday, isWeekend }) => (
  <a
    className={b([ isDate(), isActive(), isWeekend(), isHoliday() ])}
    onClick={onSelect}
    href={'?year=' + date.year + '&month=' + date.month + '&day=' + day}
  >
    {day}
  </a>
);

const enhancer = compose(
  withProps(({ day, date }) => ({
    isDate: () => {
      if (!isNaN(parseInt(day))) return 'date';
    },
    isActive: () => {
      if (day === date.day) return 'active';
    },
    isHoliday: () => {
      if (
        holidays.filter((holiday) => {
          return day === holiday.day && date.month === holiday.month;
        }).length
      )
        return 'holiday';
    },
    isWeekend: () => {
      let dayOfWeek = new Date(date.year, date.month, day).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) return 'weekend';
    }
  }))
);

export default enhancer(Day);
