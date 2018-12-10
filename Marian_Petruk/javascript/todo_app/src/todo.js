function newItem() {
  let item = document.getElementById("input").value;
  if (item.length !== 0) {
    let ul = document.getElementById("todo-list__list");
    let li = document.createElement("li");
    li.className = "todo-list__item";
    let input_checkbox = document.createElement("input");
    input_checkbox.className = "todo-list__task-checkbox";
    input_checkbox.type = "checkbox";
    li.appendChild(input_checkbox);
    let task = document.createElement("span");
    task.innerText = item;
    task.className = "todo-list__task";
    li.appendChild(task);
    ul.appendChild(li);
    document.getElementById("input").value = "";
    // li.ondblclick = removeItem;

    let selected_date = document.getElementsByClassName(
      "calendar__date--selected"
    )[0];
    if (selected_date === undefined) {
      selected_date = document.getElementsByClassName(
        "calendar__date--today"
      )[0];
    }
    let date = new Date(selected_date.getAttribute("data-calendar-date"));
    console.log(date.getDate());
  }
}

document.body.onkeyup = function(e) {
  if (e.code === "Enter") {
    newItem();
  }
};

function removeItem(e) {
  e.target.parentElement.removeChild(e.target);
}
