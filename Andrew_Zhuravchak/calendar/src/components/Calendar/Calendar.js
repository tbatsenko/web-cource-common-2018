import React, { Component } from 'react'
import './Calendar.scss'
import './Day.scss'


export class Calendar extends Component {
  constructor(props) {
    super(props)

    let actualDate = new Date()

    this.state = {
      month: actualDate.getMonth(),
      year: actualDate.getFullYear(),
      active_day_number: null
    }

    this.days_of_week = ['mo', 'tu', 'wd', 'th', 'fr', 'sa', 'su']
  }

  setActiveDayNumber(day_number){
    this.setState({
      active_day_number: day_number
    })
  }

  getCalendarDays() {
    let first_day = new Date(this.state.year, this.state.month, 1)
    const last_day = new Date(this.state.year, this.state.month + 1, 0)

    let calendar_days = Array.from(Array(first_day.getDay() - 1), () => 0)

    while (first_day <= last_day) {
      calendar_days.push(new Date(first_day).getDate())
      first_day.setDate(first_day.getDate() + 1)
    }

    return calendar_days
  }


  render() {
    return (
      <div className="Calendar">
        <div className="Calendar__title">December 2018</div>

        <div className="Calendar__days-of-week">
          {this.days_of_week.map((day) => <div className='day day--week' key={day}>{day}</div>)}
        </div>

        <div className="Calendar__days">
          {this.getCalendarDays().map((day_number) =>
            (day_number !== 0) ?
              <div className={'day day--number ' +  ((this.state.active_day_number === day_number) ? 'day--number-active' : '')}
                   onClick={this.setActiveDayNumber.bind(this, day_number)}
                   key={day_number}>{day_number}</div> :
              <div className='day day--number'/>,
          )}
        </div>
      </div>
    )
  }
}