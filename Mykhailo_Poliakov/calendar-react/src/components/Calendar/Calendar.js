import React from 'react';
import './Calendar.scss';
import BEM from '../../utils/bem';
import CalendarBody from './CalendarBody';
import { withProps, compose, withHandlers, withState, lifecycle } from 'recompose';

const b = BEM('calendar');

const Calendar = ({ calendarDate, onPreviousMonth, onNextMonth, monthList, children }) => (
  <section className={b()}>
    <header className={b('header')}>
      <button aria-label="Previous month" className={b('button', [ 'previous' ])} onClick={onPreviousMonth} />
      <h1 className={b('date')}>{monthList[calendarDate.month]}</h1>
      <button aria-label="Next month" className={b('button', [ 'next' ])} onClick={onNextMonth} />
    </header>

    <CalendarBody children={children} calendarDate={calendarDate} />
  </section>
);
const enhancer = compose(
  withState('calendarDate', 'setCalendarDate', ({ activeDate }) => ({
    year: activeDate.year,
    month: activeDate.month
  })),
  withProps(() => ({
    monthList: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  })),
  withHandlers({
    onNextMonth: ({ calendarDate, setCalendarDate }) => () => {
      let newYear = calendarDate.month === 11 ? calendarDate.year + 1 : calendarDate.year;
      let newMonth = (calendarDate.month + 1) % 12;
      setCalendarDate({ year: newYear, month: newMonth });
    },
    onPreviousMonth: ({ calendarDate, setCalendarDate }) => () => {
      let newYear = calendarDate.month === 0 ? calendarDate.year - 1 : calendarDate.year;
      let newMonth = calendarDate.month === 0 ? 11 : calendarDate.month - 1;
      setCalendarDate({ year: newYear, month: newMonth });
    }
  }),
  lifecycle({
    componentDidMount() {
      const { history, setCalendarDate } = this.props;
      history.subscribe(e => setCalendarDate(e.state));
    }
  })
);

export default enhancer(Calendar);
