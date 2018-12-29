import Calendar from '../Calendar/Calendar'
import TodoModel from '../../utils/TodoModel'
import TodoList from '../TodoList/TodoList'
import "./App.scss"

import React, { Component } from "react"

const url = process.env.API_URL || 'http://localhost:3001/'

class App extends Component {
    state = {
        date: new Date(),
        todoModel: new TodoModel(url + 'todo')
    }

    onDayClick(date) {
        this.setState({
            date: date
        })
    }

    render() {
        const { date, todoModel } = this.state

        return (
            <div className={"pretty-body-for-presentation"}>
                <Calendar date={date} onDayClick={(date) => this.onDayClick(date)}/>
                <TodoList date={date} todoModel={todoModel} key={date}/>
            </div>
        )
    }
}

export default App
