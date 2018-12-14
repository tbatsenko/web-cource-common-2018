class Calendar {
    constructor() {
        let today = new Date()
        this._calendarData = (localStorage.getItem('calendarJS')) ? JSON.parse(localStorage.getItem('calendarJS')) : {
            currentMonth: today.getMonth(),
            currentYear: today.getFullYear()
        }

        this._monthList = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug", "Sep", "Oct",
            "Nov", "Dec"]
    }

    calendarUpdate() {
        if (localStorage.getItem('calendarJS')) localStorage.removeItem('calendarJS')
        localStorage.setItem('calendarJS', JSON.stringify(this._calendarData));
    }

    get month() {
        return this._calendarData.currentMonth
    }

    get year() {
        return this._calendarData.currentYear
    }

    get monthsList() {
        return this._monthList
    }

    set month(newMonths) {
        this._calendarData.currentMonth = newMonths
    }

    set year(newYear) {
        this._calendarData.currentYear = newYear
    }
}

export default Calendar