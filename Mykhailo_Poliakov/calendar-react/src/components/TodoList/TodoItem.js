import React from 'react';
import './Todo.scss';
import BEM from '../../utils/bem';
import api from '../../utils/api';

import { compose, withHandlers } from 'recompose';

const b = BEM('todo');

const TodoItem = ({ done, text, id, onTodoDelete, onTodoDone }) => (
  <li className={b('item')}>
    <label htmlFor={id} className={b('text', { done })}>
      {text}
    </label>
    <button aria-label="Delete" className={b('button', [ 'delete' ])} id={-id} onClick={onTodoDelete} />
    <button aria-label="Done" className={b('button', [ 'done' ])} id={id} value={done} onClick={onTodoDone} />
  </li>
);
const enhancer = compose(
  withHandlers({
    onTodoCreate: ({ getTodos, activeDate }) => async todo => {
      await api.create({ date: activeDate, text: todo, done: false });
      getTodos();
    },
    onTodoDelete: ({ getTodos }) => async e => {
      await api.delete(e.target.id);
      getTodos();
    },
    onTodoDone: ({ getTodos }) => async e => {
      console.log('test');
      await api.update({ done: e.target.value !== 'true' }, e.target.id);
      getTodos();
    }
  })
);

export default enhancer(TodoItem);
