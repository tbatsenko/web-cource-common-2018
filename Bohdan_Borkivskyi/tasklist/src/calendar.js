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
    calendar_body.innerHTML += "<button onclick='current_day = parseInt(this.innerText); update_calendar()' class='calendar__cell"+additional_class+"'>"+(i+1)+"</button>"
  }
}

var current_year = new Date().getFullYear();
var current_month = new Date().getMonth(); // 0-11
var current_day = new Date().getDate(); // 1-31

update_calendar();

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

  update_calendar();
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
  update_calendar();
})