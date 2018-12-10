import addItemToDOM from './addToDOM'
import {data, dataObjectUpdated} from './localStorage'

function addItem(value) {
    addItemToDOM(value);
    document.getElementById('item').value = '';

    data.todo.push(value);
    dataObjectUpdated();
}


function removeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

    if (id === 'todo')
        data.todo.splice(data.todo.indexOf(value), 1);
    else
        data.completed.splice(data.completed.indexOf(value), 1);

    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem() {
    let item = this.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();

    // Check if the item should be added to the completed list or to re-added to the todo list
    let target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

export {addItem, removeItem, completeItem}