import React from "react";

/** @namespace props.onDelete */
/** @namespace props.todo */
export default props =>
  (
    <li style={{display: "flex", justifyContent: "center"}}>
      <input type="checkbox" className="check-box" onChange={props.toggleCompleted}/>
      <div
        style={{
          textDecoration: props.todo.completed ? "line-through" : ""
        }}
      >
        {props.todo.text}
      </div>
      <button onClick={props.onDelete}>X</button>
    </li>
  );