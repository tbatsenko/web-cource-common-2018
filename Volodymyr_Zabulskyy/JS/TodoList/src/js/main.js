import TodoList from './TodoList'
import Calendar from './Calendar'
import DataBaseHandler from './DataBaseHandler'

/*
  [
    {
      "text": "Pass Web Course",
      "date": "28/12/18",
      "done": false,
      "id": 1
    },
    {
      "text": "Shave Misha's Beard",
      "date": "1/1/18",
      "done": false,
      "id": 2
    },
    {
      "text": "Rest In Peace",
      "date": "1/1/18",
      "done": false,
      "id": 3
    }
  ]
  */

const form = document.getElementById("newTaskForm");
const input = document.getElementById("newTaskInput");

let calendar = new Calendar(document.getElementById('calendarPlaceholder'));
let todoList = new TodoList(document.getElementById('content'), form, input, calendar);
calendar.todoList = todoList;

todoList.addBtnFilter(document.getElementById('filter-all'), 'all');
todoList.addBtnFilter(document.getElementById('filter-done'), 'done');
todoList.addBtnFilter(document.getElementById('filter-active'), 'active');

todoList.addBtnRemoveByFilter(document.getElementById('clear-done'), 'done');
