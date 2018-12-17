import EventsHolder from './EventsHolder.js'
import CalendarDay from './calDay'

class Calendar {
  constructor(date) {
    this.currentDate = date
    this.currentMonth = date.getMonth()
    this.first_week_day = 'Monday'
    this.eventsHolder = new EventsHolder()
    let firstDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    )
    let firstDayOfCalendar
    if (this.first_week_day === 'Monday') {
      let day = firstDayOfMonth.getDay() || 7
      firstDayOfCalendar = new Date(firstDayOfMonth)
      if (day !== 1) firstDayOfCalendar.setHours(-24 * (day - 1))
    }
    this.firstDayOfCalendar = new Date(firstDayOfCalendar)
    this.fillDays()
  }
  fillDays() {
    console.log(this.firstDayOfCalendar)
    this.days = {}
    let date = new Date(this.firstDayOfCalendar)
    for (let count = 1; count <= 42; count++) {
      this.days[date] = new CalendarDay(
        this,
        new Date(date),
        this.getEvents(date)
      )
      date.setDate(date.getDate() + 1)
    }
  }
  getDay(date) {
    return this.days[date]
  }
  getWeek(weekFirstDate) {
    let resultWeek = []
    let date = new Date(weekFirstDate)
    for (let count = 1; count <= 7; count++) {
      resultWeek.push(this.days[date])
      date.setDate(date.getDate() + 1)
    }
    return resultWeek
  }

  addEvent(name, start, end, description) {
    this.eventsHolder.addEvent(name, start, end, description)
  }

  doneEvent(name) {
    this.eventsHolder.doneEvent(name)
  }
  getEvents(date) {
    return this.eventsHolder.getEvents(date)
  }
}
export default Calendar
