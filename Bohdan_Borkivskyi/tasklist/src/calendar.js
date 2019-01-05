MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function get_number_of_days(year, month){
  return new Date(year, month+1, 0).getDate();
}

function update_calendar() {
  // Set new month label
  document.getElementById("current_month").innerText = MONTHS[current_month]+" "+current_year;
  // Set weekdays
  var calendar_weekdays = document.getElementById("calendar__weekdays")
  calendar_weekdays.innerHTML = ""
  for(var i=0;i<7;++i){
    calendar_weekdays.innerHTML += "<span class='calendar__cell calendar__cell-weekday'>"+WEEK_DAYS[i]+"</span>";
  }

  // fill calendar
  var calendar_body = document.getElementById("calendar__body");
  calendar_body.innerHTML = ""
  var first_day = new Date(current_year, current_month, 1).getDay();
  var num_of_days = get_number_of_days(current_year, current_month);
  if(first_day === 0){
    first_day = 7;
  }
  for(i=0;i<first_day-1;++i){
    calendar_body.innerHTML += "<button class='calendar__cell calendar__cell-inactive'></button>"
  }

  for(i=0;i<num_of_days;++i){
    var additional_class = (i+1 === current_day ? " calendar__cell-selected":"")
    calendar_body.innerHTML += "<button class='calendar__cell"+additional_class+"'>"+(i+1)+"</button>"
  }
  // onclick='current_day = parseInt(this.innerText); update_window()'
  buttons = document.getElementsByClassName("calendar__cell")
  for(var i=0;i<buttons.length;++i){
    buttons[i].addEventListener("click", (event)=>{
      var value = event.path[0].innerText
      if(value === ""){return}
      current_day = parseInt(value);
      update_window()
    })
  }
}

function update_list() {
  var tasks = get_tasks()
  var task_list = document.getElementById("tasks_list")
  task_list.innerHTML = ""
  for(var i=0;i<tasks.length;++i){
    if(tasks[i]["year"] !== current_year ||
      tasks[i]["month"] !== current_month+1 ||
      tasks[i]["day"] !== current_day){continue}

    task_list.innerHTML += "<section class='list__task'>"
     + "<span class='list__task-text'>"+tasks[i]["task"]+"</span>"
     + "<button class='list__task-button' id="+tasks[i]['id']+">X</button>"
     + "</section>"
  }
  buttons = document.getElementsByClassName("list__task-button")
  for(var i=0;i<buttons.length;++i){
    buttons[i].addEventListener("click", (event)=>{
      delete_task(event.path[0].id);
      update_list()
    })
  }
}

function update_window() {
  update_calendar();
  update_list();
}

var current_year = new Date().getFullYear();
var current_month = new Date().getMonth(); // 0-11
var current_day = new Date().getDate(); // 1-31
var url = "http://localhost:3000/tasks"

update_window();

document.getElementById("change_month_button_prev").addEventListener("click", (event)=>{
  if(current_month === 0){
    current_year -= 1;
    current_month = 11;
  }else{
    current_month -= 1;
  }

  if(get_number_of_days(current_year, current_month) < current_day){
    current_day = 1;
  }

  update_window();
})

document.getElementById("change_month_button_next").addEventListener("click", (event)=>{
  if(current_month === 11){
    current_year += 1;
    current_month = 0;
  }else{
    current_month += 1;
  }
  if(get_number_of_days(current_year, current_month) < current_day){
    current_day = 1;
  }
  update_window();
})

document.getElementById("add").addEventListener("click", (event)=>{
  input_el = document.getElementById("input")
  if(input_el.value === ""){return}
  create_task(input_el.value);
  input_el.value = ""
  update_list();
})

function get_tasks() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url, false ); // false for synchronous request
  xmlHttp.send( null );
  return JSON.parse(xmlHttp.responseText);
}

function create_task(text) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", url, false ); // false for synchronous request
  xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xmlHttp.send( JSON.stringify({"year":current_year, "month": current_month+1, "day": current_day, "task": text}) );
  return JSON.parse(xmlHttp.responseText);
}

function delete_task(task_id) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "DELETE", url+"/"+task_id, false ); // false for synchronous request
  xmlHttp.send( null );
  console.log(JSON.parse(xmlHttp.responseText))
  return JSON.parse(xmlHttp.responseText);
}