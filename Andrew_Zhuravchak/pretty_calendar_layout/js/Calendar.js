import { calendarDaysList, getCalendarDays } from './heplers/date'
import { addMonths } from 'date-fns'

import Task from './Task'

export default class Calendar {
  constructor(block_id) {
    this.block_id = block_id
    this.block = document.getElementById(block_id)
    this.tasks = []
    this.currentDisplayDate = new Date()
    this.currentDate = new Date()

    this.render()
  }

  getTasksForDate(date) {
    return this.tasks.filter(task =>
      (task.date.getMonth() === date.getMonth() && task.date.getDate() === date.getDate() && task.date.getYear() === date.getYear()),
    )
  }

  getCurrentDisplayDate() {
    return this.currentDisplayDate
  }

  addNewTask(e) {
    e.preventDefault()

    const formEl = e.srcElement
    const text = formEl.querySelector('#text').value
    const type = formEl.querySelector('#type').value
    const isNotification = formEl.querySelector('#notification').checked
    const date = new Date(formEl.querySelector('#date').value)

    this.tasks.push(new Task(text, isNotification, false, type, date))

    this.render()
  }

  shiftDisplayedMonth(monthsNumber) {
    this.currentDisplayDate = addMonths(this.currentDisplayDate, monthsNumber)

    this.render()
  }

  render() {
    const calendarWeeksWithDays = getCalendarDays(this.currentDisplayDate)

    this.block.innerHTML = `
      <div class="calendar-layout__controls">
        <div class="toogler">
            <button class="toogler__btn">Week</button>
            <button class="toogler__btn toogler__btn--active">Month</button>
        </div>

        <div class="date-switcher">
            <button class="date-switcher__btn" id="left-month-switch">‹</button>
            <span class="date-switcher__current-date">${this.currentDisplayDate.toLocaleString('en-us', { month: 'long' })} ${this.currentDisplayDate.getFullYear()}</span>
            <button class="date-switcher__btn" id="right-month-switch">›</button>
        </div>

        <form action="POST" class="search-form">
            <input type="text"
                   placeholder="What are you looking for?"
                   aria-label="Search form"
                   class="search-form__input">
        </form>
      </div>

      <div class="calendar-layout__calendar">
    
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
                      <td class="calendar__cell ${!day ? `calendar__cell--empty` : ``}">
                          <div class="day">
                            <ul class="day__schedule-list">
                              ${day ? this.getTasksForDate(day).map(task => `
                              
                                  ${task.isEmpty ? `<li class="schedule-item schedule-item--empty"></li>`
      : `<li class="schedule-item
                                            ${task.isNotification ? `schedule-item__notification schedule-item__notification--${task.type}">`
        : `schedule-item__task schedule-item__task--${task.type}">`}
                                            ${task.text}
                                          </li>`
      }                            
                              `) : ``}
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
              
              <form method="POST" action="#" id="add-new-task-form">
              <div>
                <label for="text">Text: </label>
                <input id="text" required/>
              </div>
              
              <div>
                <label for="notification">Is notification: </label>
                <input id="notification" type="checkbox"/>
              </div>
              
              <div>  
                <label for="date">Date: </label>
                <input id="date" type="date" required/>
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
      </div>
    `


    document.querySelector(`#${this.block_id} #add-new-task-form`).addEventListener('submit', this.addNewTask.bind(this))
    document.querySelector(`#${this.block_id} #left-month-switch`).addEventListener('click', () => {
      this.shiftDisplayedMonth(-1)
    })

    document.querySelector(`#${this.block_id} #right-month-switch`).addEventListener('click', () => {
      this.shiftDisplayedMonth(1)
    })
  }

}