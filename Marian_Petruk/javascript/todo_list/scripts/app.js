function newItem() {
    let item = document.getElementById("input").value;
    if (item.length !== 0) {
        let ul = document.getElementById("list");
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("- " + item));
        ul.appendChild(li);
        document.getElementById("input").value = "";
        li.ondblclick = removeItem;
    }
}

document.body.onkeyup = function (e) {
    if (e.code === "Enter") {
        newItem();
    }
};

function removeItem(e) {
    e.target.parentElement.removeChild(e.target);
}

console.log("Double click on li item to remove it");


let refreshIntervalId = setInterval(function () {
    if (document.getElementById("list") !== null) {
        let items = document.getElementById("list").getElementsByTagName("li");
        for (let i = 0; i < items.length; ++i) {
            items[i].ondblclick = removeItem;
        }
        clearInterval(refreshIntervalId);
    }
}, 50);

