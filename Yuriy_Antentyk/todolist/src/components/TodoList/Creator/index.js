import { compose, pure, withHandlers, withProps, withState } from 'recompose'

import Creator from './Creator'

const enhancer = compose(
  pure,
  withState('errorMessage', 'setErrorMessage', null),
  withState('todoTextInput', 'setTodoTextInput'),
  withProps(() => ({
    validateTodoTextInput: text => text.trim() !== '',
  })),
  withHandlers({
    onAddTodo: ({
      todoTextInput,
      validateTodoTextInput,
      onAddTodo,
      setErrorMessage,
    }) => ev => {
      ev.preventDefault()
      if (validateTodoTextInput(todoTextInput.value)) {
        onAddTodo(todoTextInput.value)
        todoTextInput.value = ''
      } else setErrorMessage('Todo text fied does not match desired format!')
    },
    onTodoTextInputChange: ({ setErrorMessage }) => ev => setErrorMessage(null),
  })
)

export default enhancer(Creator)
