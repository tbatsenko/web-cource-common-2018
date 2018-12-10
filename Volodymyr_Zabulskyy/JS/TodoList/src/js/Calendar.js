import createElementFromHTML from './utils'

class Calendar {
    constructor(container) {
        this.container = container;
        this.htmlElem = document.createElement('div');
        this.container.appendChild(this.htmlElem);

        this.hidden = false;
        this.render();
    }

    render(){
        let content = document.createElement('div');
        this.header = createElementFromHTML(`<header class="calendar-header"></header>`);
        this.monthYear = createElementFromHTML(`<span class="calendar-header__month-year">July 2018</span>`);
        this.hideBtn = createElementFromHTML(`<button class="calendar__btn calendar__btn_hide-calendar">_</button>`);
        this.hideBtn.addEventListener('click', () => {this.toggleHide()});

        this.shiftRightBtn = createElementFromHTML(`<button class="calendar__btn calendar__btn_shift-right">></button>`);
        this.shiftLeftBtn = createElementFromHTML(`<button class="calendar__btn calendar__btn_shift-left"><</button>`);


        this.header.appendChild(this.monthYear);
        this.header.appendChild(this.hideBtn);
        this.header.appendChild(this.shiftRightBtn);
        this.header.appendChild(this.shiftLeftBtn);
        content.appendChild(this.header);

        if (!this.hidden){
            this.calendarBody = createElementFromHTML(`<div class="calendar_table" id="calendar">
        <div class="calendar_table__row">
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
        </div>
        <div class="calendar_table__row">
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
        </div>
        <div class="calendar_table__row">
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
        </div>
        <div class="calendar_table__row">
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
        </div>
        <div class="calendar_table__row">
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
        </div>
        <div class="calendar_table__row">
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
        </div>
        <div class="calendar_table__row">
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
            <div class="calendar_table__cell"></div>
        </div>
    </div>`);
            content.appendChild(this.calendarBody);
        }
        this.container.replaceChild(content, this.htmlElem);
        this.htmlElem = content;
        // this.htmlElem = content;
        // this.container.appendChild(this.htmlElem);

    }

    toggleHide(){
        this.hidden = !this.hidden;
        this.calendarBody.style.display = this.hidden ? 'none' : '';
    }
}

function generateMonth(month, year) {
    // month = 1-12
    let d = new Date();
    year = (year === undefined) ? d.getFullYear() : (month === 0) ? year - 1: year;
    month = (month === undefined) ? d.getMonth() : (month === 0) ? 12 : month;
    let monthTable =
}

export default Calendar