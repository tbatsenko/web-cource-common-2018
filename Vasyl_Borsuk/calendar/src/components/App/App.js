import React, { Component } from "react"

import BEM from "../../utils/BEM"
import Calendar from '../Calendar/Calendar'
import TodoModel from '../../utils/TodoModel'
import TodoList from '../TodoList/TodoList'
import HistoryPubSub from '../../utils/HistoryPubSub'
import "./App.scss"

const dbUrl = process.env.API_URL || 'http://localhost:3001/'
const b = BEM("app")


class App extends Component {
    constructor(props) {
        super(props)

        const pageUrl = window.location.href
        const dateFromString = new Date(pageUrl.split("/").pop())
        const date = isNaN(dateFromString) ? new Date() : dateFromString

        this.state = {
            calendarPageDate: date,
            activeDate: date,
            todoModel: new TodoModel(dbUrl + 'todo')
        }

        this.pubSub = new HistoryPubSub()
        this.pubSub.subscribe((event) => this.setState(event.state))
        this.pubSub.pushState({activeDate: date}, date.toISOString().substring(0, 10))
    }

    onMonthChange(date) {
        this.setState({
            calendarPageDate: date
        })
    }
    onDayClick(date) {
        this.setState({
            activeDate: date
        })
        this.pubSub.pushState({activeDate: date}, date.toISOString().substring(0, 10))
    }

    render() {
        const { calendarPageDate, activeDate, todoModel } = this.state

        return (
            <div className={b()}>
                <div className={b("calendar")}>
                    <Calendar
                        calendarPageDate={calendarPageDate}
                        activeDate={activeDate}
                        onMonthChange={(date) => this.onMonthChange(date)}
                        onDayClick={(date) => this.onDayClick(date)}
                    />
                </div>
                <div className={b("todo-list")}>
                    <TodoList
                        date={activeDate}
                        todoModel={todoModel}
                        key={activeDate}/>
                </div>
            </div>
        )
    }
}

export default App
