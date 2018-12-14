import React, { Component } from 'react'
import './Calendar.scss'
import './Day.scss'


export class Calendar extends Component {

  daysInMonth(iMonth, iYear) {
    return 32 - new Date(iMonth, iYear).getDate()
  }


  render() {
    const days_of_week = ['mn', 'tu', 'wd', 'th', 'fr', 'sa', 'su']

    let actualDate = new Date()

    let days = [...Array(this.daysInMonth(actualDate.getMonth(), actualDate.getFullYear())).keys()];

    return (
      <div className="Calendar">
        <div className="Calendar__title">December 2018</div>

        <div className="Calendar__days-of-week">
          {days_of_week.map((day) => <div className='day day--week' key={day}>{day}</div>)}
        </div>

        <div className="Calendar__days">
          {days.map((day_number) => <div className='day day--number' key={day_number}>{day_number}</div>)}
        </div>
      </div>
    )
  }
}