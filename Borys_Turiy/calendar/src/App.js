import Calendar from './modules/Calendar'
import CalendarRenderer from './modules/calRenderer'

setInterval(() => {
  let workCalendar = new Calendar(new Date())
  let renderer = new CalendarRenderer(workCalendar)
  renderer.renderHorizontal()
}, 1000 )

document.body.addEventListener('click', e => {
  console.log(e)
  document.getElementById(e.target.id).classList.add('Calendar__cell--clicked')
})
