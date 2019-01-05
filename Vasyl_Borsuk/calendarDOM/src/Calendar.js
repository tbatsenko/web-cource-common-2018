let weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default class Calendar {
    constructor(container) {
        this.container = container;
        this.curr_date = new Date();
        this.create();

        // adding events
        this.dayEvents = [];

        this.container.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target !== e.currentTarget) {
                let clickedItem = e.target;
                if (clickedItem.classList.contains("calendar--day") &&
                    !clickedItem.classList.contains("calendar--day__passive")) {
                        this.setDate(clickedItem.innerText);
                        this.dayEvents.forEach(ev => ev());
                }
                else if (clickedItem.classList.contains("calendar--button")) {
                    this.incrementMonth(clickedItem.id === "calendar--inc-month" ? 1 : -1);
                }
                this.render();
            }
            e.stopPropagation();
        })
    }

    addDayEvent(event) {
        this.dayEvents.push(event);
    }

    incrementMonth(inc) {
        this.curr_date.setMonth(this.curr_date.getMonth() + inc);
    }
    setDate(date) {
        this.curr_date.setDate(date);
    }
    getFirstDay() {
        return new Date(this.curr_date.getFullYear(), this.curr_date.getMonth(), 1).getDay();
    }

    render() {
        this.renderHeader();
        this.renderCalendarTable()
    }

    renderHeader() {
        this.container.getElementsByClassName("calendar--month-name")[0].innerText =
            this.curr_date.toLocaleString("en-us", {month: "long", year: "numeric"});
    }

    renderCalendarTable() {
        let calendarTable = this.container.getElementsByClassName("calendar--main")[0];

        // weekdays
        calendarTable.innerHTML = `
            <div class="calendar--week-line">
                ${weekdays.map(weekday => `<p class="calendar--weekday">${weekday}</p>`).join("")}
            </div>
        `;

        // dates
        let first_day = this.getFirstDay();
        for (let i = 0; i < 6; i++) {
            let week = document.createElement("div");
            week.className = "calendar--week-line";

            for (let j = 0; j < 7; j++) {
                let date = new Date(this.curr_date.getFullYear(), this.curr_date.getMonth(), i * 7 + j - first_day + 2);
                let button = document.createElement("button");

                button.classList.add("calendar--day");
                if (date.getMonth() !== this.curr_date.getMonth()) button.classList.add("calendar--day__passive");
                else if (date.getDate() === this.curr_date.getDate()) button.classList.add("calendar--day__active");
                button.innerText = date.getDate().toString();

                week.appendChild(button);
            }

            calendarTable.appendChild(week);
        }
    }

    create() {
        this.createBaseElements();
        this.renderHeader();
        this.renderCalendarTable();
    }

    createBaseElements() {
        this.container.innerHTML = `
            <fieldset class="calendar--header">
                <button class="calendar--button" id="calendar--dec-month">&lt</button> <!--keyboard_arrow_up keyboard_arrow_down-->
                <p class="calendar--month-name"></p>
                <button class="calendar--button" id="calendar--inc-month">&gt</button>
            </fieldset>
            <fieldset class="calendar--main">
            </fieldset>
        `;
    }
}