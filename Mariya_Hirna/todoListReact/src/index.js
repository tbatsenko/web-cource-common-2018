import React from 'react'
import ReactDOM from 'react-dom'
import './style/main.css'

import TodoList from './TodoList'

let destination = document.querySelector("#todo-container");

ReactDOM.render(
    <div>
        <TodoList/>
    </div>,
    destination
)

