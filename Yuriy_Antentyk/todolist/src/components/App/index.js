import { retrieveDateFromUrlString, hashDate } from '../../helpers/js/date'

import {
  compose,
  pure,
  withState,
  withProps,
  branch,
  renderComponent,
  lifecycle,
} from 'recompose'
import Axios from 'axios'

import App from './App'
import Loading from '../Loading'

import getDbHost from '../../helpers/js/db'
import rest from '../../helpers/js/rest'

const todoRest = rest(getDbHost())('todos')

const setCheckedForAllTodos = (date, todos, setTodos) => checkValue => {
  console.log('Hello')

  todos.get(hashDate(date)).forEach(todo => (todo.checked = checkValue))
  setTodos(todos)
}

const getTodos = async date => {
  const response = await Axios.get(
    todoRest.get({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    })
  )

  const data = response.data

  return data.map(todoDbRepresentation => ({
    id: todoDbRepresentation.id,
    text: todoDbRepresentation.text,
    checked: false,
  }))
}

const enhancer = compose(
  pure,
  withState('date', 'setDate', retrieveDateFromUrlString(window.location.href)),
  withState('todos', 'setTodos', new Map()),
  withProps(({ date, setDate, todos, setTodos }) => ({
    checkAllTodos: () => setCheckedForAllTodos(date, todos, setTodos)(true),
    uncheckAllTodos: () => setCheckedForAllTodos(date, todos, setTodos)(false),

    addTodo: text => {
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

      Axios.post(todoRest.post(), todoDbRepresentation).then(() => {
        todos.get(hashDate(date)).push(todoAppRepresentation)
        setTodos(todos)
      })
    },

    deleteTodo: id =>
      Axios.delete(todoRest.delete(id)).then(() => {
        todos.set(
          hashDate(date),
          todos.get(hashDate(date)).filter(todo => todo.id !== id)
        )
        setTodos(todos)
      }),

    toggleTodo: id => {
      todos.get(hashDate(date)).forEach(todo => {
        if (todo.id === id) todo.checked = todo.checked ? false : true
      })

      setTodos(todos)
    },

    deleteSelectedTodos: () =>
      Promise.all(
        todos
          .get(hashDate(date))
          .filter(todo => todo.checked)
          .map(todo => Axios.delete(todoRest.delete(todo.id)))
      ).then(() => {
        todos.set(
          hashDate(date),
          todos.get(hashDate(date)).filter(todo => !todo.checked)
        )
        setTodos(todos)
      }),

    onChangeDate: newDate => {
      if (todos.has(hashDate(newDate))) return setDate(newDate)

      getTodos(newDate).then(data => {
        todos.set(hashDate(newDate), data)

        setTodos(todos)
        setDate(newDate)
      })
    },
  })),
  lifecycle({
    componentDidMount() {
      const { date, todos, setTodos } = this.props

      getTodos(date).then(data => {
        todos.set(hashDate(date), data)
        setTodos(todos)
      })
    },
  }),
  branch(
    ({ todos, date }) => !todos.has(hashDate(date)),
    renderComponent(Loading)
  )
)

export default enhancer(App)
