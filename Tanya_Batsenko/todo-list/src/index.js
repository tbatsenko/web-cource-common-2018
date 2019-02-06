import '@babel/polyfill';

import Calendar from './js/Calendar';
import TodoList from './js/TodoList';
import Application from './js/Application';

import './styles/style.scss';

const todoList = new TodoList();
const myCalendar = new Calendar();

const application = new Application(todoList, myCalendar);

window.application = application;
