export default class Calendar {
  constructor() {
    this.today = new Date();
    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();
    this.selectYear = document.getElementById('year');
    this.selectMonth = document.getElementById('month');
    this.selectedDate = this.today;
    this.selectedCellId = '';

    this.onSelectDate = date => {
      const onSelectDateEvent = Calendar.createDateUpdateEvent('onSelectDateEvent', date);
      document.getElementById('app').dispatchEvent(onSelectDateEvent);
    };

    this.onResetDate = () => {
      const date = '';
      const onResetDateEvent = Calendar.createDateUpdateEvent('onResetDateEvent', date);
      document.getElementById('app').dispatchEvent(onResetDateEvent);
    };

    this.months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    this.monthAndYear = document.getElementById('monthAndYear');

    document.getElementById('reset-date').addEventListener('click', () => {
      this.updateShownDate();
      this.onResetDate();
    });

    this.showCalendar(this.currentMonth, this.currentYear);
    this.updateShownDate();
  }

  next() {
    this.onSelectDate();
    this.currentYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  previous() {
    this.currentYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  jump() {
    this.currentYear = parseInt(this.selectYear.value, 10);
    this.currentMonth = parseInt(this.selectMonth.value, 10);
    this.showCalendar(this.currentMonth, this.currentYear);
  }

  updateShownDate(date = '') {
    let innerText = '';
    if (date === '') {
      innerText = 'All tasks: ';
      if (this.selectedCellId)
        document.getElementById(this.selectedCellId).classList.remove('selected-cell');
      this.selectedCellId = '';
    } else {
      const dateArr = date.split('-'); // 2018-11-9 -> [2018, 11, 9]
      const newDate = `${this.months[dateArr[1] - 1]} ${dateArr[2]}, ${dateArr[0]}`; // Dec 9, 2018
      innerText = `Tasks for ${newDate}`;
      this.selectedDate = date;
      this.onSelectDate(date);
    }
    document.getElementById('today-date').innerText = innerText;
  }

  showCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    const tbl = document.getElementById('calendar-body');

    // clearing all previous cells
    tbl.innerHTML = '';

    // filing data about month and in the page via DOM.
    this.monthAndYear.innerHTML = `${this.months[month]} ${year}`;
    this.selectYear.value = year;
    this.selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i += 1) {
      // creates a table row
      const row = document.createElement('tr');

      // creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j += 1) {
        // empty cells
        if (i === 0 && j < firstDay) {
          const cell = document.createElement('td');
          const cellText = document.createTextNode('');
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth) {
          break;
        } else {
          // cells with numbers
          const cell = document.createElement('td');
          const cellText = document.createTextNode(date);
          cell.id = `${year}-${month + 1}-${date}`;

          if (date === this.today.getDay()) {
            cell.classList.add('today-cell');
          }
          cell.classList.add('day-cell');

          cell.addEventListener('click', event => {
            const filterByDate = event.target.id;

            if (this.selectedCellId)
              document.getElementById(this.selectedCellId).classList.remove('selected-cell');

            cell.classList.add('selected-cell');
            this.selectedCellId = event.target.id;

            this.updateShownDate(filterByDate);
            this.onSelectDate(filterByDate);
          });
          if (
            date === this.today.getDate() &&
            year === this.today.getFullYear() &&
            month === this.today.getMonth()
          ) {
            cell.classList.add('bg-info');
          } // color today's date

          cell.appendChild(cellText);
          row.appendChild(cell);
          date += 1;
        }
      }
      tbl.appendChild(row); // appending each row into calendar body.
    }
  }

  static createDateUpdateEvent(eventName, dateToUpdate) {
    return new CustomEvent(eventName, {
      detail: {
        message: 'onSelectDateEvent',
        time: new Date(),
        date: dateToUpdate
      },
      bubbles: true,
      cancelable: true
    });
  }
}
