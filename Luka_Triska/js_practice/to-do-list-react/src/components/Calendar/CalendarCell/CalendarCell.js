import React from "react";

export default function CalendarCell(props) {
  return <li className='container__todo'>
    <input type='checkbox' defaultChecked={props.todo.completed} className='check-box'
           onChange={() => {
             props.toggleCompleted(props.todo.id)
           }}/>
    <span
      style={{textDecoration: props.todo.completed ? 'line-through' : ''}}
    >
          {props.todo.text}
        </span>
    <button className='container__todo--delete-button'
            onClick={() => props.onDelete(props.todo.id)}>X
    </button>
  </li>;
}