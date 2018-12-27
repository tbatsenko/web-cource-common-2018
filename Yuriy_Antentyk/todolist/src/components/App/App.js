import React from 'react'
import Axios from 'axios'

import immutable from 'immutable'

import Calendar from '../Calendar/Calendar'
import TodoList from '../TodoList/TodoList'

import { retrieveDateFromUrlString, hashDate } from '../../helpers/date'
import rest from '../../helpers/rest'
import getDbHost from '../../helpers/db'
import bem from '../../helpers/bem'
import getHolidays from '../../helpers/holidays'

import './App.scss'

const appBem = bem('app')

const todoRest = rest(getDbHost())('todos')

export default class App extends React.Component {
  state = {
    todos: new immutable.Map(),
    date: undefined,
    dateHash: undefined,
    holidays: undefined,
  }

  constructor(props) {
    super(props)
    this.state.date = retrieveDateFromUrlString(window.location.href)
    this.state.dateHash = hashDate(this.state.date)
  }

  componentDidMount() {
    this.getTodos(this.state.date).then(data => {
      this.setState({
        todos: this.state.todos.set(
          hashDate(this.state.date),
          immutable.List.of(...data)
        ),
      })

      window.history.replaceState(
        { date: this.state.date },
        this.state.date.toISOString(),
        this.state.date.toISOString()
      )
    })

    getHolidays().then(holidays =>
      this.setState({ holidays: immutable.List.of(...holidays) })
    )

    this.stateChangeEventListener = window.addEventListener('popstate', ev =>
      this.changeDate(ev.state.date)
    )
  }
  componentWillUnmount() {
    this.stateChangeEventListener.removeEventListener()
  }

  getTodos = date =>
    Axios.get(
        todoRest.get({year: date.getFullYear(), month: date.getMonth(), date: date.getDate()})
    ).then(response =>
      response.data.map(todoDbRepresentation => {
        return {
          id: todoDbRepresentation.id,
          text: todoDbRepresentation.text,
          checked: false,
        }
      })
    )

  addTodo = text => {
    const todoAppRepresentation = {
      text: text,
      id: new Date().getTime(),
      checked: false,
    }
    const todoDbRepresentation = {
      text: todoAppRepresentation.text,
      id: todoAppRepresentation.id,
      date: this.state.date.getDate(),
      month: this.state.date.getMonth(),
      year: this.state.date.getFullYear(),
    }

    Axios.post(todoRest.post(), todoDbRepresentation).then(() => {
      this.setState({
        todos: this.state.todos.set(
          this.state.dateHash,
          this.state.todos.get(this.state.dateHash).push(todoAppRepresentation)
        ),
      })
    })
  }

  setCheckedForAllTodos = checkValue => {
    this.setState({
      todos: this.state.todos.set(
        this.state.dateHash,
        this.state.todos.get(this.state.dateHash).reduce((accum, todo) => {
          todo.checked = checkValue
          return accum.push(todo)
        }, new immutable.List())
      ),
    })
  }
  checkAllTodos = () => this.setCheckedForAllTodos(true)
  uncheckAllTodos = () => this.setCheckedForAllTodos(false)

  deleteSelectedTodos = () => {
    Promise.all(
      this.state.todos
        .get(this.state.dateHash)
        .filter(todo => todo.checked)
        .map(todo => Axios.delete(todoRest.delete(todo.id)))
    ).then(() =>
      this.setState({
        todos: this.state.todos.set(
          this.state.dateHash,
          this.state.todos
            .get(this.state.dateHash)
            .filter(todo => !todo.checked)
        ),
      })
    )
  }

  toggleTodo = id => {
    this.setState({
      todos: this.state.todos.set(
        this.state.dateHash,
        this.state.todos.get(this.state.dateHash).reduce((accum, todo) => {
          todo.checked = todo.checked ^ (todo.id === id)
          return accum.push(todo)
        }, new immutable.List())
      ),
    })
  }
  deleteTodo = id => {
    Axios.delete(todoRest.delete(id)).then(() =>
      this.setState({
        todos: this.state.todos.set(
          this.state.dateHash,
          this.state.todos
            .get(this.state.dateHash)
            .filter(todo => todo.id !== id)
        ),
      })
    )
  }

  changeDate = newDate => {
    if (this.state.dateHash === hashDate(newDate)) return

    if (this.state.todos.has(hashDate(newDate)))
      return this.setState({ date: newDate, dateHash: hashDate(newDate) })

    this.getTodos(newDate).then(data => {
      this.setState({
        date: newDate,
        dateHash: hashDate(newDate),
        todos: this.state.todos.set(
          hashDate(newDate),
          immutable.List.of(...data)
        ),
      })

      window.history.pushState(
        { date: newDate },
        newDate.toISOString(),
        newDate.toISOString()
      )
    })
  }

  render() {
    const { todos, date, dateHash, holidays } = this.state

    if (!todos.has(dateHash) || !holidays) return <div>Loading</div>

    const holidaysMap = holidays
      .filter(holiday => holiday.month === date.getMonth())
      .reduce(
        (accum, holiday) => accum.set(holiday.date, holiday.name),
        new immutable.Map()
      )

    return (
      <div className={appBem()}>
        <div className={appBem({ element: 'calendar' })}>
          <Calendar
            onChangeDate={this.changeDate}
            date={date}
            holidaysMap={holidaysMap}
          />
        </div>
        <div className={appBem({ element: 'todoList' })}>
          <TodoList
            onAddTodo={this.addTodo}
            onDeleteTodo={this.deleteTodo}
            onToggleTodo={this.toggleTodo}
            onCheckAllTodos={this.checkAllTodos}
            onUncheckAllTodos={this.uncheckAllTodos}
            onDeleteSelectedTodos={this.deleteSelectedTodos}
            todos={todos.get(dateHash)}
          />
        </div>
      </div>
    )
  }
}
