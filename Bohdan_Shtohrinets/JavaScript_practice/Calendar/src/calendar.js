class Calendar {
  constructor() {
    this._calendarData = (localStorage.getItem('calendarJS')) ? JSON.parse(localStorage.getItem('calendarJS')) : {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    }

    this._monthList = ['Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
      'Nov', 'Dec']
  }

  calendarUpdate() {
    if (localStorage.getItem('calendarJS')) localStorage.removeItem('calendarJS')
    localStorage.setItem('calendarJS', JSON.stringify(this._calendarData))
  }

  get month() {
    return this._calendarData.currentMonth
  }

  get year() {
    return this._calendarData.currentYear
  }

  set month(newMonths) {
    this._calendarData.currentMonth = newMonths
  }

  set year(newYear) {
    this._calendarData.currentYear = newYear
  }

  render() {
    let monthName = document.getElementById('months-name')
    monthName.innerText = `${this._monthList[this._calendarData.currentMonth]} ${this._calendarData.currentYear}`

    let dates = document.getElementById('dates')
    dates.innerHTML = ''

    let first = new Date(this._calendarData.currentMonth, this._calendarData.currentYear).getDay()
    let daysInMonth = 32 - new Date(this._calendarData.currentYear, this._calendarData.currentMonth, 32).getDate()

    for (let i = -first; i <= daysInMonth; i++) {
      if (i < 1) {
        dates.innerHTML += `<a class="dates__day" href="#"></a>`
      } else dates.innerHTML += `<a class="dates__day" href="#">${i}</a>`
    }
  }
}

export default Calendar