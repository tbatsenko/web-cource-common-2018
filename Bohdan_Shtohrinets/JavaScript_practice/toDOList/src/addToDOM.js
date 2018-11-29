import {removeItem, completeItem} from './buttonModifiers'

function addItemToDOM(text, completed) {
    let list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    let item = document.createElement('form');
    item.className = "task-list__task"

    item.innerHTML += `
    <label class="task__name" for="check">${text}</label>
    <input type="text" class="input-task input-task_inactive">
  `

    let checkbox = document.createElement('button')
    checkbox.classList.add("task-list__buttons", "buttons__checkbox", "task__buttons_first")
    checkbox.addEventListener('click', completeItem)

    item.appendChild(checkbox)

    let buttons = document.createElement('div');
    buttons.classList.add('buttons', 'task__buttons_last');

    let edit = document.createElement("button")
    edit.classList.add("task-list__buttons", "buttons__edit")
    edit.addEventListener('click', removeItem)

    let remove = document.createElement('button')
    remove.classList.add("task-list__buttons", "buttons__delete")
    remove.addEventListener('click', removeItem);

    buttons.appendChild(edit)
    buttons.appendChild(remove)
    item.appendChild(buttons)

    list.insertBefore(item, list.childNodes[0]);
}


export default addItemToDOM