import React from 'react'

import bem from '../../../helpers/js/bem'
import {isWeekEnd} from "../../../helpers/js/date"

import './day.scss'

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
        holiday: Boolean(holiday) || isWeekEnd(date),
      })}
      title={holiday ? holiday : null}
      onClick={onChangeDate}
    >
      {date.getDate()}
    </a>
  )
}

export default Day
