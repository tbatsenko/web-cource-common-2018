import React from "react"
import TodoItem from "./TodoItem/TodoItem"
import TodoCreator from "./TodoCreator/TodoCreator"
import TodoNav from "./TodoNav/TodoNav"
import { todoListBem } from "../../helpers/bem";

export default class TodoList extends React.Component{
    render() {
        const {
            addTodoCallback,
            deleteTodoCallback,
            toggleTodoCallback,
            checkAllTodosCallback,
            uncheckAllTodosCallback,
            deleteSelectedTodosCallback,
            todos
        } = this.props

        return (
            <div className={todoListBem()}>
                <TodoCreator addTodoCallback={addTodoCallback} />
                {
                    todos.map(
                        todo => 
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            checked={todo.checked}
                            deleteTodoCallback={deleteTodoCallback}
                            toggleTodoCallback={toggleTodoCallback}
                        />
                    )
                }
                <TodoNav
                    checkAllTodosCallback={checkAllTodosCallback}
                    uncheckAllTodosCallback={uncheckAllTodosCallback}
                    deleteSelectedTodosCallback={deleteSelectedTodosCallback}
                />
            </div>
        )
    }
}
