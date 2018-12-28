import React from 'react';
import Days from './Days/Days';
import './Calendar.scss';

import BEM from '../../utils/bem';

const b = BEM('calendar');

const Calendar = ({ date, onPreviousMonth, onNextMonth, monthList, daysInMonth, onSelect }) => (
  <section className={b()}>
    <header className={b('header')}>
      <button aria-label="Previous month" className={b('button')} onClick={onPreviousMonth}>
        navigate_before
      </button>
      <h1 className={b('date')}>{monthList()[date.month]}</h1>
      <button aria-label="Next month" className={b('button')} onClick={onNextMonth}>
        navigate_next
      </button>
    </header>
    <main className={b('main')}>
      <Days daysInMonth={daysInMonth} onSelect={onSelect} date={date} />
    </main>
  </section>
);

export default Calendar;
