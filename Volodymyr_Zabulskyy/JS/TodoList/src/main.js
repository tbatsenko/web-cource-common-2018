import TodoList from './TodoList'
import TodoItem from './TodoItem'

let todoList = new TodoList(document.getElementById('content'));
todoList.addBtnFilterAll(document.getElementById('filter-all'));
todoList.addBtnFilterDone(document.getElementById('filter-done'));
todoList.addBtnFilterActive(document.getElementById('filter-active'));

const form = document.getElementById("newTaskForm");
const input = document.getElementById("newTaskInput");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if (!/\S/.test(text)) return;
    todoList.addTodo(text);
    input.value = "";
});
