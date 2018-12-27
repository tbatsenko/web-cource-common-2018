import React from 'react'
import Axios from 'axios'

import immutable from 'immutable'

import Calendar from '../Calendar/Calendar'
import TodoList from '../TodoList/TodoList'

import { retrieveDateFromUrlString, hashDate } from '../../helpers/date'
import rest from '../../helpers/rest'
import getDbHost from '../../helpers/db'
import bem from '../../helpers/bem'

import {
  withState,
  compose,
  withProps,
  lifecycle,
  branch,
  renderComponent,
} from 'recompose'

import './App.scss'
import '../../columnGridLayout/columnGridLayout.scss'
import Day from '../Day'

const columnGridLayout = bem('grid-12')

const todoRest = rest(getDbHost())('todos')

const getTodos = async date => {
  const response = await Axios.get(
    todoRest.get({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    })
  )

  return response.data.map(todoDbRepresentation => ({
    id: todoDbRepresentation.id,
    text: todoDbRepresentation.text,
    checked: false,
  }))
}

const App = ({
  date,
  todos,
  dateHash,

  onDeleteTodo,
  onChangeDate,
  onAddTodo,
  onCheckAllTodos,
  onUncheckAllTodos,
  onDeleteSelectedTodos,
  onToggleTodo,
}) => (
  <div className={columnGridLayout({ highlight: true })}>
    <div className={columnGridLayout({ element: 'grid-6' })}>
      <Calendar
        date={date}
        onChangeDate={onChangeDate}
        children={day => (
          <Day activeDay={date} onSelect={onChangeDate} date={day} />
        )}
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

const enhancer = compose(
  withState('todos', 'setTodos', new immutable.Map()),
  withState('date', 'setDate', new Date()),
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
      } = this.props

      const data = await getTodos(date)
      setTodos(todos.set(hashDate(date), immutable.List.of(...data)))

      window.history.replaceState(
        { date },
        date.toISOString(),
        date.toISOString()
      )

      // this.stateChangeEventListener = window.addEventListener('popstate', ev =>
      //   onChangeDate(ev.state.date)
      // )

      setDate(retrieveDateFromUrlString(window.location.href))
      setDateHash(hashDate(date))
    },

    componentWillUnmount() {
      // this.stateChangeEventListener.removeEventListener()
    },
  }),

  branch(
    ({ todos, dateHash }) => !todos.has(dateHash),
    renderComponent(() => <div>Loading</div>)
  )
)

export default enhancer(App)
