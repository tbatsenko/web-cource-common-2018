import Calendar from "./Calendar";
import DataBase from "./DataBase";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";


const url = "http://localhost:3000/";

const calendar = new Calendar(document.getElementById("calendar"));
const dataBase = new DataBase(url + "todo");
const todoList = new TodoList(document.getElementById("todo-list"));

calendar.addDayEvent(() => {
    dataBase.getByDate(calendar.curr_date).then(data => {
        let todoItems = data.map(el => new TodoItem(el.text, el.completed, todoList));
        todoList.setTodoList(todoItems);
    })
        .catch(e => {
            console.log(e);
        })
});

// dataBase.getAll().then(data => console.log(data));
// dataBase.create("vasiko", true, new Date()).then(data => console.log(data));
// dataBase.getAll().then(data => console.log(data));
// dataBase.create("asd", false, new Date(2019, 11, 11)).then(data => console.log(data));
// dataBase.getAll().then(data => console.log(data));
