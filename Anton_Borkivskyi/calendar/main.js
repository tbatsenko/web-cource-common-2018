class Calendar{
  constructor() {
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var date = new Date()
    this.year = date.getFullYear()
    this.month = date.getMonth()
    this.build_calendar(this.year, this.month);

  }


  build_calendar(year, month){
    var header = this.months[month] + " " + year;
    document.getElementById("calendar__header-text").innerHTML = header;
  }

  next_month(){
    this.month += 1
    if(this.month === 12){
      this.month = 0
      this.year += 1
    }
    this.build_calendar(this.year, this.month)
  }

  prev_month(){
    this.month -= 1
    if(this.month === -1){
      this.month = 11
      this.year -= 1
    }
    this.build_calendar(this.year, this.month)
  }


}


var calendar = new Calendar()