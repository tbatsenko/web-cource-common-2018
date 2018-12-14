class Render {
    static generateCalendar(month, year, monthList) {
        let monthName = document.getElementById("months-name")
        monthName.innerText = `${monthList[month]} ${year}`

        let dates = document.getElementById("dates")
        dates.innerHTML = ""

        let first = new Date(month, year).getDay()
        let daysInMonth = 32 - new Date(year, month, 32).getDate()

        for (let i = -first; i <= daysInMonth; i++) {
            if (i < 1) {
                dates.innerHTML += `<a class="dates__day" href="#"></a>`
            } else dates.innerHTML += `<a class="dates__day" href="#">${i}</a>`
        }
    }
}

export default Render