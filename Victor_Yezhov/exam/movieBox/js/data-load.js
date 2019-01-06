

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function createHTML() {
    loadJSON(function(response) {
        var template = document.getElementById("film-template").innerHTML;
        var compiledTemplate = Handlebars.compile(template);
        var actual_JSON = JSON.parse(response);
        var generatedHTML = compiledTemplate(actual_JSON);
        var container = document.getElementById("film-container");
        container.innerHTML = generatedHTML
    });
}


createHTML();