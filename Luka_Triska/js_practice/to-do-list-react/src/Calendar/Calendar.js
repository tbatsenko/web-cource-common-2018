import React, {Component} from 'react';
import CalendarBody from './CalendarBody'
import './Calendar.scss'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];


export default class Calendar extends Component {

  state = {
    currDate: new Date(),
    currYear: new Date().getFullYear(),
    currMonth: new Date().getMonth()
  };


  render() {
    return (
      <table>
        <caption><h2>Calendar</h2></caption>
        <thead>
        <tr className="year">
          <td id="year-name">{this.state.currYear}</td>
        </tr>
        <tr className="month">
          <td>
            <button className="month__button" id="month-prev-button">{"<"}</button>
          </td>
          <td id="month-name">{months[this.state.currMonth]}</td>
          <td>
            <button className="month__button" id="month-next-button">{">"}</button>
          </td>
        </tr>
        <tr className="day-of-week-header-row">
          {weekdays.map(day =>
            <th key={day} scope="col" headers="day" className="day-of-week-header-row__item">{day}</th>
          )}
        </tr>
        </thead>
        <CalendarBody/>
      </table>
    )
  }
}