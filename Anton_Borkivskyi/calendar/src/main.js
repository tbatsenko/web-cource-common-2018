import { todo, Calendar } from "./calendar"


let calendar = new Calendar()


let calendar_body = document.getElementById("calendar")
calendar_body.addEventListener("click", (e) => {
  if(!isNaN(parseInt(e.target.id))){
    calendar.make_todo_list(e.target.id)
  }
})

let calendar_header = document.getElementById("header")
calendar_header.addEventListener("click", (e) => {

  if(e.target.id === "prev_month"){
    calendar.prev_month()
  }
  else if(e.target.id === "next_month"){
    calendar.next_month()
  }
})

let add_button = document.getElementById("add")
add_button.addEventListener("click", () => {
  todo.add()
})

let todo_section = document.getElementById("todo")
todo_section.addEventListener("click", (e) => {
  if(!isNaN(parseInt(e.target.id))){
    todo.remove(e.target.id - 100)
  }
})