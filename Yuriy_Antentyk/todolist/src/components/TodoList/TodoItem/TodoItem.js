import React from "react"
import {todoListBem} from "../../../helpers/bem"

import "./TodoItem.scss"

export default class TodoItem extends React.Component{
    render(){
        const {id, text, deleteTodoCallback, checked, toggleTodoCallback} = this.props

        return (
            <form
                className={todoListBem({element: "item"})}
                onSubmit={(ev) => {ev.preventDefault(); deleteTodoCallback(id)}}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    className={todoListBem({element: "item-checkbox"})}
                    onClick={() => toggleTodoCallback(id)}
                />
                <p className={todoListBem({element: "item-text"})}>{text}</p>
                <button
                    type="submit"
                    className={todoListBem({element: "item-delete"})}
                >
                    Delete Todo
                </button>
            </form>
        )
    }
}
