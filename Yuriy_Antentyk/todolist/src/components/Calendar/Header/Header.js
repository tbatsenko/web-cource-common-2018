import React from 'react'

import { getMonthName } from '../../../helpers/js/date'
import bem from '../../../helpers/js/bem'

import '../calendar.scss'
import '../../../helpers/css/button.scss'
import '../../../helpers/css/header.scss'

const calendarBem = bem('calendar')
const buttonBem = bem('button')
const headerBem = bem('header')

const Header = ({ date, onIncrementMonth, onDecrementMonth }) => {
  const headerText = [getMonthName(date), date.getFullYear()].join(', ')

  return (
    <div className={calendarBem({ element: 'header' })}>
      <button
        className={buttonBem()}
        title="Backward"
        onClick={onDecrementMonth}
      >
        &lt;
      </button>
      <h1
        className={[calendarBem({ element: 'header-title' }), headerBem()].join(
          ' '
        )}
      >
        {headerText}
      </h1>
      <button
        className={buttonBem()}
        title="Forward"
        onClick={onIncrementMonth}
      >
        &gt;
      </button>
    </div>
  )
}

export default Header
