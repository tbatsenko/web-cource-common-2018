import React from 'react'

import bem from '../../../helpers/js/bem'

import './creator.scss'
import '../../../helpers/css/textInput.scss'
import '../../../helpers/css/button.scss'

const buttonBem = bem('button')
const creatorBem = bem('creator')
const textInputBem = bem('textInput')

const Creator = ({ onAddTodo, onTodoTextInputChange, setTodoTextInput, errorMessage }) => (
  <div className={creatorBem()}>
    <form onSubmit={onAddTodo}>
      <label className={creatorBem({ element: 'form' })}>
        <input
          type="text"
          ref={setTodoTextInput}
          onChange={onTodoTextInputChange}
          className={[
            textInputBem(),
            creatorBem({ element: 'textInput' }),
          ].join(' ')}
        />
        <button type="submit" className={[buttonBem(), creatorBem({element: "submit"})].join(" ")}>
          Submit
        </button>
      </label>
    </form>
    {errorMessage ? <p className={creatorBem({element: "errorMessage"})}>{errorMessage}</p> : null}
  </div>
)

export default Creator
