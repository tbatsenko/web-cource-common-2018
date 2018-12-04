import {createItem} from './createItem';
import {itemData, storeItem, removeFromStorage} from './storage-utils';

const todoInput = document.querySelector('.input-group__input');
const addClicker = document.querySelector('.input-group__addItem');
const todoList = document.querySelector('.todo__list');

function inputValidator(value) {
    if (value !== '' && value !== ' ' && value !== '  ') return true
}

function clearInput() {
    todoInput.value = '';
}

function addItem(item) {
    todoList.appendChild(item);
}

function addHandlers(item) {
    item.querySelector('.todo__completed').addEventListener('click', function() {
        const item = this.parentElement;
        item.querySelector('.todo__content').classList.toggle('todo__content--completed');
    });

    item.querySelector('.todo__edit').addEventListener('click', function() {
        const item = this.parentElement;
        todoList.removeChild(item);

        const content = item.querySelector('.todo__content').innerText;
        todoInput.value = content;
        removeFromStorage(content);
    });

    item.querySelector('.todo__remove').addEventListener('click', function() {
        const item = this.parentElement;
        todoList.removeChild(item);

        const content = item.querySelector('.todo__content').innerText;
        removeFromStorage(content);
    });
}

// getting input text
addClicker.addEventListener('click', function () {
    const inputValue = todoInput.value;

    if (inputValidator(inputValue)) {
        // create item
        const newItem = createItem(inputValue);
        storeItem(inputValue);
        clearInput();

        // add event handlers;
        addHandlers(newItem);

        // add item to the list
        addItem(newItem);
    }
});



