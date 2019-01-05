import React from 'react'
import { compose, pure } from 'recompose'
import { format } from 'date-fns'

import holidayEnhancer from '../../HOC/holiday'
import todosEnhancer from "../../HOC/todos"

import bem from '../../../helpers/bem'

import '../TodoList.scss'
import '../../../css/bem/header.scss'

const todoListBem = bem('todoList')
const headerBem = bem('header')

const Header = ({ date, holiday }) => (
  <h1 className={[todoListBem({ element: 'header' }), headerBem()].join(' ')}>
    {format(date, 'dddd, Do of MMMM, YYYY') + (holiday ? ', ' + holiday : '')}
  </h1>
)

const enhancer = compose(
  pure,
  holidayEnhancer,
  todosEnhancer
)

export default enhancer(Header)
