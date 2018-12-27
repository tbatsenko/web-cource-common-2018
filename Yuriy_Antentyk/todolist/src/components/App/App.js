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

const sameDate = (lhs, rhs) => {
    return (
        lhs.getFullYear() === rhs.getFullYear() &&
        lhs.getMonth() === rhs.getMonth() &&
        lhs.getDate() === rhs.getDate()
    )
}

import './App.scss'
import '../../columnGridLayout/columnGridLayout.scss'

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

const App = ({
  date,
  todos,
  holidays,
  dateHash,

  onDeleteTodo,
  onChangeDate,
  onAddTodo,
  onCheckAllTodos,
  onUncheckAllTodos,
  onDeleteSelectedTodos,
  onToggleTodo,
}) => {
  const holidaysMap = holidays
    .filter(holiday => holiday.month === date.getMonth())
    .reduce(
      (accum, holiday) => accum.set(holiday.date, holiday.name),
      new immutable.Map()
    )

  return (
    <div className={columnGridLayout({ highlight: true })}>
      <div className={columnGridLayout({ element: 'grid-6' })}>
        <Calendar
          onChangeDate={onChangeDate}
          date={date}
          holidaysMap={holidaysMap}
        />
      </div>
      <div className={columnGridLayout({ element: 'grid-6' })}>
        <TodoList
          onAddTodo={onAddTodo}
          onDeleteTodo={onDeleteTodo}
          onCheckAllTodos={onCheckAllTodos}
          onUncheckAllTodos={onUncheckAllTodos}
          onDeleteSelectedTodos={onDeleteSelectedTodos}
          onToggleTodo={onToggleTodo}
          todos={todos.get(dateHash)}
        />
      </div>
    </div>
  )
}

const enhancer = compose(
  withState('todos', 'setTodos', new immutable.Map()),
  withState('date', 'setDate', new Date()),
  withState('holidays', 'setHolidays'),
  withState('dateHash', 'setDateHash'),

  withProps(({ todos, setTodos, dateHash, date, setDate, setDateHash }) => {
    const setCheckedForAllTodos = checkValue =>
      setTodos(
        todos.set(
          dateHash,
          todos.get(dateHash).reduce((accum, todo) => {
            todo.checked = checkValue
            return accum.push(todo)
          }, new immutable.List())
        )
      )

    return {
      onCheckAllTodos: () => setCheckedForAllTodos(true),
      onUncheckAllTodos: () => setCheckedForAllTodos(false),

      onDeleteSelectedTodos: () => {
        Promise.all(
          todos
            .get(dateHash)
            .filter(todo => todo.checked)
            .map(todo => Axios.delete(todoRest.delete(todo.id)))
        ).then(() => {
          setTodos(
            todos.set(
              dateHash,
              todos.get(dateHash).filter(todo => !todo.checked)
            )
          )
        })
      },

      onToggleTodo: id => {
        setTodos(
          todos.set(
            dateHash,
            todos.get(dateHash).reduce((accum, todo) => {
              todo.checked = todo.checked ^ (todo.id === id)
              return accum.push(todo)
            }, new immutable.List())
          )
        )
      },

      onChangeDate: newDate => {
        if (dateHash === hashDate(newDate)) return

        if (todos.has(hashDate(newDate))) {
          setDate(newDate)
          setDateHash(hashDate(newDate))
        }

        getTodos(newDate).then(data => {
          setDate(newDate)
          setTodos(todos.set(hashDate(newDate), immutable.List.of(...data)))
          setDateHash(hashDate(newDate))

          window.history.pushState(
            { date: newDate },
            newDate.toISOString(),
            newDate.toISOString()
          )
        })
      },

      onAddTodo: async text => {
        const todoAppRepresentation = {
          text: text,
          id: new Date().getTime(),
          checked: false,
        }

        const todoDbRepresentation = {
          text: todoAppRepresentation.text,
          id: todoAppRepresentation.id,
          date: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
        }

        await Axios.post(todoRest.post(), todoDbRepresentation)

        setTodos(
          todos.set(dateHash, todos.get(dateHash).push(todoAppRepresentation))
        )
      },

      onDeleteTodo: id =>
        Axios.delete(todoRest.delete(id)).then(() => {
          setTodos(
            todos.set(
              dateHash,
              todos.get(dateHash).filter(todo => todo.id !== id)
            )
          )
        }),
    }
  }),

  lifecycle({
    async componentDidMount() {
      const {
        date,
        setDate,
        setDateHash,
        onChangeDate,
        todos,
        setTodos,
        setHolidays,
      } = this.props

      const data = await getTodos(date)
      setTodos(todos.set(hashDate(date), immutable.List.of(...data)))

      window.history.replaceState(
        { date },
        date.toISOString(),
        date.toISOString()
      )

      const holidays = await getHolidays()
      setHolidays(immutable.List.of(...holidays))

      this.stateChangeEventListener = window.addEventListener('popstate', ev =>
        onChangeDate(ev.state.date)
      )

      setDate(retrieveDateFromUrlString(window.location.href))
      setDateHash(hashDate(date))
    },

    componentWillUnmount() {
      this.stateChangeEventListener.removeEventListener()
    },
  }),

  branch(
    ({ todos, holidays, dateHash }) => !todos.has(dateHash) || !holidays,
    renderComponent(() => <div>Loading</div>)
  )
)

export default enhancer(App)
