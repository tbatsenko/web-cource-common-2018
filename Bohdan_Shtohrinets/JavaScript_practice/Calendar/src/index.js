import Calendar from './calendar'


let calendar = new Calendar()
calendar.calendarUpdate()
calendar.render()

document.getElementById("next").addEventListener('click', () => {
  calendar.year = (calendar.month === 11) ? calendar.year + 1 : calendar.year
  calendar.month = (calendar.month + 1) % 12
  calendar.calendarUpdate()
  calendar.render()
})

document.getElementById("previous").addEventListener('click', () => {
  calendar.year = (calendar.month === 0) ? calendar.year - 1 : calendar.year
  calendar.month = (calendar.month === 0) ? 11 : calendar.month - 1
  calendar.calendarUpdate()
  calendar.render()
})
