import { calendarDaysList, getCalendarDays } from './heplers/date'

export default class Calendar {


  constructor(block_id) {
    this.block = document.getElementById(block_id)
    this.tasks = []
    this.date = new Date()

    this.render()
  }


  render() {
    const calendarDays = getCalendarDays(this.date)

    console.log('calendarDays: ', calendarDays)

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
          
          ${calendarDays.map((date, index) => `
          
          
          `)}
      
          {{#weeks}}
      
              <tr>
                  {{#each this}} <!-- for each day in week -->
                      <td class="calendar__cell {{#if empty}} calendar__cell--empty {{/if}}">
                          <div class="day day--current">
                              <ul class="day__schedule-list">
                                  {{#tasks}}
                                      {{#if empty}}
                                          <li class="schedule-item schedule-item--empty"></li>
                                      {{else}}
                                          <li class="schedule-item
                                          {{#if notification}}schedule-item__notification schedule-item__notification--{{type}}
                                          {{else}} schedule-item__task schedule-item__task--{{type}} {{/if}}">
                                              {{ text }}
                                          </li>
                                      {{/if}}
                                  {{/tasks}}
                              </ul>
                              <time class="day__number {{#if current}} day__number--current {{/if}}"
                                    datetime="2017-02-14">{{number}}</time>
                          </div>
                      </td>
                  {{/each}}
      
              </tr>
          {{/weeks}}
      
          </tbody>
      </table>
      
      <button class="action-btn">+</button>
    `
  }

}