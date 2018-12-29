import React, {Component} from 'react';
import './Calendar.scss'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];


export default class Calendar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currDate: new Date(),
      // currDate: null
    };


  }

  handleClick = () => {
    this.props.onClick(this.state.currDate);
    // this.state.currDate.setDate(this.state.currDate);
    console.log(this.state.currDate);
  };

  render() {


    const firstDayOfMonth = new Date(this.state.currDate.getFullYear(), this.state.currDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(this.state.currDate.getFullYear(), this.state.currDate.getMonth() + 1, 0).getDate();
    const today = new Date().getDate();

    let cells = [];
    let emptyDaysAtEnd = 7 - (firstDayOfMonth - 1 + daysInMonth) % 7;
    for (let i = 1; i <= firstDayOfMonth + daysInMonth + emptyDaysAtEnd; i++) {
      if (i < firstDayOfMonth || i > daysInMonth + firstDayOfMonth) {
        cells.push(<td key={i - firstDayOfMonth}
                       className="day-cell-empty">{""}</td>)
      } else if (i - firstDayOfMonth === today && this.state.currDate.getMonth() === new Date().getMonth()) {
        cells.push(<td
          onClick={() => {
            this.handleClick();
            this.state.currDate.setDate(i - firstDayOfMonth);
            return this.setState({currDate: this.state.currDate});
          }}
          key={i - firstDayOfMonth}
          className="day-cell day-cell-current">{i - firstDayOfMonth}</td>)
      } else if (i - firstDayOfMonth === 0) {
      } else {
        cells.push(<td
          onClick={() => {
            this.handleClick();
            this.state.currDate.setDate(i - firstDayOfMonth);
            return this.setState({currDate: this.state.currDate});
          }}
          key={i - firstDayOfMonth}
          className="day-cell day-cell-full">{i - firstDayOfMonth}</td>)
      }
    }

    let weeks = [];
    for (let i = 0; i < cells.length / 7; i++) {
      weeks.push(<tr key={i} className="week-row">{cells.slice(i * 7, (i + 1) * 7)}</tr>)
    }

    return <table className="calendar-table">
      <caption><h2>Calendar</h2></caption>
      <thead>
      <tr className="year">
        <td id="year-name">{this.state.currDate.getFullYear()}</td>
      </tr>
      <tr className="month">
        <td>
          <button
            onClick={() => this.setState({currDate: new Date(this.state.currDate.getFullYear(), this.state.currDate.getMonth() - 1)})}
            className="month__button"
            id="month-prev-button">{"<"}</button>
        </td>
        <td id="month-name">{months[this.state.currDate.getMonth()]}</td>
        <td>
          <button
            onClick={() => this.setState({currDate: new Date(this.state.currDate.getFullYear(), this.state.currDate.getMonth() + 1)})}

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