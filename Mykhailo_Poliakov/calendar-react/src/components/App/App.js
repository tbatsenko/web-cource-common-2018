import React from 'react';
import Calendar from '../Calendar/Calendar';
import TodoList from '../TodoList/TodoList';
import './App.scss';
import Day from '../Day/Day';
import BEM from '../../utils/bem';

import { withState, withHandlers, compose, lifecycle } from 'recompose';

const b = BEM('app');

const App = ({ activeDate, onDaySelect, setCalendarDate, calendarDate }) => (
  <div className={b()}>
    <Calendar
      calendarDate={calendarDate}
      setCalendarDate={setCalendarDate}
      children={(day, index) => <Day key={index} day={day} activeDate={activeDate} calendarDate={calendarDate} onDaySelect={onDaySelect} />}
    />
    <TodoList activeDate={activeDate} />
  </div>
);

const enhancer = compose(
  withState('activeDate', 'setActiveDate', {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  }),
  withState('calendarDate', 'setCalendarDate', {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  }),
  withHandlers({
    onBrowserControlsSelect: ({ setActiveDate, setCalendarDate }) => e => {
      if (e.state != null) {
        setActiveDate({ year: e.state.year, month: e.state.month, day: e.state.day });
        setCalendarDate({ year: e.state.year, month: e.state.month });
      }
    },
    onDaySelect: ({ setActiveDate, setCalendarDate, calendarDate }) => day => {
      setActiveDate({ year: calendarDate.year, month: calendarDate.month, day: day });
      setCalendarDate({ year: calendarDate.year, month: calendarDate.month });
    }
  }),
  lifecycle({
    componentDidMount() {
      const { setActiveDate, setCalendarDate, onBrowserControlsSelect } = this.props;
      const params = new URLSearchParams(window.location.search);

      let newYear = parseInt(params.get('year'));
      let newMonth = parseInt(params.get('month'));
      let newDay = parseInt(params.get('day'));

      if (!isNaN(new Date(newYear, newMonth, newDay).getTime())) {
        setActiveDate({ year: newYear, month: newMonth, day: newDay });
        setCalendarDate({ year: newYear, month: newMonth });
      }

      window.addEventListener('popstate', onBrowserControlsSelect);
    }
  })
);

export default enhancer(App);
