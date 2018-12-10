import TodoList from './TodoList'
import Calendar from './Calendar'

const form = document.getElementById("newTaskForm");
const input = document.getElementById("newTaskInput");

let calendar = new Calendar(document.getElementById('calendarPlaceholder'));
let todoList = new TodoList(document.getElementById('content'), form, input, calendar);
calendar.todoList = todoList;

todoList.addBtnFilter(document.getElementById('filter-all'), 'all');
todoList.addBtnFilter(document.getElementById('filter-done'), 'done');
todoList.addBtnFilter(document.getElementById('filter-active'), 'active');

todoList.addBtnRemoveByFilter(document.getElementById('clear-done'), 'done');
