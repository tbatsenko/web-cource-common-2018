import React, {Component} from "react"

import BEM from '../../utils/BEM'
import "./Calendar.scss"

let weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

const b = BEM("calendar")

class Calendar extends Component {
    _getFirstDay() {
        const { calendarPageDate } = this.props
        return new Date(calendarPageDate.getFullYear(), calendarPageDate.getMonth(), 1).getDay()
    }
    _incrementMonth(inc) {
        const { calendarPageDate, onMonthChange } = this.props
        const newCalendarPageDay = new Date(calendarPageDate.getTime())
        newCalendarPageDay.setMonth(newCalendarPageDay.getMonth() + inc)
        onMonthChange(newCalendarPageDay)
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
        const { calendarPageDate, activeDate } = this.props

        const firstDay = this._getFirstDay()

        return Array(6).fill().map(() => Array(7).fill())
            .map((row, rowInd) =>
                <div className={b("week-line")} key={rowInd}>
                    {row.map((col, colInd) => {
                        let btnDate = new Date(calendarPageDate.getTime())
                        btnDate.setDate(rowInd * 7 + colInd - firstDay + 2)
                        return <a
                            className={b("day", [
                                ...btnDate.getMonth() !== calendarPageDate.getMonth() ? ["passive"] : [],
                                ...Calendar.isTheSameDay(btnDate, activeDate) ? ["active"] : []
                                ]
                            )}
                            href={btnDate.toISOString().substring(0, 10)}
                            onClick={(event) => {
                                event.preventDefault()
                                this.onDayClick(btnDate)
                            }}
                            key={rowInd * 6 + colInd}
                        >
                            {btnDate.getDate().toString()}
                        </a>
                    })}
                </div>
            )
    }

    render() {
        const { calendarPageDate } = this.props
        const calendarTable = this.renderCalendar()

        return (
            <article className={b()}>
                <header className={b("header")}>
                    <button className={b("button")} onClick={() => this.prevMonth()}>{"<"}</button>
                    <h2 className={b("month-name")}>
                        {calendarPageDate.toLocaleString("en-us", {month: "long", year: "numeric"})}
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

    static isTheSameDay(day1, day2) {
        return day1.getFullYear() === day2.getFullYear() &&
            day1.getMonth() === day2.getMonth() &&
            day1.getDate() === day2.getDate()
    }
}

export default Calendar