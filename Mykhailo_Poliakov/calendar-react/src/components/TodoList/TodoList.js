import React from 'react';
import './Todo.scss';
import BEM from '../../utils/bem';
import API from '../../utils/api';
import { holidays } from '../../utils/holidays.json';
import { withState, withProps, compose, lifecycle } from 'recompose';
import TodoItem from './TodoItem';
import TodoCreator from './TodoCreator';

const b = BEM('todo');
const api = API('127.0.0.1:4000', 'todos');

const TodoList = ({ activeDate, todos, getTodos, monthList }) => (
  <section className={b()}>
    <header className={b('header')}>
      <h1 className={b('date')}>
        {activeDate.day} {monthList[activeDate.month]} {activeDate.year}
        {holidays.map(holiday => (activeDate.day === holiday.day && activeDate.month === holiday.month ? ` (${holiday.name})` : ''))}
      </h1>
    </header>
    <section className={b('main')}>
      <ul className={b('list')}>
        {todos.map(todo => <TodoItem key={todo.id} done={todo.done} text={todo.text} id={todo.id} getTodos={getTodos} />)}
      </ul>
    </section>
    <TodoCreator getTodos={getTodos} activeDate={activeDate} />
  </section>
);

const enhancer = compose(
  withState('todos', 'setTodos', []),
  withProps(({ activeDate }) => ({
    monthList: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
    isSameDate: newDate => newDate.day === activeDate.day && newDate.month === activeDate.month && newDate.year === activeDate.year
  })),
  withProps(({ isSameDate, setTodos }) => ({
    getTodos: async () => {
      let data = await api.get();
      setTodos(
        data.filter(todo => {
          return isSameDate(todo.date);
        })
      );
    }
  })),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { isSameDate, getTodos } = this.props;
      if (!isSameDate(prevProps.activeDate)) {
        getTodos();
      }
    }
  })
);

export default enhancer(TodoList);
