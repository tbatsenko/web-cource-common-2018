import React from 'react';
import Calendar from '../Calendar/Calendar';
import TodoList from '../TodoList/TodoList';
import './App.scss';
import Day from '../Day/Day';
import BEM from '../../utils/bem';
import History from '../../utils/History';

import { withState, compose, lifecycle, withProps } from 'recompose';

const b = BEM('app');

const App = ({ activeDate, history }) => (
  <div className={b()}>
    <Calendar
      history={history}
      activeDate={activeDate}
      children={(calendarDate, day) => <Day key={day} day={day} activeDate={activeDate} calendarDate={calendarDate} history={history} />}
    />
    <TodoList activeDate={activeDate} />
  </div>
);

const enhancer = compose(
  withProps({
    history: new History(),
    dateFromURL: () => {
      const params = new URLSearchParams(window.location.search);

      let newYear = parseInt(params.get('year'));
      let newMonth = parseInt(params.get('month'));
      let newDay = parseInt(params.get('day'));

      return !isNaN(new Date(newYear, newMonth, newDay).getTime())
        ? { year: newYear, month: newMonth, day: newDay }
        : {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate()
          };
    }
  }),
  withState('activeDate', 'setActiveDate', ({ dateFromURL }) => ({
    year: dateFromURL().year,
    month: dateFromURL().month,
    day: dateFromURL().day
  })),
  lifecycle({
    componentDidMount() {
      const { history, setActiveDate } = this.props;
      history.subscribe(e => setActiveDate(e.state));
    }
  })
);

export default enhancer(App);
