import React, {Component} from 'react';
import App from '../App'

export default class CalendarBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lastClickedCell: "",
      lastClickedCellDate: ""
    };
  };

  getLastClickedCell = () => this.state.lastClickedCell;

  getLastClickedCellDate = () => this.state.lastClickedCellDate;

  render() {

    const firstDayOfMonth = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), 1).getDay();
    const daysInMonth = new Date(this.props.date.getFullYear(), this.props.date.getMonth() + 1, 0).getDate();
    const today = new Date().getDate();

    let cells = [];
    let emptyDaysAtEnd = 7 - (firstDayOfMonth - 1 + daysInMonth) % 7;
    for (let i = 1; i <= firstDayOfMonth + daysInMonth + emptyDaysAtEnd; i++) {
      if (i < firstDayOfMonth || i > daysInMonth + firstDayOfMonth) {
        cells.push(<td key={i - firstDayOfMonth}
                       className="day-cell-empty">{""}</td>)
      } else if (i - firstDayOfMonth === today && this.props.date.getMonth() === new Date().getMonth()) {
        cells.push(<td onClick={() => this.setState({lastClickedCell: i - firstDayOfMonth, lastClickedCellDate: this.props.date})}
                       key={i - firstDayOfMonth}
                       className="day-cell day-cell-current">{i - firstDayOfMonth}</td>)
      } else if (i - firstDayOfMonth === 0) {
      } else {
        cells.push(<td onClick={() => this.setState({lastClickedCell: i - firstDayOfMonth, lastClickedCellDate: this.props.date})}
                       key={i - firstDayOfMonth}
                       className="day-cell day-cell-full">{i - firstDayOfMonth}</td>)
      }
    }

    let weeks = [];
    for (let i = 0; i < cells.length / 7; i++) {
      weeks.push(<tr key={i} className="week-row">{cells.slice(i * 7, (i + 1) * 7)}</tr>)
    }


    return (
      <tbody id="table-body">
      {weeks}
      </tbody>
    )
  }
}
