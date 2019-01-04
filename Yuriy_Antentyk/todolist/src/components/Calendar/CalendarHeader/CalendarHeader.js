import React from 'react'
import { pure } from 'recompose'

import { format } from 'date-fns'
import bem from '../../../helpers/bem'

import '../Calendar.scss'
import '../../../css/bem/button.scss'
import '../../../css/bem/header.scss'

const calendarBem = bem('calendar')
const buttonBem = bem('button')
const headerBem = bem('header')

const CalendarHeader = ({ date, onIncrementMonth, onDecrementMonth }) => (
  <div className={calendarBem({ element: 'header' })}>
    <button className={buttonBem()} title="Backward" onClick={onDecrementMonth}>
      &lt;
    </button>
    <h1
      className={[calendarBem({ element: 'header-title' }), headerBem()].join(
        ' '
      )}
    >
      {format(date, 'MMMM, YYYY')}
    </h1>
    <button className={buttonBem()} title="Forward" onClick={onIncrementMonth}>
      &gt;
    </button>
  </div>
)

const enhancer = pure

export default enhancer(CalendarHeader)
