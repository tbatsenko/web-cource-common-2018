import TodoItem from './TodoItem'
import {compareDayMonthYear} from './utils'
import DataBaseHandler from './DataBaseHandler'

class TodoList {
    constructor(container, form, input, calendar, dbUrl) {
        this.dbHandler = new DataBaseHandler(
            dbUrl === undefined ? "http://localhost:3000/todoList" : dbUrl
        );
        this.form = form;
        this.inputForm = input;
        this.calendar = calendar;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = this.inputForm.value;
            if (!/\S/.test(text)) return;
            this.addTodoToDB({text:text, date:calendar.today, done:false});
            this.inputForm.value = "";
        });

        this.todoItems = [];
        this.getTodoItemsFromDB();

        this.container = container;
        this.htmlElem = document.createElement('ul');
        this.htmlElem.setAttribute('class', 'tasks-container');
        this.container.appendChild(this.htmlElem);

        this.currentFilter = 'all';
        this.filters = {
            'all': (elem) => true,
            'done': (elem) => elem.done,
            'active': (elem) => !elem.done,
            'date': (elem) => compareDayMonthYear(this.calendar.today, elem.date)
        };
        this.removeFilters = {
            'done': (elem) => elem.done
        };
        this.render();
    }

    render() {
        let content = document.createElement('ul');
        content.setAttribute('class', 'tasks-container');
        for (let elem in this.todoItems) {
            if (this.filters[this.currentFilter](this.todoItems[elem])) {
                content.appendChild(this.todoItems[elem].render());
            }
        }
        this.container.removeChild(this.htmlElem);
        this.htmlElem = content;
        this.container.appendChild(this.htmlElem);
    }

    getTodoItemsFromDB(){
        this.dbHandler.getAllTodos((dataFromResponce) => {
            let jsonData = JSON.parse(dataFromResponce);
            for(let i in jsonData){
                this.addTodo(jsonData[i])
            }
        })
    }


    addBtnFilter(btn, filterName, filter) {
        if (filter !== undefined) {
            this.filters[filterName] = filter;
        }
        btn.onclick = () => {
            this.currentFilter = filterName;
            this.render();
        };
    }

    removeByFilter(filter) {
        let toRemove = [];
        for (let elem in this.todoItems) {
            if (filter(this.todoItems[elem])) {
                toRemove.push(this.todoItems[elem])
            }
        }

        for (let elem in toRemove) {
            this.removeTodo(toRemove[elem])
        }
        this.render();
    }

    addBtnRemoveByFilter(btn, filterName, filter) {
        if (filter !== undefined) {
            this.removeFilters[filterName] = filter;
        }
        btn.onclick = () => {
            this.removeByFilter(this.removeFilters[filterName])
        };
    }


    addTodoToDB(jsonData) {
        this.dbHandler.addTodo(jsonData, (dataFromResponce) => {
            this.addTodo(JSON.parse(dataFromResponce));
        });
    };

    addTodo(jsonData){
        let newItem = new TodoItem(jsonData, this);
        this.todoItems.unshift(newItem);
        this.htmlElem.insertBefore(newItem.htmlElem, this.htmlElem.firstChild);
    }

    removeTodoFromDB(jsonData) {
        this.dbHandler.removeTodoById(jsonData.id, ()=>{})
    }

    removeTodo(item) {
        this.removeTodoFromDB(item);
        this.todoItems.splice(this.todoItems.indexOf(item), 1);
        this.htmlElem.removeChild(item.htmlElem);
    };

    replaceTodo(item, jsonDataToReplace){
        this.dbHandler.replaceTodoById(item.id, jsonDataToReplace, (dataFromResponce)=>{
            item.changeData(JSON.parse(dataFromResponce));
        });

    }
}

export default TodoList;