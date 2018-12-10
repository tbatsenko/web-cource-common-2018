let d = new Date();
const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var allCells = [];
var cellsWithTasks = {"30-12-2018": "sdfsfsdf"};

setHeader(d);
createCalendar(d);

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
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getUTCFullYear();
    document.getElementById("year").textContent = month + "/" + year;
}


function createCalendar(d) {
    let i;
    let row;
    let skipDays = new Date(d.getFullYear(), d.getMonth(), 1).getDay() - 1;
    let monthDays = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const table = document.getElementById("calendar-body");
    table.innerHTML = "";

    let rowAmount = Math.floor((monthDays + skipDays) / 7) + 1;

    for (let j = 1; j <= rowAmount; j++) {
        row = table.insertRow(0);
        for (i = 0; i <= 6; i++) {
            let cell = row.insertCell(i);
            cell.textContent = "a";

        }
    }

    let dates = [];
    if (skipDays === 0)
        dates.push(" ");

    for (let j = 0; j <= skipDays + monthDays; j++) {
        if (j <= skipDays) {
            dates.push(" ");
        } else {
            dates.push(j - skipDays);
        }
    }
    i = 1;
    row = table.rows[0];
    for (let j = 1; j <= rowAmount; j++) {
        // let cell;
        while (i % 7 !== 0) {
            let cell = row.cells[i % 7 - 1];
            cell.textContent = dates[i - 1];
            if (dates[i - 1] === d.getDate() && d.getMonth() === new Date().getMonth())
                cell.innerHTML = cell.textContent.bold();
            cell.onclick = function () {
                showTasks(cell, d.getMonth() + 1, d.getFullYear());
            };
            if (dates[i - 1] !== " ")
                allCells.push(cell);
            i++;
        }
        let cell = row.cells[6];
        row.cells[6].textContent = dates[i - 1];
        if (dates[i - 1] === d.getDate() && d.getMonth() === new Date().getMonth())
            cell.innerHTML = cell.textContent.bold();
        cell.onclick = function () {
            showTasks(cell, d.getMonth() + 1, d.getFullYear());
        };
        i++;
        row = table.rows[j];
    }
    let headerRow = table.insertRow(0);
    for (let j = 0; j <= 6; j++) {
        headerRow.insertCell(0);
    }
    for (let j = 0; j <= 6; j++) {
        headerRow.cells[j].textContent = weekDayNames[j];
    }
    tasksCreator(d.innerText, d.getMonth(), d.getFullYear(), monthDays);
}

function showTasks(cell, month, year) {
    // cell.innerText + "-" + month + "-" + year
    console.log(cellsWithTasks[cell.innerText + "-" + month + "-" + year]);
    console.log(cellsWithTasks);
    console.log(cell.innerText + "-" + month + "-" + year);
    const box = document.getElementById("tasks");
    let task = cellsWithTasks[cell.innerText + "-" + month + "-" + year];
    if (task != null) {
        box.innerText = cellsWithTasks[cell.innerText + "-" + month + "-" + year];
    } else {
        box.innerText = "No tasks for " + cell.innerText + "-" + month + "-" + year;
    }


    // "tasks"

}

function tasksCreator(day, month, year, monthDays) {
    var tasksCreator = document.getElementById("tasksCreator");
    tasksCreator.innerHTML = "";
    var monthDaysOptions = [];
    var yearsOptions = [];
    var monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    for (let i = 1; i <= monthDays; i++) {
        monthDaysOptions.push(i);
    }
    for (let i = 1999; i <= 2030; i++) {
        yearsOptions.push(i);
    }

//Create and append select list
    var daysSelectList = document.createElement("select");
    var monthSelectList = document.createElement("select");
    var yearSelectList = document.createElement("select");


    tasksCreator.appendChild(daysSelectList);
    daysSelectList.id = "day";
    for (var i = 0; i < monthDaysOptions.length; i++) {
        let option = document.createElement("option");
        option.value = monthDaysOptions[i];
        option.text = monthDaysOptions[i];
        daysSelectList.appendChild(option);
    }

    tasksCreator.appendChild(monthSelectList);
    monthSelectList.id = "month";
    for (let i = 0; i < monthOptions.length; i++) {
        let option = document.createElement("option");
        option.value = monthOptions[i];
        option.text = monthOptions[i];
        monthSelectList.appendChild(option);
    }

    tasksCreator.appendChild(yearSelectList);
    yearSelectList.id = "year-options";
    for (let i = 0; i < yearsOptions.length; i++) {
        let option = document.createElement("option");
        option.value = yearsOptions[i];
        option.text = yearsOptions[i];
        yearSelectList.appendChild(option);
    }
    var inputBox = document.createElement("INPUT");
    inputBox.id = "input-box";
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("value", "...");
    document.body.appendChild(inputBox);

    var button = document.createElement("button");
    button.innerText = "Add task";
    button.onclick = function () {
        // var enteredDay = enteredDayObject.options[enteredDayObject.selectedIndex].text;
        addTask();
    };
    document.body.appendChild(button);
}

function addTask() {
    let enteredText = document.getElementById("input-box").value;
    let enteredDayObject = document.getElementById("day").value;
    let enteredMonthObject = document.getElementById("month").value;
    let enteredYearObject = document.getElementById("year-options").value;
    // var cellsWithTasks = {"30-12-2018": "sdfsfsdf"};
    cellsWithTasks[enteredDayObject + "-" + enteredMonthObject + "-" + enteredYearObject] = enteredText;

}