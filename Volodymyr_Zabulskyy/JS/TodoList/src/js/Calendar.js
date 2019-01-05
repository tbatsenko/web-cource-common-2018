import {createElementFromHTML, generateMonth, compareDayMonthYear, isHoliday} from './utils';

const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];


class Calendar {
    constructor(container, todoList) {
        this.container = container;
        this.todoList = todoList;
        this.htmlElem = document.createElement('div');
        this.container.appendChild(this.htmlElem);
        this.today = new Date();
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        this.date = this.today.getDate();
        this.day = this.today.getDay();
        this.timestamp = this.today / 1000;
        this.hidden = false;
        this.getDateFromUrl();
        this.render();
    }

    getDateFromUrl(){
        let url = new URL(document.location);
        let search = new URLSearchParams(url.search);
        let timestamp = search.get('date');
        if (timestamp !== null){
            this.today = new Date(timestamp * 1000);
            this.year = this.today.getFullYear();
            this.month = this.today.getMonth();
            this.date = this.today.getDate();
            this.day = this.today.getDay();
            this.timestamp = this.today / 1000;
        }
    }

    render() {
        let content = document.createElement('div');
        this.header = createElementFromHTML(`<header class="calendar__header"></header>`);
        this.monthYear = createElementFromHTML(`<span class="calendar__header__month-year">
            ${months[this.month]} ${this.year}
        </span>`);
        this.goTodayBtn = createElementFromHTML(`<button class="calendar__navigation-btn calendar__navigation-btn_go-today">Go Today</button>`);
        this.goTodayBtn.addEventListener('click', () => {
            this.setNewDate(new Date())
        });
        this.hideBtn = createElementFromHTML(`<button class="calendar__navigation-btn calendar__navigation-btn_hide-calendar">_</button>`);
        this.hideBtn.addEventListener('click', () => {
            this.toggleHide()
        });

        this.shiftRightBtn = createElementFromHTML(`<button class="calendar__navigation-btn calendar__navigation-btn_shift-right">></button>`);
        this.shiftRightBtn.addEventListener('click', () => {
            this.nextMonth();
            this.render();
        });
        this.shiftLeftBtn = createElementFromHTML(`<button class="calendar__navigation-btn calendar__navigation-btn_shift-left"><</button>`);
        this.shiftLeftBtn.addEventListener('click', () => {
            this.prevMonth();
            this.render();
        });

        this.header.appendChild(this.monthYear);
        this.header.appendChild(this.hideBtn);
        this.header.appendChild(this.shiftRightBtn);
        this.header.appendChild(this.shiftLeftBtn);
        this.header.appendChild(this.goTodayBtn);
        content.appendChild(this.header);

        if (!this.hidden) {
            this.subheader = createElementFromHTML(`<div class="calendar__subheader"></div>`);
            const weeks = ['M', 'T', "W", "T", "F", "S", "S"];
            for (let week in weeks) {
                this.subheader.appendChild(createElementFromHTML(`<span>${weeks[week]}</span>`))
            }
            content.appendChild(this.subheader);

            let calendars = createElementFromHTML(`<div style="display: flex;"></div>`);
            content.appendChild(calendars);

            this.calendarBody = createElementFromHTML(`<div class="calendar__dates-container" id="calendar"></div>`);
            this.getMonthCalendar(this.month);
            calendars.appendChild(this.calendarBody);

        }
        this.container.replaceChild(content, this.htmlElem);
        this.htmlElem = content;

    }

    setNewDate(date) {
        this.today = date;
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        this.date = this.today.getDate();
        this.day = this.today.getDay();
        this.timestamp = this.today / 1000;
        if (this.todoList !== undefined){
            this.todoList.currentFilter = 'date';
            this.todoList.render();
        }
        this.render();
    }

    toggleHide() {
        this.hidden = !this.hidden;
        this.calendarBody.style.display = this.hidden ? 'none' : '';
        this.subheader.style.display = this.hidden ? 'none' : '';
        this.goTodayBtn.style.display = this.hidden ? 'none' : '';
        this.shiftRightBtn.style.display = this.hidden ? 'none' : '';
        this.shiftLeftBtn.style.display = this.hidden ? 'none' : '';

    }

    nextMonth() {
        this.month = this.month + 1;
        if (this.month === 12) {
            this.month = 0;
            this.year += 1;
        }
    }

    prevMonth() {
        this.month -= 1;
        if (this.month === -1) {
            this.month = 11;
            this.year -= 1;
        }
    }

    generateCellText(date) {
        let text = document.createElement('div');
        let day = document.createElement('span');
        day.innerText = date.getDate();
        text.appendChild(day);

        return text;

    }

    getMonthCalendar(month) {
        let monthTable;
        if (month === undefined){
            monthTable = generateMonth(this.month, this.year);
        } else {
            let year = this.year;
            if (month <= -1){
                month = 12 + month;
                year -= 1
            }
            if (month >= 12) {
                month = month - 12;
                year += 1;
            }
            monthTable = generateMonth(month, year);
        }
        for (let i in monthTable) {
            let row = document.createElement('div');
            row.setAttribute('class', 'calendar__dates-container__row');
            for (let j in monthTable[i]) {
                let cell = document.createElement('a');
                cell.setAttribute('class', 'calendar__dates-container__cell');
                if (monthTable[i][j] === -1) {
                    cell.innerText = "";
                    cell.setAttribute('class', 'calendar__dates-container__cell calendar__dates-container__cell_empty');
                } else {
                    let cellText = this.generateCellText(monthTable[i][j]);
                    let url = new URL(document.location);
                    cell.href = url.origin + "?date=" + monthTable[i][j] / 1000;
                    cell.appendChild(cellText);
                    if (compareDayMonthYear(monthTable[i][j], this.today)) {
                        cell.setAttribute('class', 'calendar__dates-container__cell calendar__dates-container__cell_active');
                    }
                    const holiday = isHoliday(monthTable[i][j])
                    if (holiday){
                        cell.setAttribute('class', cell.className + " calendar__dates-container__cell_holiday");
                        cell.title = holiday;
                    }
                }
                row.appendChild(cell);
            }
            this.calendarBody.appendChild(row)
        }
    }
}


export default Calendar