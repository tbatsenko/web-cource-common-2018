import React from 'react';
import './Todo.scss';
import BEM from '../../utils/bem';
import { holidays } from '../../utils/holidays.json';
import { withState, withProps, compose, lifecycle } from 'recompose';
import TodoItem from './TodoItem';

const b = BEM('todo');

const Todo = ({ date, items, value, deleteItem, onSubmit, onChange, monthList }) => (
  <section className={b()}>
    <header className={b('header')}>
      <h1 className={b('date')}>
        {date.day} {monthList[date.month]} {date.year}
        {holidays.map(
          (holiday) => (date.day === holiday.day && date.month === holiday.month ? ` (${holiday.name})` : '')
        )}
      </h1>
    </header>
    <main className={b('main')}>
      <ul className={b('list')}>
        {items !== undefined ? (
          items.map((value, index) => <TodoItem key={index} deleteItem={deleteItem} index={index} value={value} />)
        ) : (
          ''
        )}
      </ul>
    </main>
    <form className={b('form')} onSubmit={onSubmit}>
      <input
        className={b('input')}
        value={value}
        type="text"
        onChange={onChange}
        placeholder="Enter a task for this day"
      />
    </form>
  </section>
);

const enhancer = compose(
  withState('value', 'setValue', ''),
  withState('items', 'setItems', undefined),
  withState('id', 'setId', 1),
  withProps(() => {
    return {
      post: async (data) => {
        let options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        };
        return fetch('http://localhost:4000/dates/', options).then((response) => response.json);
      },
      put: async (data) => {
        let options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        };
        return fetch('http://localhost:4000/dates/' + data.id, options).then((response) => response.json);
      }
    };
  }),
  withProps(({ date, items, setItems, id, put, post }) => {
    return {
      isSameDate: (newDate) => {
        return newDate.day === date.day && newDate.month === date.month && newDate.year === date.year;
      },
      addItem: (item) => {
        if (items !== undefined) {
          items.push(item);
          setItems(items);
          put({
            id: id,
            day: date.day,
            month: date.month,
            year: date.year,
            items: items
          });
        } else {
          setItems([ item ]);
          post({
            id: id,
            day: date.day,
            month: date.month,
            year: date.year,
            items: [ item ]
          });
        }
      },
      deleteItem: (e) => {
        items.splice(e.target.value, 1);
        setItems(items);
        put({
          id: id,
          day: date.day,
          month: date.month,
          year: date.year,
          items: items
        });
      }
    };
  }),
  withProps(({ value, setValue, addItem }) => {
    return {
      onChange: (e) => {
        setValue(e.target.value);
      },

      onSubmit: (e) => {
        e.preventDefault();
        addItem(value);
        setValue('');
      }
    };
  }),
  lifecycle({
    componentDidUpdate({ date }) {
      const { isSameDate, setItems, setId } = this.props;
      if (!this.props.isSameDate(date)) {
        fetch('http://localhost:4000/dates/').then((response) => response.json()).then((data) => {
          let date = data.filter((date) => {
            return isSameDate(date);
          })[0];

          if (date !== undefined) {
            setItems(date.items);
            setId(date.id);
          } else {
            setItems(undefined);
            setId(data[data.length - 1].id + 1);
          }
        });
      }
    }
  })
);

export default enhancer(Todo);
