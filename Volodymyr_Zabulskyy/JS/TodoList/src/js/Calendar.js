import {createElementFromHTML, generateMonth, compareDayMonthYear} from './utils';
import DataBaseHandler from "./DataBaseHandler";

const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

class Calendar {
    constructor(container, todoList, dbUrl) {
        this.container = container;
        this.todoList = todoList;
        this.htmlElem = document.createElement('div');
        this.container.appendChild(this.htmlElem);
        this.today = new Date();
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        this.date = this.today.getDate();
        this.day = this.today.getDay();
        this.hidden = false;

        this.dbHandler = new DataBaseHandler(
            dbUrl === undefined ? "http://localhost:3000/todoList" : dbUrl
        );

        this.render();
    }

    render() {
        let content = document.createElement('div');
        this.header = createElementFromHTML(`<header class="calendar-header"></header>`);
        this.monthYear = createElementFromHTML(`<span class="calendar-header__month-year">
            ${months[this.month]} ${this.year}
        </span>`);
        this.goTodayBtn = createElementFromHTML(`<button class="calendar__btn calendar__btn_go-today">Go Today</button>`);
        this.goTodayBtn.addEventListener('click', () => {
            this.setNewDate(new Date())
        });
        this.hideBtn = createElementFromHTML(`<button class="calendar__btn calendar__btn_hide-calendar">_</button>`);
        this.hideBtn.addEventListener('click', () => {
            this.toggleHide()
        });

        this.shiftRightBtn = createElementFromHTML(`<button class="calendar__btn calendar__btn_shift-right">></button>`);
        this.shiftRightBtn.addEventListener('click', () => {
            this.nextMonth();
            this.render();
        });
        this.shiftLeftBtn = createElementFromHTML(`<button class="calendar__btn calendar__btn_shift-left"><</button>`);
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
            this.subheader = createElementFromHTML(`<div class="calendar-subheader"></div>`);
            const weeks = ['M', 'T', "W", "T", "F", "S", "S"];
            for (let week in weeks) {
                this.subheader.appendChild(createElementFromHTML(`<span>${weeks[week]}</span>`))
            }
            content.appendChild(this.subheader);
            this.calendarBody = createElementFromHTML(`<div class="calendar_table" id="calendar"></div>`);
            this.getThisMonthCalendar(this.calendarBody);
            content.appendChild(this.calendarBody);
        }
        this.container.replaceChild(content, this.htmlElem);
        this.htmlElem = content;
        // this.htmlElem = content;
        // this.container.appendChild(this.htmlElem);

    }

    getTasksForDate(date, callback){
        this.dbHandler.getAllTodos((dataFromResponce) => {
            let jsonData = JSON.parse(dataFromResponce);
            let result = [];
            for(let i in jsonData){
                if (compareDayMonthYear(new Date(jsonData[i].date), date)){
                    result.push(jsonData[i])
                }
            }
            callback(result);
        })
    }

    setNewDate(date) {
        this.today = date;
        this.year = this.today.getFullYear();
        this.month = this.today.getMonth();
        this.date = this.today.getDate();
        this.day = this.today.getDay();
        this.todoList.currentFilter = 'date';
        this.todoList.render();
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

    generateCellText(date){
        let text = document.createElement('div');
        let day = document.createElement('span');
        day.innerText = date.getDate();
        text.appendChild(day);

        this.getTasksForDate(date, (r)=>{
            if (r.length > 0){
                let tasks = document.createElement('span');
                tasks.setAttribute('class', "calendar_table__cell__date-badge")
                tasks.innerText = r.length;
                text.appendChild(tasks);
            }
        });

        return text;

    }

    getThisMonthCalendar() {
        let monthTable = generateMonth(this.month, this.year);
        for (let i in monthTable) {
            let row = document.createElement('div');
            row.setAttribute('class', 'calendar_table__row');
            for (let j in monthTable[i]) {
                let cell = document.createElement('div');
                cell.setAttribute('class', 'calendar_table__cell');
                if (monthTable[i][j] === -1) {
                    cell.innerText = "";
                    cell.setAttribute('class', 'calendar_table__cell calendar_table__cell_empty');
                } else {
                    let cellText = this.generateCellText(monthTable[i][j]);
                    cell.appendChild(cellText);
                    if (compareDayMonthYear(monthTable[i][j], this.today)) {
                        cell.setAttribute('class', 'calendar_table__cell calendar_table__cell_active');
                    }
                    cell.addEventListener('click', () => {
                        this.setNewDate(monthTable[i][j])
                    })
                }
                row.appendChild(cell);
            }
            this.calendarBody.appendChild(row)
        }
    }
}


export default Calendar