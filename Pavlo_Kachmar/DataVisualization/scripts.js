var currencyOptions = ["USD", "CAD", "GBP", "CHF"];
let chosenCurrencies = [currencyOptions[0]];

function tasksCreator() {
    // console.log(document);
    let inputBox = document.createElement("INPUT");
    let moneyAmount = document.createElement("LABEL");
    let tasksCreator = document.getElementById("currencies");
    let singleCurrency = document.createElement("section");


    tasksCreator.appendChild(singleCurrency);

    // let tasksCreator = document.getElementById("single-currency");


    let currencySelectList = document.createElement("select");

    singleCurrency.appendChild(currencySelectList);
    for (let i = 0; i < currencyOptions.length; i++) {
        let option = document.createElement("option");
        option.value = currencyOptions[i];
        option.text = currencyOptions[i];
        currencySelectList.appendChild(option);
        // console.log(singleCurrency);
    }
    currencySelectList.onclick = function () {
        if (!(chosenCurrencies.includes(currencySelectList.value)))
            chosenCurrencies.push(currencySelectList.value);
        countAmount(currencySelectList.value, inputBox.value, moneyAmount)
    };


    inputBox.id = "input-box";
    inputBox.setAttribute("type", "number");
    inputBox.setAttribute("value", "0");
    inputBox.min = 0;
    inputBox.onchange = function () {
        if (!(chosenCurrencies.includes(currencySelectList.value)))
            chosenCurrencies.push(currencySelectList.value);
        countAmount(currencySelectList.value, inputBox.value, moneyAmount)
    };
    singleCurrency.appendChild(inputBox);

    moneyAmount.id = "moneyAmount";
    moneyAmount.innerText = 0;
    singleCurrency.appendChild(moneyAmount);

    // let button = document.createElement("button");
    // button.innerText = "Add task";
    // button.onclick = function () {
    //     // addTask();
    // };
    // tasksCreator.appendChild(button);

}

function countAmount(currency, amount, moneyAmount) {
    // let line = "http://data.fixer.io/api/latest?access_key=ac1969cb45896a9555146f17df32442e";
    let line = "https://api.exchangeratesapi.io/latest";
    // console.log(line);
    convert(line, currency, parseFloat(amount), moneyAmount);
}


function convert(line, currency, amount, moneyAmount) {
    let request = new XMLHttpRequest();

    request.open('GET', line, true);
    request.onload = function () {

        // Begin accessing JSON data here
        let data = JSON.parse(this.response);
        moneyAmount.innerText = ((amount / parseFloat(data["rates"][currency])).toFixed(3)).toString();
        // console.log(amount, parseFloat(data["rates"][currency]));
    };
    request.send();
    createChart();

}

tasksCreator();


// http://data.fixer.io/api/convert?access_key=ac1969cb45896a9555146f17df32442e&from=GBP&to=USD&amount=25