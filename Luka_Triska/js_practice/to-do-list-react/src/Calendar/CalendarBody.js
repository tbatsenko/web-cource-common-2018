import React, {Component} from 'react';
import moment from "moment";

export default class CalendarBody extends Component {

  /*generateCalendarCells = () => {
    let firstDayInCurrMonth = new Date(this.state.currYear, this.state.currMonth, 1).getDay();
    let daysInCurrMonth = new Date(this.state.currYear, this.state.currMonth + 1, 0).getDate();

    let weeks = [];

    let dayOfMonth = 1;
    for (let week = 1; week <= 6; week++) {
      // create table row for a week
      let days = [];
      for (let day = 1; day <= 7; day++) {
        // create table row cell for a certain day
        let dayTd = <td/>;
        if ((day < firstDayInCurrMonth && week === 1) || dayOfMonth > daysInCurrMonth) {
          dayTd = <td className="day-cell-empty">""</td>
        } else if (dayOfMonth === new Date().getDate() && this.state.currMonth === new Date().getMonth()) {
          dayTd =
            <td className="day-cell day-cell-current"
                id={"day-" + dayOfMonth.toString()}>
              {new Date().getDate().toString()}
            </td>;
          dayOfMonth++;
        } else {
          dayTd =
            <td className="day-cell day-cell-full"
                id={"day-" + dayOfMonth.toString()}>
              {dayOfMonth.toString()}
            </td>;
          dayOfMonth++;
        }
        days.push(dayTd)
      }
      let week = <tr className="week-row">

      </tr>;
      days.map(day => week.append(day));
      // make sure not to push an empty row of days
      // if (week === 6) {
      //   let bools = [];
      //   for (let day of weekTr.children) bools.push(day.textContent === "");
      //   if (bools.includes(false)) document.getElementById("table-body").appendChild(weekTr);
      // } else {
      //   document.getElementById("table-body").appendChild(weekTr);
      // }

    }

  };*/

  state = {
    today: moment()
  };

  getFirstDayOfMonth = () => parseInt(moment(this.state.today).startOf('month').format('d'));

  getDaysInMonth = () => parseInt(this.state.today.daysInMonth());

  getToday = () => parseInt(moment().format('D'));

  generate = () => {
    // let now = moment();
    console.log(this.getFirstDayOfMonth());
    console.log(this.getDaysInMonth());
    console.log(7 - (this.getFirstDayOfMonth() - 1 + this.getDaysInMonth()) % 7);
  };


  render() {

    console.log("today " + moment().format('D'));

    let cells = [];
    let emptyDaysAtEnd = 7 - (this.getFirstDayOfMonth() - 1 + this.getDaysInMonth()) % 7;
    for (let i = 1; i <= this.getFirstDayOfMonth() + this.getDaysInMonth() + emptyDaysAtEnd; i++) {
      if (i < this.getFirstDayOfMonth() || i > this.getDaysInMonth() + this.getFirstDayOfMonth()) {
        cells.push(<td key={i - this.getFirstDayOfMonth()} className="day-cell-empty">{""}</td>)
      } else if (i - this.getFirstDayOfMonth() === this.getToday()) {
        cells.push(<td key={i - this.getFirstDayOfMonth()}
                       className="day-cell day-cell-current">{i - this.getFirstDayOfMonth()}</td>)
      } else if (i - this.getFirstDayOfMonth() === 0) {
      } else {
        cells.push(<td key={i - this.getFirstDayOfMonth()}
                       className="day-cell day-cell-full">{i - this.getFirstDayOfMonth()}</td>)
      }
    }

    let weeks = [];
    for (let i = 0; i < cells.length / 7; i++) {
      weeks.push(<tr className="week-row">{cells.slice(i*7, (i+1)*7)}</tr>)
    }


    // this.generate();

    // console.log(emptyCells);

    return (
      <tbody id="table-body">
      {weeks}
      </tbody>
    )
  }
}
