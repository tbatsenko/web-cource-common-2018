import React, { Component } from 'react'

import { setDate, addMonths } from 'date-fns'
import { getCalendarDays } from '../../helpers/date'

import PropTypes from 'prop-types'

import './Calendar.scss'
import './Day.scss'
import CalendarBody from './CalendarBody'

class Calendar extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  }

  static defaultProps = {
    date: new Date(),
  }

  daysOfWeek = ['mo', 'tu', 'wd', 'th', 'fr', 'sa', 'su']

  setActiveDate = date => {
    this.props.onChange(date)
  }

  setNextMonth = () => {
    this.props.onChange(addMonths(this.props.date, 1))
  }

  setPrevMonth = () => {
    this.props.onChange(addMonths(this.props.date, -1))
  }

  render() {
    const { date, children } = this.props

    return (
      <div className="Calendar">
        <div className="Calendar__header">
          <button
            className="Calendar__header-arrow"
            onClick={this.setPrevMonth}
          >
            ←
          </button>
          <h3 className="Calendar__header-title">
            {date.toLocaleString('en-us', { month: 'long' })}{' '}
            {date.getFullYear()}
          </h3>
          <button
            className="Calendar__header-arrow"
            onClick={this.setNextMonth}
          >
            →
          </button>
        </div>

        <div className="Calendar__days-of-week">
          {this.daysOfWeek.map(day => (
            <div className="day day--week" key={day}>
              {day}
            </div>
          ))}
        </div>
        <CalendarBody activeDate={date} onSelectDate={this.setActiveDate}>
          {date => children(date)}
        </CalendarBody>
      </div>
    )
  }
}

export default Calendar
