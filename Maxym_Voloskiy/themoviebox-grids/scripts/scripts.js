const render = async (templateURL, dataURL, container) => {
    const source = await (await fetch(templateURL)).text();
    const template = Handlebars.compile(source);
    const data = await (await fetch(dataURL)).json();
    container.innerHTML = template(data);
};
render("main.handlebars", "json/data.json", document.body )