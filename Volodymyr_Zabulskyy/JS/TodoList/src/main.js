import TodoList from './TodoList'
import TodoItem from './TodoItem'

const form = document.getElementById("newTaskForm");
const input = document.getElementById("newTaskInput");

let todoList = new TodoList(document.getElementById('content'), form, input);
todoList.addBtnFilter(document.getElementById('filter-all'), 'all');
todoList.addBtnFilter(document.getElementById('filter-done'), 'done');
todoList.addBtnFilter(document.getElementById('filter-active'), 'active');
todoList.addBtnRemoveByFilter(document.getElementById('clear-done'), 'done');
