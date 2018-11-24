function getItem(text, checked){
    let item = `
        <form class="section__checklist-container">
            <input class="form__checkbox" type="checkbox" {checked} id={check_button_id} onclick="completeItem(this.id)">
            <label class="checklist-container__label">{text}</label>
            <button class="form__button" id={del_button_id} onclick="removeItem(this.id)">Delete</button>
        </form>
`;
    let del_button_id = "del-button-" + button_no;
    let check_button_id = "check-button-" + button_no;
    return item.replace("{text}", text)
        .replace("{checked}", checked)
        .replace("{del_button_id}", del_button_id)
        .replace("{check_button_id}", check_button_id);
}

function addItem() {
    // Create element in TO-DO section
    button_no += 1;
    let text = document.getElementsByClassName("form__input")[0].value;
    // If no input is given, don't create anything
    if (text == ""){
        return
    }
    let toDoContainer = document.getElementById("ToDoItems");
    let item = getItem(text, "unchecked");
    toDoContainer.insertAdjacentHTML('beforeend', item);
}

function removeItem(id){
    // Remove element after click on Delete
    console.log(id);
    var e = document.getElementById(id);
    e.parentNode.parentNode.removeChild(e.parentNode);
}

function completeItem(id){
    // Append element into COMPLETED section and remove element in TODO section
    var old_node = document.getElementById(id).parentNode;
    var new_node = old_node.cloneNode(true);
    old_node.parentNode.removeChild(old_node);

    let completedContainer = document.getElementById("CompletedItems");
    completedContainer.appendChild(new_node);
}

let button_no = 0;