import React from 'react';
import './Calendar.scss';

import BEM from '../../utils/bem';
import CalendarBody from './CalendarBody';

const b = BEM('calendar');

const Calendar = ({ date, onPreviousMonth, onNextMonth, monthList, onSelect, children }) => (
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

    <CalendarBody onSelect={onSelect} children={children} date={date} />
  </section>
);

export default Calendar;
