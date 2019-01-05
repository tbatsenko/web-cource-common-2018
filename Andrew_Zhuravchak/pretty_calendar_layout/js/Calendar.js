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
      
      <a href="#newTask" class="action-btn">+</button>
      
      <div class="popup" id="newTask">
        <figure>
        <a href="#" class="close"></a>
        <figcaption>
            <h3>Add new task to the calendar</h3>
            
            <form action="POST">
            <div>
              <label for="text">Text: </label>
              <input id="text"/>
            </div>
            
            <div>
              <label for="notification">Is notification: </label>
              <input id="notification" type="checkbox"/>
            </div>
            
            <div>  
              <label for="date">Date: </label>
              <input id="date" type="date"/>
            </div>
            
            <div>
              <label for="type">Type: </label>
              <select name="type" id="type">
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
               </select>
             <div> 
             
             <button type="submit">Send</button> 
            </form>
        </figcaption>
        </figure>
      </div>
    `
  }

}