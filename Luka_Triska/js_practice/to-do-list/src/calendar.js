const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = {
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
    7: 'sunday'
};

let currMonth = new Date().getMonth();



// console.log(new Date(2018, currMonth-1).getDate());

let viewCalendar = {
    displayCalendar: function (currDate) {

        let currDay = currDate.getDate();

        let currMonth = currDate.getMonth();
        document.getElementById('month-name').textContent = months[currMonth];

        let currYear = currDate.getFullYear();
        document.getElementById('year-name').textContent = currYear;

        let firstDayInCurrMonth = new Date(currYear, currMonth, 1).getDay();
        let daysInCurrMonth = new Date(currYear, currMonth + 1, 0).getDate();

        let dayOfMonth = 1;
        for (let week = 1; week <= 6; week++) {
            // create table row for a week
            let weekTr = document.createElement("tr");
            weekTr.className = 'week-row';

            for (let day = 1; day <= 7; day++) {
                // create table row cell for a certain day
                let dayTd = document.createElement('td');
                if ((day < firstDayInCurrMonth && week === 1) || dayOfMonth > daysInCurrMonth) {
                    dayTd.className = 'day-cell-empty';
                    dayTd.textContent = '';
                } else if (dayOfMonth === new Date().getDate() && currMonth === new Date().getMonth()) {
                    dayTd.className = 'day-cell-current';
                    dayTd.textContent = new Date().getDate().toString();
                    dayOfMonth++;
                } else {
                    dayTd.className = 'day-cell-full';
                    dayTd.textContent = dayOfMonth.toString();
                    dayOfMonth++;
                }
                weekTr.appendChild(dayTd);
            }

            // make sure not to push an empty row of days
            if (week === 6) {
                let bools = [];
                for (let day of weekTr.children) bools.push(day.textContent === '');
                if (bools.includes(false)) document.getElementById('table-body').appendChild(weekTr);
            } else {
                document.getElementById('table-body').appendChild(weekTr);
            }
        }
    },
    displayDiffMonth: function (next) {
        document.getElementById('table-body').innerHTML = '';
        if (next) currMonth++; else currMonth--;
        this.displayCalendar(new Date(2018, currMonth));
    }
};


viewCalendar.displayCalendar(new Date());
