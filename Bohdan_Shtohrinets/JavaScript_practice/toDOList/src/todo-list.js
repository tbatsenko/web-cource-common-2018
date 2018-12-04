import renderTodoList from './render'
import {addItem} from './buttonModifiers'

renderTodoList();

document.getElementById('add').addEventListener('click', function () {
    let value = document.getElementById('item').value;
    if (value)
        addItem(value);
});

document.getElementById('item').addEventListener('keydown', function (e) {
    let value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value)
        addItem(value);
});

