import React, {Component} from 'react';
import './Calendar.scss'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];


export default class Calendar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lastClickedDate: new Date(),
    };
  }

  highlightCurrent = (currCell) => {
    console.log(currCell);
    console.log(this.state.lastClickedDate);
  };

  handleClick = (dateClicked) => {
    this.state.lastClickedDate.setDate(dateClicked);
    this.props.onClick(this.state.lastClickedDate);
  };

  render() {

    const firstDayOfMonth = new Date(this.state.lastClickedDate.getFullYear(), this.state.lastClickedDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(this.state.lastClickedDate.getFullYear(), this.state.lastClickedDate.getMonth() + 1, 0).getDate();
    const today = new Date().getDate();

    console.log("Cal rerendered");


    let cells = [];
    let emptyDaysAtEnd = 7 - (firstDayOfMonth - 1 + daysInMonth) % 7;
    for (let i = 1; i <= firstDayOfMonth + daysInMonth + emptyDaysAtEnd; i++) {
      let currCell = i - firstDayOfMonth;
      if (i < firstDayOfMonth || i > daysInMonth + firstDayOfMonth) {
        cells.push(<td key={currCell} className="day-cell-empty">{""}</td>)
      } else if (currCell === 0) {
      } else {
        cells.push(
          <td
            key={currCell}
            onClick={() => {
              this.highlightCurrent(currCell);
              this.handleClick(currCell);
            }}
            className={
              "day-cell day-cell-" +
              (currCell === today && this.state.lastClickedDate.getMonth() === new Date().getMonth() ? "today" : "full")
            }
          >{currCell}
          </td>
        )
      }
    }

    let weeks = [];
    for (let i = 0; i < cells.length / 7; i++) {
      weeks.push(<tr key={"week " + i.toString()} className="week-row">{cells.slice(i * 7, (i + 1) * 7)}</tr>)
    }

    return <table className="calendar-table">
      <caption><h2>Calendar</h2></caption>
      <thead>
      <tr className="year">
        <td id="year-name">{this.state.lastClickedDate.getFullYear()}</td>
      </tr>
      <tr className="month">
        <td>
          <button
            onClick={() => this.setState((prevState) => ({
              lastClickedDate: new Date(prevState.lastClickedDate.getFullYear(), prevState.lastClickedDate.getMonth() - 1)
            }))}
            className="month__button"
            id="month-prev-button">{"<"}</button>
        </td>
        <td id="month-name">{months[this.state.lastClickedDate.getMonth()]}</td>
        <td>
          <button
            onClick={() => this.setState((prevState) => ({
              lastClickedDate: new Date(prevState.lastClickedDate.getFullYear(), prevState.lastClickedDate.getMonth() + 1)
            }))}
            className="month__button"
            id="month-next-button">{">"}</button>
        </td>
      </tr>
      <tr className="day-of-week-header-row">
        {weekdays.map(day =>
          <th key={day} scope="col" headers="day" className="day-of-week-header-row__item">{day}</th>
        )}
      </tr>
      </thead>
      <tbody id="table-body">
      {weeks}
      </tbody>
    </table>
  }
}