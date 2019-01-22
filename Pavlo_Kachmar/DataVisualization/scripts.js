const currencyOptions = ["USD", "CAD", "GBP", "CHF"];
let chosenCurrencies = [currencyOptions[0]];
let baseCurrency = "USD";
let myMoney = {"USD": 1};

function tasksCreator() {
    let inputBox = document.createElement("INPUT");
    let moneyAmount = document.createElement("LABEL");
    let tasksCreator = document.getElementById("currencies");
    let singleCurrency = document.createElement("section");

    tasksCreator.appendChild(singleCurrency);

    let currencySelectList = document.createElement("select");

    singleCurrency.appendChild(currencySelectList);
    for (let i = 0; i < currencyOptions.length; i++) {
        let option = document.createElement("option");
        option.value = currencyOptions[i];
        option.text = currencyOptions[i];
        currencySelectList.appendChild(option);
    }
    currencySelectList.onclick = function () {
        if (!(chosenCurrencies.includes(currencySelectList.value)))
            chosenCurrencies.push(currencySelectList.value);
        countAmount(currencySelectList.value, inputBox.value, moneyAmount)
    };

    inputBox.id = "input-box";
    inputBox.setAttribute("type", "number");
    inputBox.setAttribute("value", "1");
    inputBox.min = 1;
    inputBox.onchange = function () {
        if (!(chosenCurrencies.includes(currencySelectList.value)))
            chosenCurrencies.push(currencySelectList.value);
        countAmount(currencySelectList.value, inputBox.value, moneyAmount)
    };
    singleCurrency.appendChild(inputBox);

    moneyAmount.id = "moneyAmount";
    moneyAmount.innerText = "1";
    singleCurrency.appendChild(moneyAmount);
}

function countAmount(currency, amount, moneyAmount) {
    let line = "https://api.exchangeratesapi.io/latest?base={1}";
    line = line.replace("{1}", baseCurrency);
    convert(line, currency, parseFloat(amount), moneyAmount);
}


function convert(line, currency, amount, moneyAmount) {
    let request = new XMLHttpRequest();

    request.open('GET', line, true);
    request.onload = function () {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);
        moneyAmount.innerText = ((amount / parseFloat(data["rates"][currency])).toFixed(3)).toString();
        myMoney[currency] = moneyAmount.innerText;
        createChart();
    };
    request.send();
    createChart();
}

function start() {
    let selectCreator = document.getElementById("currency-selection");
    let baseCurrencySelectList = document.createElement("select");
    for (let i = 0; i < currencyOptions.length; i++) {
        let option = document.createElement("option");
        option.value = currencyOptions[i];
        option.text = currencyOptions[i];
        baseCurrencySelectList.appendChild(option);
    }
    selectCreator.id = "currency-select-dropdown";
    baseCurrencySelectList.onclick = function () {
        baseCurrency = baseCurrencySelectList.value;
        createChart();
    };
    selectCreator.appendChild(baseCurrencySelectList);
    tasksCreator();
}

start();