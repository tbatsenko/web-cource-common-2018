import React from 'react'

import {
  getWeekDayName,
  getMonthName,
  makeOrdinal,
} from '../../../helpers/js/date'

import bem from '../../../helpers/js/bem'

import '../TodoList.scss'
import '../../../helpers/css/header.scss'

const todoListBem = bem('todoList')
const headerBem = bem('header')

const Header = ({ date, holiday }) => {
  const headerText = [
    getWeekDayName(date),
    [makeOrdinal(date.getDate()), 'of', getMonthName(date)].join(' '),
    date.getFullYear(),
  ]
    .concat(holiday ? [holiday] : [])
    .join(', ')

  return (
    <h1 className={[todoListBem({ element: 'header' }), headerBem()].join(' ')}>
      {headerText}
    </h1>
  )
}

export default Header
