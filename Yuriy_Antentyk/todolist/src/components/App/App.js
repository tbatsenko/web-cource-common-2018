import React from "react"
import Calendar from "../Calendar/Calendar"
import TodoList from "../TodoList/TodoList"
import bem from "../../helpers/bem"
import "./App.scss"

const sameDate = (lhs, rhs) => {
    return (
        lhs.getFullYear() === rhs.getFullYear() &&
        lhs.getMonth() === rhs.getMonth() &&
        lhs.getDate() === rhs.getDate()
    )
}

const appBem = bem("app")

let todoIdCounter = 0

export default class App extends React.Component{
    state = {
        todos: [],
        date: new Date()
    }

    addTodo = (text) => {
        this.setState({todos: this.state.todos.concat([
            {
                text: text,
                id: ++todoIdCounter,
                checked: false,
                date: this.state.date
            }
        ])})
    }

    __setCheckedForAllTodos = (value) => {
        this.state.todos.forEach(todo => todo.checked = (sameDate(todo.date, this.state.date)? value: todo.checked))
        this.setState(this.state)
    }
    checkAllTodos = () => this.__setCheckedForAllTodos(true)
    uncheckAllTodos = () => this.__setCheckedForAllTodos(false)

    deleteSelectedTodos = () => this.setState({todos: this.state.todos.filter(todo => (!todo.checked) || (!sameDate(this.state.date, todo.date)))})

    toggleTodo = (id) => {
        this.state.todos.forEach(todo => todo.checked = (todo.id === id? todo.checked ^ 1: todo.checked))
        this.setState(this.state)
    }
    deleteTodo = (id) => this.setState({todos: this.state.todos.filter(todo => todo.id !== id)})

    changeDate = (newDate) => this.setState({date: newDate})

    isTodoSuitableForDate = (todo) => sameDate(this.state.date, todo.date)

    render(){
        const {todos, date} = this.state

        return (
            <div className={appBem()}>
                <div className={appBem({element: "calendar"})}>
                    <Calendar
                        onChangeDate={this.changeDate}
                        date={this.state.date}
                    />
                </div>
                <div className={appBem({element: "todoList"})}>
                    <TodoList
                        onAddTodo={this.addTodo}
                        onDeleteTodo={this.deleteTodo}
                        onToggleTodo={this.toggleTodo}
                        onCheckAllTodos={this.checkAllTodos}
                        onUncheckAllTodos={this.uncheckAllTodos}
                        onDeleteSelectedTodos={this.deleteSelectedTodos}
                        todos={todos.filter((todo) => sameDate(todo.date, date))}
                    />
                </div>
            </div>
        )
    }
}