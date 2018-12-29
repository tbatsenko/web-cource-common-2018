import React from 'react';
import Calendar from '../Calendar/Calendar';
import Todo from '../Todo/Todo';
import './App.scss';
import Day from '../Day/Day';
import BEM from '../../utils/bem';

import { withState, withHandlers, compose, lifecycle } from 'recompose';

const b = BEM('app');

const App = ({ date, setDate, onSelect }) => (
  <div className={b()}>
    <Calendar
      date={date}
      setDate={setDate}
      children={(day, index) => <Day key={index} day={day} date={date} onSelect={onSelect} />}
    />
    <Todo date={date} />
  </div>
);

const enhancer = compose(
  withState('date', 'setDate', { year: 0, month: 0, day: 0 }),
  withHandlers({
    onSelect: ({ setDate, date }) => (e) => {
      e.preventDefault();
      let newDay = parseInt(e.target.innerHTML);
      if (newDay !== date.day) {
        setDate({ year: date.year, month: date.month, day: newDay });
      }
    },
    onControlsClick: ({ setDate }) => (e) => {
      if (e.state != null) {
        setDate({ year: e.state.year, month: e.state.month, day: e.state.day });
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      const { setDate, onControlsClick } = this.props;

      const params = new URLSearchParams(window.location.search);
      let newYear = parseInt(params.get('year'));
      let newMonth = parseInt(params.get('month'));
      let newDay = parseInt(params.get('day'));
      if (
        newYear > 0 &&
        (newMonth >= 0 && newMonth < 12) &&
        (newDay > 0 && newDay <= new Date(newYear, newMonth + 1, 0).getDate())
      ) {
        setDate({ year: newYear, month: newMonth, day: newDay });
      } else {
        setDate({
          year: new Date().getFullYear(),
          month: new Date().getMonth(),
          day: new Date().getDate()
        });
      }
      window.addEventListener('popstate', onControlsClick);
    }
  })
);

export default enhancer(App);
