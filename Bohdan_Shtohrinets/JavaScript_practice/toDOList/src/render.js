import addItemToDOM from './addToDOM'
import {data} from './localStorage'

function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (let i = 0; i < data.todo.length; i++) {
        let value = data.todo[i];
        addItemToDOM(value);
    }

    for (let j = 0; j < data.completed.length; j++) {
        let value = data.completed[j];
        addItemToDOM(value, true);
    }
}

export default renderTodoList