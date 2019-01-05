import EventsHolder from './EventsHolder'

class CalendarDay {
  constructor(calendar, date, events) {
    if (events !== undefined)
      this.events = events
    else
      this.events = new EventsHolder()
    this.date = date
    this.calendar = calendar
  }
  represent(){
    let htmlResult = ``
    if (this.calendar.currentDate.getMonth() !== this.date.getMonth())
      htmlResult += `
      <div class="Calendar__cell Calendar__cell--other_month">${this.renderDay()}</div>
    `
    else if (this.calendar.currentDate.getDate() === this.date.getDate()) {
      htmlResult += `
      <div class="Calendar__cell Calendar__cell--current_day">${this.renderDay()}</div>
    `
    }
    else {
      htmlResult += `
      <div class="Calendar__cell Calendar__cell--current_month">${this.renderDay()}</div>
    `
  }
  return htmlResult
}

  renderDay() {
    let result = `<time id='${this.date.toISOString().substring(0, 10)}' datetime='${this.date.toISOString().substring(0, 10)}'>${this.date.getDate()}`
    if(this.events.events !== undefined)
      result += this.events.forEach(e => e.name + e.status)
    result += `</time>`
    return result

  }
}
export default CalendarDay