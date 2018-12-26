import React from 'react'
import Axios from 'axios'

import immutable from 'immutable'

import Calendar from '../Calendar/Calendar'
import TodoList from '../TodoList/TodoList'

import { retrieveDateFromUrlString, hashDate } from '../../helpers/date'
import getDbHost from '../../helpers/db'
import bem from '../../helpers/bem'

import './App.scss'

const dbHost = getDbHost()
const appBem = bem('app')

export default class App extends React.Component {
  state = {
    todos: new immutable.Map(),
    date: new Date(),
  }

  constructor(props) {
    super(props)
    this.state.date = retrieveDateFromUrlString(window.location.href)
    this.dateHash = hashDate(this.state.date)
  }

  componentDidMount() {
    this._getTodos(this.state.date).then(data =>
      this.setState({
        todos: this.state.todos.set(
          hashDate(this.state.date),
          immutable.List.of(...data)
        ),
      })
    )

    this.stateChangeEventListener = window.addEventListener('popstate', ev =>
      this.changeDate(ev.state.date)
    )
  }
  componentWillUnmount() {
    this.stateChangeEventListener.removeEventListener()
  }

  _getTodos = async date =>
    await Axios.get(
      `${dbHost}todos?year=${date.getFullYear()}&month=${date.getMonth()}&date=${date.getDate()}`
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

    Axios.post(`${dbHost}todos`, todoDbRepresentation).then(() => {
      this.setState({
        todos: this.state.todos.set(
          this.dateHash,
          this.state.todos.get(this.dateHash).push(todoAppRepresentation)
        ),
      })
    })
  }

  _setCheckedForAllTodos = checkValue => {
    this.setState({
      todos: this.state.todos.set(
        this.dateHash,
        this.state.todos.get(this.dateHash).reduce((accum, todo) => {
          todo.checked = checkValue
          return accum.push(todo)
        }, new immutable.List())
      ),
    })
  }
  checkAllTodos = () => this._setCheckedForAllTodos(true)
  uncheckAllTodos = () => this._setCheckedForAllTodos(false)

  deleteSelectedTodos = () => {
    Promise.all(
      this.state.todos
        .get(this.dateHash)
        .filter(todo => todo.checked)
        .map(todo => Axios.delete(`${dbHost}todos/${todo.id}`))
    ).then(() =>
      this.setState({
        todos: this.state.todos.set(
          this.dateHash,
          this.state.todos.get(this.dateHash).filter(todo => !todo.checked)
        ),
      })
    )
  }

  toggleTodo = id => {
    this.setState({
      todos: this.state.todos.set(
        this.dateHash,
        this.state.todos.get(this.dateHash).reduce((accum, todo) => {
          todo.checked = todo.checked ^ (todo.id === id)
          return accum.push(todo)
        }, new immutable.List())
      ),
    })
  }
  deleteTodo = id => {
    Axios.delete(`${dbHost}todos/${id}`).then(() =>
      this.setState({
        todos: this.state.todos.set(
          this.dateHash,
          this.state.todos.get(this.dateHash).filter(todo => todo.id !== id)
        ),
      })
    )
  }

  changeDate = newDate => {
    this.dateHash = hashDate(newDate)

    if (this.state.todos.has(this.dateHash))
      return this.setState({ date: newDate })

    this._getTodos(newDate).then(data => {
      this.setState({
        date: newDate,
        todos: this.state.todos.set(this.dateHash, immutable.List.of(...data)),
      })

      window.history.pushState(
        { date: newDate },
        newDate.toISOString(),
        newDate.toISOString()
      )
    })
  }

  render() {
    const { todos, date } = this.state

    if (!todos.has(this.dateHash)) return <div>Loading</div>

    return (
      <div className={appBem()}>
        <div className={appBem({ element: 'calendar' })}>
          <Calendar onChangeDate={this.changeDate} date={date} />
        </div>
        <div className={appBem({ element: 'todoList' })}>
          <TodoList
            onAddTodo={this.addTodo}
            onDeleteTodo={this.deleteTodo}
            onToggleTodo={this.toggleTodo}
            onCheckAllTodos={this.checkAllTodos}
            onUncheckAllTodos={this.uncheckAllTodos}
            onDeleteSelectedTodos={this.deleteSelectedTodos}
            todos={todos.get(this.dateHash)}
          />
        </div>
      </div>
    )
  }
}
