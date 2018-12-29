import React, {Component} from "react";
import BEM from '../../utils/BEM'
import "./Calendar.scss"

let weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const b = BEM("calendar")

class Calendar extends Component{
    _getFirstDay() {
        const { date } = this.props;
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }
    _incrementMonth(inc) {
        const { date } = this.props;
        date.setMonth(date.getMonth() + inc);
        this.setState({
            date: date
        })
    }
    nextMonth() {
        this._incrementMonth(1)
    }
    prevMonth() {
        this._incrementMonth(-1)
    }

    onDayClick(date) {
        const { onDayClick } = this.props
        onDayClick(date)
    }

    renderCalendar() {
        const { date } = this.props;

        const firstDay = this._getFirstDay()

        return Array(6).fill().map(() => Array(7).fill())
            .map((row, rowInd) =>
                <div className={b("week-line")} key={rowInd}>
                    {row.map((col, colInd) => {
                        let btnDate = new Date(date.getFullYear(), date.getMonth(),
                            rowInd * 7 + colInd - firstDay + 2);
                        return <button
                            className={b("day", btnDate.getMonth() !== date.getMonth() ? ["passive"] :
                                btnDate.getDate() === date.getDate() ? ["active"] : []
                            )}
                            onClick={() => this.onDayClick(btnDate)}
                            key={rowInd * 6 + colInd}
                        >
                            {btnDate.getDate().toString()}
                        </button>
                    })}
                </div>
            )
    }

    render() {
        const { date } = this.props;
        const calendarTable = this.renderCalendar()

        return (
            <article className={b()}>
                <header className={b("header")}>
                    <button className={b("button")} onClick={() => this.prevMonth()}>{"<"}</button>
                    <h2 className={b("month-name")}>
                        {date.toLocaleString("en-us", {month: "long", year: "numeric"})}
                    </h2>
                    <button className={b("button")} onClick={() => this.nextMonth()}>{">"}</button>
                </header>

                <section className={b("main")}>
                    <div className={b("week-line")}>
                        {weekdays.map(weekday =>
                            <p className={b("weekday")} key={weekday}>
                                {weekday}
                            </p>)}
                    </div>
                    {calendarTable}
                </section>
            </article>
        )
    }
}

export default Calendar