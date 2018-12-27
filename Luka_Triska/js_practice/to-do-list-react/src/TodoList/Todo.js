import React from "react";

/** @namespace props.onDelete */
/** @namespace props.todo */
export default props =>
  (
    <li className="container__todo">
      <input type="checkbox" className="check-box" onChange={props.toggleCompleted}/>
      <div
        style={{
          textDecoration: props.todo.completed ? "line-through" : ""
        }}
      >
        {props.todo.text}
        <span>{props.todo.date.toString()}</span>
      </div>
      <button className="container__todo--delete-button" onClick={props.onDelete}>X</button>
    </li>
  );