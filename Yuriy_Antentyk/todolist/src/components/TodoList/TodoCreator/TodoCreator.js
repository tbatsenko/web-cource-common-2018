import React from 'react'
import { compose, pure, withHandlers, withState } from 'recompose'

import bem from "../../../helpers/bem"

import './TodoCreator.scss'
import '../../../css/bem/textInput.scss'
import '../../../css/bem/button.scss'

const buttonBem = bem('button')
const todoCreatorBem = bem('todoCreator')
const textInputBem = bem('textInput')

const TodoCreator = ({
  onAddTodo,
  onTodoTextInputChange,
  setTodoTextInput,
  errorMessage,
}) => (
  <div className={todoCreatorBem()}>
    <form onSubmit={onAddTodo}>
      <label className={todoCreatorBem({ element: 'form' })}>
        <input
          type="text"
          ref={setTodoTextInput}
          onChange={onTodoTextInputChange}
          className={[
            textInputBem(),
            todoCreatorBem({ element: 'textInput' }),
          ].join(' ')}
        />
        <button
          type="submit"
          className={[buttonBem(), todoCreatorBem({ element: 'submit' })].join(' ')}
        >
          Submit
        </button>
      </label>
    </form>
    {errorMessage ? (
      <p className={todoCreatorBem({ element: 'errorMessage' })}>{errorMessage}</p>
    ) : null}
  </div>
)

const _validateTodoTextInput = text => text.trim() !== ''

const enhancer = compose(
  pure,
  withState('errorMessage', 'setErrorMessage', undefined),
  withState('todoTextInput', 'setTodoTextInput'),
  withHandlers({
    onAddTodo: ({ todoTextInput, onAddTodo, setErrorMessage }) => ev => {
      ev.preventDefault()
      if (_validateTodoTextInput(todoTextInput.value)) {
        onAddTodo(todoTextInput.value)
        todoTextInput.value = ''
      } else setErrorMessage('Todo text fied does not match desired format!')
    },
    onTodoTextInputChange: ({ setErrorMessage }) => ev => setErrorMessage(null),
  })
)

export default enhancer(TodoCreator)
