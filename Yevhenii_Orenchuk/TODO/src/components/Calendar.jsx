import React, {Fragment} from 'react'
import dateFns from 'date-fns'
import '../styles/calendar.scss'

class Calendar extends React.Component{
    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };
    renderHeader = () => {
        const dateFormat = "MMMM";

        return (
            <header className={"calendar__header"}>
                <button className={"cell"} onClick={() => {this.previousMonth()}}>{'<'}</button>
                <span className={"calendar__header--title"}>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
                <button className={"cell"} onClick={() => {this.nextMonth()}}>{'>'}</button>
            </header>
        );
    };
    renderDays = () => {
        let weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        let days = [];

        let startDate = dateFns.startOfWeek(1);
        for (let i = 0; i < 7; i++) {
            days.push(
                <span key={weekdays[i]} className={"calendar__days"}>{weekdays[i]} </span>
            );
        }
        return <div className={"calendar__days--container"}>{days}</div>;
    };
    renderCells = () => {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.addDays(dateFns.startOfWeek(monthStart), 1);
        const endDate = dateFns.addDays(dateFns.endOfWeek(monthEnd), 1);

        console.log("end month", monthEnd);
        console.log("end of week: ", endDate);

        const dateFormat = "D";
        let rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            let j = 1;
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                days.push(
                    <button key={day*j} className={"cell"} onClick={() => {this.onDateClick(day.toDateString())}}>{formattedDate}</button>
                );
                day = dateFns.addDays(day, 1);
            }
            j++;
            rows.push(
                <div key={j}>{days}</div>
            );
            days = [];
        }
        return <main className="calendar__cells">{rows}</main>;
    };
    onDateClick = (day) => {
        this.setState({
            selectedDate: day
        });
    };
    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };
    previousMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render() {
        return (
            <div className={"calendar__container"}>
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        )
    }
}

export default Calendar;