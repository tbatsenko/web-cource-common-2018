function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function generateMonth(month, year) {
    if (month < 0 || month > 11) {
        alert("error");
        return;
    }
    let today = new Date();
    year = (year === undefined) ? today.getFullYear() : year;
    month = (month === undefined) ? today.getMonth() : month;
    let firstDay = new Date(year + '-' + (month + 1) + '-' + 1);
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    if (month === 1) {
        daysInMonth += year % 4 ? 0 : 1;
    }
    let offset = firstDay.getDay();

    let monthTable = [[]];
    let currWeek = 0;

    if (offset > 1) {
        for (let i = 1; i < offset; i++) {
            monthTable[currWeek].push(-1);
        }
    }
    else {
        for (let i = 1; i < 7; i++) {
            monthTable[currWeek].push(-1);
        }

    }
    while (offset - firstDay.getDay() !== daysInMonth) {
        if ((offset - 1) % 7 === 0) {
            currWeek++;
            monthTable.push([]);
        }
        monthTable[currWeek].push(
            new Date(year, month, offset - firstDay.getDay() + 1)
        );
        offset++;
    }
    while (monthTable[monthTable.length - 1].length !== 7) {
        monthTable[monthTable.length - 1].push(-1);
    }
    while (monthTable.length < 6) {
        monthTable.push([-1, -1, -1, -1, -1, -1, -1])
    }

    return monthTable;
}

function compareDayMonthYear(d1, d2) {
    return d1.getDay() === d2.getDay() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate() && d1.getFullYear() === d2.getFullYear();
}

function isHoliday(day) {
    if (day.getDay() === 0){
        return "Sunday"
    } else if (day.getDay() === 6){
        return "Saturday"
    }

    const holidays = [
        {month:0, date:1, name:"New Year"},
        {month:2, date:8, name:"International Women's Day"}
        ];
    for (let i in holidays){
        if (holidays[i].month === day.getMonth() && holidays[i].date === day.getDate()){
            return holidays[i].name;
        }
    }
    return undefined;
}

export {createElementFromHTML, generateMonth, compareDayMonthYear, isHoliday};