import Calendar from './js/Calendar';
import TodoList from './js/TodoList';
import Application from './js/Application';

const serverURL = 'http://localhost:3000';

const todoList = new TodoList(serverURL);
const myCalendar = new Calendar(todoList);

const application = new Application(todoList, myCalendar);

window.myCalendar = myCalendar;
window.todoList = todoList;
