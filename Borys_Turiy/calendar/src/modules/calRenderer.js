class CalendarRenderer {
  constructor(calendar) {
    this.calendar = calendar
    this.html = ``
  }


  static horizontalWeekDays() {
    let html = `<div class="Calendar__row">`
    let week = [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`]
    week.forEach(function(s) {
      html += `<div class="Calendar__cell Calendar__cell--weekday">
${s}
</div>`
    })
    html += `</div>`
    return html
  }

  renderHorizontal() {
    this.html = `<div id="Calendar">`
    this.html += CalendarRenderer.horizontalWeekDays()
    let firstDayOfWeek = new Date(this.calendar.firstDayOfCalendar)
    for (let week = 1; week <= 6; week++) {
      this.html += CalendarRenderer.renderWeek(this.calendar.getWeek(firstDayOfWeek))
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 7)
    }
    this.html += `</div>`
    document.body.innerHTML = this.html
  }

  static renderWeek(week) {
    let weekHtml = `<div class="Calendar__row">`
    for (let counter = 0; counter <= 6; counter += 1) {
      weekHtml += week[counter].represent()
    }

    weekHtml += `
</div>`
    return weekHtml
  }
}
export default CalendarRenderer