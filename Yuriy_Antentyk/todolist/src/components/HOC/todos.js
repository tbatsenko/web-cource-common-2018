import {
  compose,
  withState,
  withProps,
  branch,
  withPropsOnChange,
  renderComponent,
} from 'recompose'
import { format } from 'date-fns'

import Loading from '../Loading'

import rest from '../../helpers/rest'

const _todosRest = rest(
  `${process.env.REACT_APP_DB_HOST}:${process.env.REACT_APP_DB_PORT}`
)(process.env.REACT_APP_TODOS_ENDPOINT)

const _formatString = 'MM DD YYYY'
const _todosMap = new Map()

const _setCheckValueForAllTodos = checkValue => date =>
  _todosMap
    .get(format(date, _formatString))
    .forEach(todo => (todo.checked = checkValue))

const enhancer = compose(
  withState('todos', 'setTodos', undefined),
  withPropsOnChange(['date'], async ({ date, setTodos }) => {
    if (date === undefined) return {}

    if (_todosMap.has(format(date, _formatString))) {
      setTodos(_todosMap.get(format(date, _formatString)))
      return {}
    }

    const response = await fetch(
      _todosRest.get({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
      })
    )
    const todosDbRepresentation = await response.json()

    const todosAppRepresentation = todosDbRepresentation.map(
      todoDbRepresentation => ({
        id: todoDbRepresentation.id,
        text: todoDbRepresentation.text,
        checked: false,
      })
    )

    _todosMap.set(format(date, _formatString), todosAppRepresentation)

    setTodos(todosAppRepresentation)

    return {}
  }),
  branch(({ todos }) => todos === undefined, renderComponent(Loading)),
  withProps(({ date, todos, setTodos }) => ({
    onAddTodo: async text => {
      const todo = {
        text: text,
        id: new Date().getTime(),
        checked: false,
      }
      const todoDbRepresentation = {
        text: todo.text,
        id: todo.id,
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      }

      await fetch(_todosRest.post(), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoDbRepresentation),
      })

      _todosMap.get(format(date, _formatString)).push(todo)

      setTodos(_todosMap.get(format(date, _formatString)))
    },

    onDeleteTodo: async id => {
      await fetch(_todosRest.delete(id), { method: 'DELETE' })

      _todosMap.set(
        format(date, _formatString),
        _todosMap
          .get(format(date, _formatString))
          .filter(todo => todo.id !== id)
      )

      setTodos(_todosMap.get(format(date, _formatString)))
    },
    onDeleteSelectedTodos: async id => {
      for (let todo of todos.filter(todo => todo.checked))
        await fetch(_todosRest.delete(todo.id), { method: 'DELETE' })

      todos = todos.filter(todo => !todo.checked)
      _todosMap.set(format(date, _formatString), todos)
      setTodos(todos)
    },

    onToggleTodo: id => {
      todos.forEach(
        todo =>
          (todo.checked = todo.id === id ? todo.checked ^ true : todo.checked)
      )

      _todosMap.set(format(date, _formatString), todos)

      setTodos(todos)
    },

    onCheckAllTodos: () => {
      _setCheckValueForAllTodos(true)(date)
      setTodos(_todosMap.get(format(date, _formatString)))
    },
    onUncheckAllTodos: () => {
      _setCheckValueForAllTodos(false)(date)
      setTodos(_todosMap.get(format(date, _formatString)))
    },
  }))
)

export default enhancer
