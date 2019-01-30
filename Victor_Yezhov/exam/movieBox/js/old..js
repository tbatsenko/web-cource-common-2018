let loadJSON = function() {
    let xobj = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {

        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'js/data.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                resolve(xobj.responseText);
            }else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };
        xobj.send(null);
    })
};
function createHTML(json) {
    let template = document.getElementById("film-template").innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let actual_JSON = JSON.parse(json);
    let generatedHTML = compiledTemplate(actual_JSON);
    let container = document.getElementById("film-container");
    container.innerHTML = generatedHTML
}
loadJSON().then(function (films) {
    createHTML(films)
});