import Calendar from './js/Calendar';
import TodoList from './js/TodoList';

const serverURL = 'http://localhost:3000';

const todoList = new TodoList(serverURL);
const myCalendar = new Calendar(todoList);

window.myCalendar = myCalendar;
window.todoList = todoList;
