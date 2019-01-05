var CALENDAR = function () {
    var wrap, label,
        full_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function init(newWrap) {
        wrap = $(newWrap || ".calendar");
        label = wrap.find(".calendar__header > .label");
        //wrap.find(".prev").bind("click.calendar", function () { switchMonth(false); });
        //wrap.find(".next").bind("click.calendar", function () { switchMonth(true);  });
        //wrap.find(".next").click(switchMonth(true));
        wrap.find(".next").click({next: true}, switchMonth);
        wrap.find(".prev").click({next: false}, switchMonth);
        label.click(switchMonth);
        label.trigger("click");
        //label.bind("click", function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear()); });
        wrap.find(" td:not(.nil)").click(chooseDay);
        wrap.find(".today").trigger("click");
        //label.click();
    }

    function chooseDay () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        $(".todo__header > .label").text($(".selected").text() + " " + full_months[months.indexOf($(".calendar__header > .label").text().split(" ")[0])] + " " + $(".calendar__header > .label").text().split(" ")[1])
        $(".todo__input").focus();
    }

    function switchMonth(event) {
        var curr = label.text().trim().split(" "), calendar, tempYear =  parseInt(curr[1], 10);
        var month = event.data == null ? new Date().getMonth() : ((event.data.next) ? ( (curr[0] === "Dec") ? 0 : months.indexOf(curr[0]) + 1 ) : ( (curr[0] === "Jan") ? 11 : months.indexOf(curr[0]) - 1 ));
        var year = event.data == null ? new Date().getFullYear() : ((event.data.next && month === 0) ? tempYear + 1 : (!event.data.next && month === 11) ? tempYear - 1 : tempYear);
        calendar =  createCal(year, month);
        $(".dates").empty().append(calendar.calendar());
        wrap.find("td:not(.nil)").click(chooseDay);
        $(".calendar__header > .label").text(calendar.label);
    }

    function createCal(year, month) {
        var day = 1, i = 0, j, haveDays = true,
            startDay = new Date(year, month, day).getDay() === 0 ? 6 : new Date(year, month, day).getDay() - 1,
            daysInMonths = [31, (((year%4===0)&&(year%100!==0))||(year%400===0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            calendar = [];
        if (createCal.cache[year]) {
            console.log(createCal.cache[year])
            if (createCal.cache[year][month]) {
                return createCal.cache[year][month];
            }
        } else {
            createCal.cache[year] = {};
        }
        while (haveDays) {
            calendar[i] = [];
            for (j = 0; j < 7; j++) {
                if (i === 0) {
                    if (j === startDay) {
                        calendar[i][j] = day++;
                        startDay++;
                    }
                } else if (day <= daysInMonths[month]) {
                    calendar[i][j] = day++;
                } else {
                    calendar[i][j] = "";
                    haveDays = false;
                }
                if (day > daysInMonths[month]) {
                    haveDays = false;
                }
            }
            i++;
        }
        for (i = 0; i < calendar.length; i++) {
            calendar[i] = "<tr><td>" + calendar[i].join("</td><td>") + "</td></tr>";
        }

        calendar = $(calendar.join(""));

        $("td:empty", calendar).addClass("nil");
        if (month === new Date().getMonth()) {
            $('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today");
        }
        createCal.cache[year][month] = { calendar : function () { return calendar.clone() }, label : months[month] + " " + year };

        return createCal.cache[year][month];
    }


    createCal.cache = {};
    return {
        init : init,
        switchMonth : switchMonth,
        createCal   : createCal
    };
};

var cal = CALENDAR();

cal.init();
