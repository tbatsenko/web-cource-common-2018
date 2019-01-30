function drawBarsGraph(data) {
    d3.select("svg").remove();
    d3.select("svg").remove();
    let margin = {top: 20, right: 160, bottom: 35, left: 30};
    let width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    let svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let parse = d3.time.format("%Y-%m-%d").parse;

    let dataset = d3.layout.stack()(chosenCurrencies.map(function (currency) {
        return data.map(function (d) {
            return {x: parse(d.year), y: +d[currency]};
        });
    }));

    let x = d3.scale.ordinal()
        .domain(dataset[0].map(function (d) {
            return d.x;
        })).rangeRoundBands([10, width - 10], 0.02);

    let y = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d3.max(d, function (d) {
                return d.y0 + d.y;
            });
        })])
        .range([height, 0]);

    let colorsOptions = ["#d25c4d", "#f2b447", "#d9d574", "b33040"];
    let colors = [];
    let i = 0;
    for (let elem in chosenCurrencies) {
        colors.push(colorsOptions[i]);
        i += 1;
    }
    let yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat(function (d) {
            return d
        });

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y-%m-%d"));

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    let groups = svg.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function (d, i) {
            return colors[i];
        });

    let rect = groups.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("y", function (d) {
            return y(d.y0 + d.y);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y0 + d.y);
        })
        .attr("width", x.rangeBand())
        .on("mouseover", function () {
            tooltip.style("display", null);
        })
        .on("mouseout", function () {
            tooltip.style("display", "none");
        })
        .on("mousemove", function (d) {
            let xPosition = d3.mouse(this)[0] - 15;
            let yPosition = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d.y);
        });

    // Draw legend
    let legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(30," + i * 19 + ")";
        });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d, i) {
            return colors[i];
        });

    legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d, i) {
            return chosenCurrencies[i];
        });

    let tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("rect")
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);

    tooltip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");

}

function preprocessData(data) {
    let outData = [];
    let rates = data["rates"];
    let chosenDates = ["2018-01-22", "2018-04-23", "2018-07-23", "2018-11-23", "2019-01-25"];
    let moneyConverted = [];
    // console.log(rates);
    rates = sortOnKeys(rates);
    for (let key in rates) {
        if (rates.hasOwnProperty(key)) {
            let elem = {};
            elem["year"] = key;
            if (chosenDates.includes(key)) {
                for (let innerKey in rates[key]) {
                    if (rates[key].hasOwnProperty(innerKey)) {
                        if (chosenCurrencies.includes(innerKey)) {
                            elem[innerKey] = (myMoney[innerKey] / rates[key][innerKey]).toFixed(3);
                        }
                    }
                }
                moneyConverted.push(elem);
            }
        }
    }

    return moneyConverted;
}

function createChart() {
    let request = new XMLHttpRequest();
    let line = "https://api.exchangeratesapi.io/history?start_at=2018-01-20&end_at=2019-01-26&symbols={currs}&base={1}";
    let currStr = "";
    for (let key in myMoney) {
        if (baseCurrencyOptions.includes(key)) {
            currStr += key + ",";
        }
    }
    currStr = currStr.substr(0, currStr.length - 1);
    line = line.replace("{currs}", currStr);
    line = line.replace("{1}", baseCurrency);
    request.open('GET', line, true);
    request.onload = function () {
        // Begin accessing JSON data here
        let chosenDates = ["2018-01-22", "2018-04-23", "2018-07-23", "2018-11-23", "2019-01-25"];
        let testData = JSON.parse(this.response);
        let finalData = {};
        for (let key in testData["rates"]) {
            if (chosenDates.includes(key)) {
                finalData[key] = testData["rates"][key]
            }
        }
        finalData = sortOnKeys(finalData);
        let data = preprocessData(testData);
        // console.log(data);
        console.log(finalData);
        drawBarsGraph(data);
        drawLineGraph(finalData);
    };
    request.send();
}

function sortOnKeys(dict) {

    let sorted = [];
    for (let key in dict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();

    let tempDict = {};
    for (let i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = dict[sorted[i]];
    }

    return tempDict;
}

