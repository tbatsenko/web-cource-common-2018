import { get, post } from './rest'
import {TODOList} from './todo'

export let todo = new TODOList()

export class Calendar{

  constructor() {
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    this.date = new Date()
    this.last_day = 1
    this.year = this.date.getFullYear()
    this.month = this.date.getMonth()
    this.build_calendar();

  }

  make_todo_list(day){
    document.getElementById(this.last_day).setAttribute('style', "background: #123C69")
    document.getElementById(day).setAttribute('style', "background: #AC3B61; color: white")
    this.last_day = day
    let date = this.year + '-' + (this.month + 1) + '-' + day

    todo.date = date

    let resp = get("http://localhost:3000/todo_lists/" + date)


    if (resp === '{}'){

      let resp = post("http://localhost:3000/todo_lists", JSON.stringify({"id": date, "items":[]}))

    }
    let decoded = JSON.parse(resp)
    let items = decoded.items
    todo.build_list(items)

  }

  build_calendar(){
    let header = this.months[this.month] + " " + this.year;
    document.getElementById("header__text").innerHTML = header;

    let blank_cells_before = this.get_blank_lines_before()

    let days_in_month = new Date(this.year, this.month + 1, 0).getDate();

    let blank_cells_after = 42 - blank_cells_before - days_in_month

    let calendar_body_html = ""

    for(let i = 0; i < blank_cells_before; i++){
      calendar_body_html += '<div class="calendar__cell"></div>'
    }

    for(let j = 1; j <= days_in_month; j++){
      calendar_body_html += '<div class="calendar__cell calendar__active-cell" id="' + j + '">' + j + '</div>'
    }

    for(let k = 0; k < blank_cells_after; k++){
      calendar_body_html += '<div class="calendar__cell"></div>'
    }

    document.getElementById("calendar").innerHTML = calendar_body_html
  }

  get_blank_lines_before(){
    let first_day = new Date(this.year + "-" + (this.month + 1) + "-01").getDay()
    let blank_cells_before = first_day - 1

    if (first_day <= 1){
      blank_cells_before = first_day + 6
    }

    return blank_cells_before
  }

  next_month(){
    this.month += 1
    if(this.month === 12){
      this.month = 0
      this.year += 1
    }
    this.build_calendar()
  }

  prev_month(){
    this.month -= 1
    if(this.month === -1){
      this.month = 11
      this.year -= 1
    }
    this.build_calendar()
  }

}