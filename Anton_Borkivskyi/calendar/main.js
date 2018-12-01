class Calendar{
  constructor() {
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    this.date = new Date()
    this.year = this.date.getFullYear()
    this.month = this.date.getMonth()
    this.build_calendar();

  }


  build_calendar(){
    var header = this.months[this.month] + " " + this.year;
    document.getElementById("header__text").innerHTML = header;

    var blank_cells_before = this.get_blank_lines_before()

    var days_in_month = new Date(this.year, this.month + 1, 0).getDate();

    var blank_cells_after = 42 - blank_cells_before - days_in_month

    var calendar_body_html = ""

    for(var i = 0; i < blank_cells_before; i++){
      calendar_body_html += '<div class="calendar__cell"></div>'
    }

    for(var j = 1; j <= days_in_month; j++){
      calendar_body_html += '<div class="calendar__cell">' + j + '</div>'
    }

    for(var k = 0; k < blank_cells_after; k++){
      calendar_body_html += '<div class="calendar__cell"></div>'
    }

    // document.getElementById("calendar").innerHTML = blank_cells_before + " " + days_in_month + " " + blank_cells_after;
    document.getElementById("calendar").innerHTML = calendar_body_html
  }

  get_blank_lines_before(){
    var first_day = new Date(this.year + "-" + (this.month + 1) + "-01").getDay()
    var blank_cells_before = first_day - 1

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


var calendar = new Calendar()