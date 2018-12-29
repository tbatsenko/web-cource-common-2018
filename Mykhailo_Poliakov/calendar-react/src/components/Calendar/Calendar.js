import React from 'react';
import './Calendar.scss';
import BEM from '../../utils/bem';
import CalendarBody from './CalendarBody';
import { withProps, compose, withHandlers } from 'recompose';

const b = BEM('calendar');

const Calendar = ({ date, onPreviousMonth, onNextMonth, monthList, children, daysInMonth }) => (
  <section className={b()}>
    <header className={b('header')}>
      <button aria-label="Previous month" className={b('button')} onClick={onPreviousMonth}>
        &lt;
      </button>
      <h1 className={b('date')}>{monthList[date.month]}</h1>
      <button aria-label="Next month" className={b('button')} onClick={onNextMonth}>
        &gt;
      </button>
    </header>

    <CalendarBody children={children} date={date} daysInMonth={daysInMonth} />
  </section>
);
const enhancer = compose(
  withProps(() => ({
    monthList: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    daysInMonth: (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    }
  })),
  withHandlers({
    onNextMonth: ({ date, setDate, daysInMonth }) => () => {
      let newYear = date.month === 11 ? date.year + 1 : date.year;
      let newMonth = (date.month + 1) % 12;
      let newDay = date.day > daysInMonth(newYear, newMonth) ? 1 : date.day;
      setDate({ year: newYear, month: newMonth, day: newDay });
    },
    onPreviousMonth: ({ date, setDate, daysInMonth }) => () => {
      let newYear = date.month === 0 ? date.year - 1 : date.year;
      let newMonth = date.month === 0 ? 11 : date.month - 1;
      let newDay = date.day > daysInMonth(newYear, newMonth) ? 1 : date.day;
      setDate({ year: newYear, month: newMonth, day: newDay });
    }
  })
);

export default enhancer(Calendar);
