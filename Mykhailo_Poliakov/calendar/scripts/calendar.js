class Calendar {
    constructor(startMonday=true) {
        this.today = new Date();
        this.month = this.today.getMonth();
        this.year = this.today.getFullYear();
        this.startMonday = startMonday;

        this.activeDay = this.today.getDate();
       
        this.months = ["January", "February", "March", "April", 
                       "May", "June", "July", "August", "September", 
                       "October", "November", "December"];
    
        this.show();

        this.input();
       
    }

    next() {
        this.year = (this.month === 11) ? this.year + 1 : this.year;
        this.month = (this.month + 1) % 12;
        this.show();
    }

    previous() {
        this.year = (this.month === 0) ? this.year - 1 : this.year;
        this.month = (this.month === 0) ? 11 : this.month - 1;
        this.show();
    }

    show() {
        document.querySelector(".calendar__date").innerHTML = this.months[this.month];
        document.querySelector(".todo__date").innerHTML = 
        this.activeDay + " " + this.months[this.month] + " " + this.year;

        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let firstDay = new Date(this.year, this.month).getDay();
        
        if (this.startMonday) {
            days.push(days.shift());
            firstDay = (firstDay + 6) % 7;
        }
        
        let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    
        let calendarMain = document.querySelector(".calendar__main");
        calendarMain.innerHTML = "";
        
        
        let date = 1;

        for (let i = 0; i < 7; i++) {
        
            let row = document.createElement("ul");
            row.classList.add("days");
    
            for (let day = 0; day < days.length; day++) {
                let cell = document.createElement("li");
                cell.classList.add("days__day");
    
                let cellText;
    
                if (i === 0) {
                    cellText = document.createTextNode(days[day]);
                } else if (i === 1 && day < firstDay || date > daysInMonth) {
                    cellText = document.createTextNode("");
                } else {
                    cellText = document.createTextNode(date);
                    cell.classList.add("days__day--date");
                    if (date === this.activeDay) cell.classList.add("days__day--active");
                    date++;
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            calendarMain.appendChild(row); 
        }

        this.selectDate();
        this.todoList();
    }

    selectDate() {
        let self = this;

        Array.prototype.forEach.call(document.querySelectorAll(".days__day--date"), function(element) {
            element.addEventListener("click", handler, false);
        });

        function handler() {
            self.activeDay = parseInt(this.innerHTML);
            self.show();
        }
    }

    todoList() {
        let todoList = document.querySelector(".todo__list");
        todoList.innerHTML = "";

        let d = JSON.parse(localStorage.getItem('storage'));

        if (d == null) {
            localStorage.setItem('storage', JSON.stringify(
                [{"day": 0, "month": 0, "year": 0, "items": ["0"]}]
            ));
        } else {
            for (let i = 0; i < d.length; i++) {
                if (d[i].day === this.activeDay && d[i].month === this.month && d[i].year === this.year) {          
                    for (let j = 0; j < d[i].items.length; j++) {
                        let item = document.createElement("li");
                        item.classList.add("todo__item");
                        item.appendChild(document.createTextNode(d[i].items[j]));
                        todoList.appendChild(item);
                    }
                }
            } 
        }
    }

    input() {
        let self = this;

        document.querySelector(".todo__input").addEventListener("change", function (e) {
            let item = this.value;
            this.value = "";
            let d = JSON.parse(localStorage.getItem('storage'));        
            let isDayFound = false;
            for (let i = 0; i < d.length; i++) {
                if (d[i].day === self.activeDay && d[i].month === self.month && d[i].year === self.year) {          
                    d[i].items.push(item);
                    localStorage.setItem('storage', JSON.stringify(d));
                    isDayFound = true;
                }
            } 

            if (!isDayFound) {
                d.push({"day": self.activeDay, "month": self.month, "year": self.year, "items": [item]})
                localStorage.setItem('storage', JSON.stringify(d));
            }

            self.show();
            
        });
    }
}

//localStorage.clear();
let calendar = new Calendar();
