class CalendarRenderer {
  constructor(calendar) {
    this.calendar = calendar
    this.html = ``
  }

  static horizontalWeekDays() {
    let week = [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`]
    return `<div class="Calendar__row">
    ${week
      .map(
        s => `<div class="Calendar__cell Calendar__cell--weekday">${s}</div>`
      )
      .join('')}
    </div>`
  }

  renderHorizontal() {
    this.html = `<div id="Calendar">`
    this.html += CalendarRenderer.horizontalWeekDays()
    let firstDayOfWeek = new Date(this.calendar.firstDayOfCalendar)
    for (let week = 1; week <= 6; week++) {
      this.html += CalendarRenderer.renderWeek(
        this.calendar.getWeek(firstDayOfWeek)
      )
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 7)
    }
    this.html += `</div>`
    document.body.innerHTML = this.html
  }

  static renderWeek(week) {
    return `<div class="Calendar__row">
    ${Array(7)
      .fill()
      .map((_, i) => week[i].represent())
      .join('')}

    </div>`
  }
}
export default CalendarRenderer
