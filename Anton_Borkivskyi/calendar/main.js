class Calendar{
  constructor() {
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    this.build_calendar(2018, 9);
  }


  build_calendar(year, month){
    var header = this.months[month - 1] + " " + year;
    document.getElementById("calendar__header").innerHTML = '<h1 class="calendar__header-text">'+header+'</h1>';
  }
}


var clndr = new Calendar()