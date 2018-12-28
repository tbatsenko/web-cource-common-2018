import React from 'react';
import './Todo.scss';
import BEM from '../../utils/bem';
const b = BEM('todo');

const TodoItem = ({ value, index, deleteItem }) => (
  <li className={b('item')}>
    <span className={b('text')}>{value}</span>
    <button aria-label="Done" className={b('done')} value={index} onClick={deleteItem}>
      done
    </button>
  </li>
);

export default TodoItem;
