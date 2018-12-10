var d = new Date();
var weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


setHeader(d);
createCalendar(d);

console.log(d.getMonth());

function prevMonth() {
    d.setMonth(d.getMonth() - 1);
    renderPage(d);
}

function nextMonth() {
    d.setMonth(d.getMonth() + 1);
    renderPage(d);
}

function renderPage(date) {
    setHeader(date);
    createCalendar(date);
}

function setHeader(dateObj) {
    let month = dateObj.getUTCMonth() + 1;
    let year = dateObj.getUTCFullYear();
    document.getElementById("year").textContent = month + "/" + year;
}


function createCalendar(d) {

    let row;
    let skipDays = new Date(d.getFullYear(), d.getMonth(), 1).getDay() - 1;
    console.log(skipDays);
    let monthDays = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
    var table = document.getElementById("calendar-body");
    table.innerHTML = "";




    let rowAmount = Math.floor((monthDays + skipDays) / 7) + 1;
    console.log(rowAmount);
    for (let j = 1; j <= rowAmount; j++) {
        row = table.insertRow(0);
        for (i = 0; i <= 6; i++) {
            let cell = row.insertCell(i);
            cell.textContent = "a";
        }
    }
    var dates = [];
    for (let j = 0; j <= skipDays + monthDays + 1; j++) {
        if (j <= skipDays) {
            dates.push(" ");
        } else {
            dates.push(j - skipDays);
        }
    }
    var i = 1;
    row = table.rows[0];
    for (let j = 1; j <= rowAmount; j++) {

        while (i % 7 !== 0) {
            row.cells[i % 7 - 1].textContent = dates[i - 1];
            i++;
        }
        row.cells[6].textContent = dates[i - 1];
        i++;
        row = table.rows[j];
    }
    let headerRow = table.insertRow(0);
    for (let j = 0; j <= 6; j++) {
        headerRow.insertCell(0);
    }
    for (let j = 0; j <= 6; j++) {
        headerRow.cells[j].innerText = weekDayNames[j];
    }
}