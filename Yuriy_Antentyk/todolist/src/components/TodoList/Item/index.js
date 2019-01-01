import { compose, pure, withHandlers } from 'recompose'

import Item from './Item'

const enhancer = compose(
  pure,
  withHandlers({
    onDeleteTodo: ({ id, onDeleteTodo }) => ev => {
      ev.preventDefault()
      onDeleteTodo(id)
    },
    onToggleTodo: ({ id, onToggleTodo }) => ev => {
      onToggleTodo(id)
    },
  })
)

export default enhancer(Item)
