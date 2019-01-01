import React, { Component } from "react"

import BEM from "../../../utils/BEM"
import "../TodoList.scss"

const b = BEM("todo-list")

class TodoItem extends Component{
    render() {
        const { data, onCheck, onDelete } = this.props

        return (
            <li className={b("item")}>
                <input
                    className={b("item-checkbox")}
                    type={"checkbox"}
                    checked={data.completed}
                    onChange={onCheck}
                    key={data.id}
                />
                <span className={b("item-text")}>{data.text}</span>
                <button
                    className={b("item-remove")}
                    onClick={onDelete}
                >
                    {"X"}
                </button>
            </li>
        )
    }
}

export default TodoItem
