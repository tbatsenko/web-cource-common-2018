import React from 'react'
import { compose, pure, withHandlers } from 'recompose'
import { isWeekend } from 'date-fns'

import holidayEnhancer from '../HOC/holiday'

import bem from '../../helpers/bem'

import './Day.scss'

const dayBem = bem('day')

const Day = ({ date, disabled, selected, holiday, onChangeDate }) => {
  if (disabled)
    return <span className={dayBem({ disabled: true })}>{date.getDate()}</span>

  return (
    <a
      href={date.toISOString()}
      className={dayBem({
        disabled: false,
        selected: selected,
        holiday: Boolean(holiday) || isWeekend(date),
      })}
      title={holiday ? holiday : null}
      onClick={onChangeDate}
    >
      {date.getDate()}
    </a>
  )
}

const enhancer = compose(
  pure,
  holidayEnhancer,
  withHandlers({
    onChangeDate: ({ date, onChangeDate }) => ev => {
      ev.preventDefault()
      onChangeDate(date)
    },
  })
)

export default enhancer(Day)
