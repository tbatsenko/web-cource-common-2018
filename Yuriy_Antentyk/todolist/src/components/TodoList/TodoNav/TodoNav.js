import React from "react"
import {todoListBem} from "../../../helpers/bem"

export default class TodoNav extends React.Component{
    render(){
        const {
            checkAllTodosCallback,
            uncheckAllTodosCallback,
            deleteSelectedTodosCallback
        } = this.props
        return (
            <div className={todoListBem({element: "todoNav"})}>
                <button
                    className={todoListBem({element: "todoNav-item"})}
                    onClick={checkAllTodosCallback}
                >
                    Check all
                </button>
                <button
                    className={todoListBem({element: "todoNav-item"})}
                    onClick={uncheckAllTodosCallback}
                >
                    Uncheck all
                </button>
                <button
                    className={todoListBem({element: "todoNav-item"})}
                    onClick={deleteSelectedTodosCallback}
                >
                    Delete Selected
                </button>
            </div>
        )
    }
}
