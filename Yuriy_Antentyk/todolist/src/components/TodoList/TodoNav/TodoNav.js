import React from 'react'
import { pure } from 'recompose'

import bem from '../../../helpers/bem'

import './TodoNav.scss'
import '../../../css/bem/button.scss'

const buttonBem = bem('button')
const navBem = bem('todoNav')

const TodoNav = ({
  onCheckAllTodos,
  onUncheckAllTodos,
  onDeleteSelectedTodos,
}) => (
  <div className={navBem()}>
    <button
      onClick={onCheckAllTodos}
      className={[buttonBem(), navBem({ element: 'item' })].join(' ')}
    >
      Check all
    </button>
    <button
      onClick={onUncheckAllTodos}
      className={[buttonBem(), navBem({ element: 'item' })].join(' ')}
    >
      Uncheck all
    </button>
    <button
      onClick={onDeleteSelectedTodos}
      className={[buttonBem(), navBem({ element: 'item' })].join(' ')}
    >
      Delete Selected
    </button>
  </div>
)

const enhancer = pure

export default enhancer(TodoNav)
