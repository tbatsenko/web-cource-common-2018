import React, { Component } from "react"

import TodoItem from "./TodoItem/TodoItem"
import BEM from "../../utils/BEM"
import "./TodoList.scss"

const b = BEM("todo-list")

class TodoList extends Component{
    state = {
        todoItems: [],
        addItemValue: ""
    }

    constructor(props) {
        super(props)
        this.loadTodo()
    }

    setTodoList(newTodoList) {
        this.setState({
            todoItems: newTodoList
        })
    }
    loadTodo() {
        const { todoModel, date } = this.props
        todoModel.getByDate(date).then(data => this.setTodoList(data))
    }

    createTodo(text, completed, date) {
        const { todoModel } = this.props

        todoModel.create(text, completed, date)
            .then(data => {
                const { todoItems } = this.state
                todoItems.unshift(data)

                this.setState({
                    todoItems: todoItems,
                    addItemValue: ""
                })
            })
    }
    updateTodo(item) {
        const { todoModel } = this.props
        const { todoItems } = this.state
        const itemInd = todoItems.map(({id}) => id).indexOf(item.id)
        todoItems[itemInd] = item

        this.setState({
            todoItems: todoItems
        })
        todoModel.update(item)
    }
    deleteTodo(item) {
        const { todoModel } = this.props
        const { todoItems } = this.state
        this.setState({
            todoItems: todoItems.filter((el) => el.id !== item.id)
        })
        todoModel.delete(item)
    }

    onAddTodo() {
        const { date } = this.props
        const { addItemValue } = this.state
        this.createTodo(addItemValue, false, date)
    }
    onCheckTodo(item) {
        const updatedItem = Object.assign({}, item)
        updatedItem.completed = !updatedItem.completed
        this.updateTodo(updatedItem)
    }
    onDeleteTodo(item) {
        this.deleteTodo(item)
    }
    updateInputValue(event) {
        this.setState({
            addItemValue: event.target.value
        });
    }

    render() {
        const { todoItems, addItemValue } = this.state

        return (
            <article className={b()}>
                <header className={b("header")}>
                    <input
                        className={b("text-input")}
                        type={"text"}
                        value={addItemValue}
                        onChange={event => this.updateInputValue(event)}
                    />
                    <button
                        className={b("add-button")}
                        onClick={() => this.onAddTodo()}
                    >
                        Add
                    </button>
                </header>
                <ul className={b("list")}>
                    {todoItems.map((item) =>
                        <TodoItem
                            key={item.id}
                            data={item}
                            onCheck={() => this.onCheckTodo(item)}
                            onDelete={() => this.onDeleteTodo(item)}
                        />
                    )}
                </ul>
            </article>
        )
    }
}

export default TodoList
