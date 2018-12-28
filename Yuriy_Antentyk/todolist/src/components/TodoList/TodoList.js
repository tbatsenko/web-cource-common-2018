import React from "react"
import TodoItem from "./TodoItem/TodoItem"
import TodoCreator from "./TodoCreator/TodoCreator"
import TodoNav from "./TodoNav/TodoNav"
import bem from "../../helpers/bem";

const todoListBem = bem("todoList")

export default class TodoList extends React.Component{
    render() {
        const {
            onAddTodo,
            onDeleteTodo,
            onToggleTodo,
            onCheckAllTodos,
            onUncheckAllTodos,
            onDeleteSelectedTodos,
            todos
        } = this.props

        return (
            <div className={todoListBem()}>
                <TodoCreator onAddTodo={onAddTodo} />
                {
                    todos.map(
                        todo => 
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            text={todo.text}
                            checked={todo.checked}
                            onDeleteTodo={onDeleteTodo}
                            onToggleTodo={onToggleTodo}
                        />
                    )
                }
                <TodoNav
                    onCheckAllTodos={onCheckAllTodos}
                    onUncheckAllTodos={onUncheckAllTodos}
                    onDeleteSelectedTodos={onDeleteSelectedTodos}
                />
            </div>
        )
    }
}
