import { calendarDaysList, getCalendarDays } from './heplers/date'
import { addMonths } from 'date-fns'

export default class Calendar {
  constructor(block_id) {
    this.block = document.getElementById(block_id)
    this.tasks = []
    this.currentDisplayDate = new Date()
    this.currentDate = new Date()

    this.render()
  }

  getTasksForDate(date) {
    return []
  }

  shiftDisplayedMonth(monthsNumber) {
    this.currentDisplayDate = addMonths(this.currentDisplayDate, monthsNumber)

    this.render()
  }

  render() {
    const calendarWeeksWithDays = getCalendarDays(this.currentDisplayDate)

    this.block.innerHTML = `
      <table class="calendar">
          <thead class="calendar__header">
            <tr>
                ${calendarDaysList.map((dayLabel) => `
                  <td class="calendar__header-day">${dayLabel}</td>
                `)}
            </tr>
          </thead>
      
          <colgroup>
              <col width="220px" span="7">
          </colgroup>
      
          <tbody class="calendar__body">
          
          ${calendarWeeksWithDays.map((week) => `
           
              <tr>
                ${week.map(day => `
                    <td class="calendar__cell ${!day ? 'calendar__cell--empty' : ''}">
                        <div class="day">
                          <ul class="day__schedule-list">
                            ${this.getTasksForDate(day).map(task => `
                            
                                ${task.empty ? `<li class="schedule-item schedule-item--empty"></li>`
      : `<li class="schedule-item
                                          ${task.notification ? `schedule-item__notification schedule-item__notification--${task.type}">`
        : `schedule-item__task schedule-item__task--${task.type}">`}
                                          ${task.text}
                                        </li>`
      }                            
                            `)}
                            </ul>
                            
                          <time class="day__number ${(day && day === this.currentDate) ? `day__number--current` : ``}"
                                datetime="${day}">${(day) ? day.getDate() : ''}</time>
                      </div>
                    </td>  
              `)}      
            </tr>
          `)}
      
          </tbody>
      </table>
      
      <button class="action-btn">+</button>
    `
  }

}