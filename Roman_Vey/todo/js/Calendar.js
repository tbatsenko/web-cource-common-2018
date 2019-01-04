class Calendar{
    constructor(container, list){
        this.monthNames = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "November", "October", "December"];
        this.container = container;
        this.list = list;
        this.selected = new Date();
        this.month = this.getFirstDay(this.selected);
        this.render();
        this.addListener();
    }
    addListener = () => {
        this.container.addEventListener("click", (e) =>{
            e.preventDefault();
            if (e.target !== e.currentTarget) {
                let clickedItem = e.target;
                if (clickedItem.classList.contains("calendar__item") &&
                    !clickedItem.classList.contains("calendar__item--empty") &&
                    !clickedItem.classList.contains("calendar__item--selected") &&
                    !clickedItem.classList.contains("calendar__item--header")) {
                        this.selected.setDate(clickedItem.innerText);
                        this.selected.setMonth(this.month.getMonth());
                        this.selected.setFullYear(this.month.getFullYear());
                        this.list.render();        
                        this.render();
                }
                else if(clickedItem.classList.contains("calendar__left-arrow")){
                        this.previous();
                        this.render();
                }
                else if(clickedItem.classList.contains("calendar__right-arrow")) {
                        this.next();
                        this.render();
                }
            }
            e.stopPropagation();
        })
    }
    next = () => {
        this.month.setMonth(this.month.getMonth() + 1);
    }
    previous = () => {
        this.month.setMonth(this.month.getMonth() - 1);    
    }
    daysInMonth = () =>{
        return 32 - new Date(this.month.getFullYear(), this.month.getMonth(), 32).getDate();
    }
    getFirstDay = (date) =>{
        return new Date(date.getFullYear(), date.getMonth(), 2);
    }
    getFirstIndex = () => {
        return (this.month.getDay() + 5) % 7;
    }
    setDate = (date) => {
        this.now.setDate(date);
    }
    render = () => {
        this.renderHeader();
        let amountOfDays = this.daysInMonth();
        let firstIndex = this.getFirstIndex();
        for (let week = 0; week < 6; week++){
            let weekContainer = document.createElement("div");
            weekContainer.classList.add("calendar__row");
            for(let day = 0; day < 7; day++){
                let dayContainer = document.createElement("button");
                let currentIndex = week * 7 + day;
                dayContainer.classList.add("material-btn");
                dayContainer.classList.add("calendar__item");
                if (currentIndex < firstIndex || currentIndex - firstIndex >= amountOfDays){
                    dayContainer.classList.add("calendar__item--empty");
                } else {
                    dayContainer.textContent = (currentIndex - firstIndex + 1).toString();
                }
                if (currentIndex - firstIndex + 1 === this.selected.getDate() && 
                this.month.getMonth() === this.selected.getMonth() &&
                this.month.getFullYear() === this.selected.getFullYear()) {
                    dayContainer.classList.add("calendar__item--selected");
                }
                weekContainer.appendChild(dayContainer);
            }
            this.container.appendChild(weekContainer);
        }
    }
    renderHeader = () => {
        this.container.innerHTML = `
        <header class="calendar__header noselect">
            <div class="calendar__left-arrow">&lt;</div>
            <div class="calendar__name">TodoMe</div>
            <div class="calendar__right-arrow">&gt;</div>
        </header>
        <header class="calendar__header-date noselect">
            ${this.monthNames[this.month.getMonth()]} ${this.month.getFullYear()}
        </header>
        <div class="calendar__row calendar__row--header noselect">
            <button class="material-btn calendar__item calendar__item--header">Mon</button>
            <button class="material-btn calendar__item calendar__item--header">Tue</button>
            <button class="material-btn calendar__item calendar__item--header">Wed</button>
            <button class="material-btn calendar__item calendar__item--header">Thu</button>
            <button class="material-btn calendar__item calendar__item--header">Fri</button>
            <button class="material-btn calendar__item calendar__item--header">Sat</button>
            <button class="material-btn calendar__item calendar__item--header">Sun</button>
        </div>
    `
    }
}
module.exports = Calendar;