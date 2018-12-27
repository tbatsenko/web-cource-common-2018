let monthTemplate = require("../templates/month.hbs");

const renderPage = () => {
    let req = new XMLHttpRequest();
    req.open('GET', "../data/december.json");
    req.onload = function () {
        let data = JSON.parse(req.responseText);
        renderData(data);
        for (let i = 1; i <= data["description"]["days"]; i++) {
            console.log(data[i.toString()]);
        }
    };

    req.onerror = function () {
    };

    req.send();
};

const renderData = (data) => {
    const numOfDays = data["description"]["days"];
    for (let i = 0; i < numOfDays; i++) {
        console.log(data["days"][i]);
    }

    let container = document.getElementById("calendar");
    container.innerHTML = monthTemplate(data);
};




renderPage();


