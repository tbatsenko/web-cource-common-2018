import React, { Component } from 'react'

import './calendar.css'


class Calendar extends Component {
  monthList = ['Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
    'Nov', 'Dec']

  state = (localStorage.getItem('calendarJS')) ? JSON.parse(localStorage.getItem('calendarJS')) : {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
  }

  calendarUpdate() {
    if (localStorage.getItem('calendarJS')) localStorage.removeItem('calendarJS')
    localStorage.setItem('calendarJS', JSON.stringify(this.state))
  }

  handleClickLeft = () => {
    this.setState({
      currentMonth: (this.state.currentMonth === 0) ?
        11 : this.state.currentMonth - 1,
      currentYear: (this.state.currentMonth === 0) ?
        this.state.currentYear - 1 :
        this.state.currentYear,
    })

    this.calendarUpdate()
  }

  handleClickRight = () => {
    this.setState({
      currentMonth: (this.state.currentMonth + 1) % 12,
      currentYear: (this.state.currentMonth === 11) ?
        this.state.currentYear + 1 :
        this.state.currentYear,
    })

    this.calendarUpdate()
  }

  render() {
    let monthName = this.monthList[this.state.currentMonth] + this.state.currentYear
    let first = new Date(this.state.currentMonth, this.state.currentYear).getDay()
    let daysInMonth = 32 - new Date(this.state.currentYear, this.state.currentMonth, 32).getDate()

    let allDays = []

    for (let i = -first; i <= daysInMonth; i++) {
      if (i < 1) {
        allDays.push(<a className="dates__day" href="#"></a>)
      } else allDays.push(<a className="dates__day" href="#">{i}</a>)
    }

    let Day = allDays.map((item) => item)


    return (
      <div className="calendar">
        <header className="calendar__header">
          <h1 id="months-name" className="calendar__month-name">{monthName}</h1>
        </header>
        <main className="calendar__contents">
          <header className="calendar__weekdays">
            <a className="weekdays__day" href="#">Sun</a>
            <a className="weekdays__day" href="#">Mon</a>
            <a className="weekdays__day" href="#">Tue</a>
            <a className="weekdays__day" href="#">Wed</a>
            <a className="weekdays__day" href="#">Thu</a>
            <a className="weekdays__day" href="#">Fri</a>
            <a className="weekdays__day" href="#">Sat</a>
          </header>
          <main id="dates" className="calendar__dates">
            {Day}
          </main>
        </main>
        <form className="calendar__buttons">
          <button id="previous" className="buttons buttons_left" onClick={this.handleClickLeft}>Previous
          </button>
          <button id="next" className="buttons buttons_right" onClick={this.handleClickRight}>Next</button>
        </form>
      </div>
    )
  }
}

export default Calendar