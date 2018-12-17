import { TodoList } from './todo-list';

export class Calendar {
  constructor(todoList = new TodoList()) {
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.selectYear = document.getElementById("year");
    this.selectMonth = document.getElementById("month");

    this.todoList = todoList;

    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.monthAndYear = document.getElementById("monthAndYear");

    document.getElementById('reset-date').addEventListener('click', () => {
      this.updateShownDate();
      this.todoList.updateTodoList();
    });

    this.showCalendar(this.currentMonth, this.currentYear);
    this.updateShownDate();
  }

  next() {
    console.log("NEXT called");
    this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showCalendar(this.currentMonth, this.currentYear);

  }

  previous() {
    this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  jump() {
    this.currentYear = parseInt(this.selectYear.value);
    this.currentMonth = parseInt(this.selectMonth.value);
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  updateShownDate(date = "") { 
    let innerText = "";
    if (date === "") {
      innerText = "All tasks:";
    }
    else { 
      const dateArr = date.split('-'); // 2018-11-9 -> [2018, 11, 9]
      // Dec 9, 2018
      date = `${this.months[dateArr[1]]} ${dateArr[2]}, ${dateArr[0]}`;
      innerText = "Tasks for " + date;
    }
    document.getElementById("today-date").innerText = innerText;
  }
  showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body");

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    this.monthAndYear.innerHTML = this.months[month] + " " + year;
    this.selectYear.value = year;
    this.selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
      // creates a table row
      let row = document.createElement("tr");

      // creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        // empty cells  
        if (i === 0 && j < firstDay) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          // cells with numbers
          let cell = document.createElement("td");
          let cellText = document.createTextNode(date);
          cell.id = `${year}-${month}-${date}`;

            if (date === this.today.getDay()) { 
              cell.classList.add("today-cell");


            }
          cell.classList.add("day-cell");

          cell.addEventListener('click', event => { 
            console.log(event.target.id);
            let filterByDate = event.target.id;

            this.updateShownDate(filterByDate);
            this.todoList.updateTodoList(filterByDate);

          });
          if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {
            cell.classList.add("bg-info");
          } // color today's date

          cell.appendChild(cellText);
          row.appendChild(cell);
          date++;
        }
      }
      tbl.appendChild(row); // appending each row into calendar body.
    }
  }
}