import Calendar from './Calendar'
import DataBase from './DataBase'
import TodoList from './TodoList'

const url = process.env.API_URL || 'http://localhost:3000/'

const calendar = new Calendar(document.getElementById('calendar'))
const dataBase = new DataBase(url + 'todo')
const todoList = new TodoList(document.getElementById('todo-list'), dataBase)

calendar.addDayEvent(() => {
    todoList.setDate(calendar.curr_date)
})
todoList.addOnAddEvent(() => {
    let inputField = todoList.container.getElementsByClassName(
        'todo-list--text-input'
    )[0]
    todoList.addTodo(inputField.value, calendar.curr_date)
    inputField.value = ''
})
