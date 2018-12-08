import TodoItem from './TodoItem'

class TodoList {

    constructor(container) {
        this.container = container;
        this.todoItems = [];
        this.htmlElem = document.createElement('ul');
        this.htmlElem.setAttribute('class', 'tasks-container');
        this.container.appendChild(this.htmlElem);
        this.filters = {
            'all': (elem) => true,
            'done': (elem) => elem.done,
            'active': (elem) => !elem.done
        }
    }

    render(filter) {
        let content = document.createElement('ul');
        content.setAttribute('class', 'tasks-container');
        for (let elem in this.todoItems) {
            if (filter === undefined) {
                content.appendChild(this.todoItems[elem].render());
            } else {
                if (filter(this.todoItems[elem])) {
                    content.appendChild(this.todoItems[elem].render());
                }
            }
        }
        this.container.removeChild(this.htmlElem);
        this.htmlElem = content;
        this.container.appendChild(this.htmlElem);
    }


    addBtnFilterAll(btn) {
        btn.onclick = () => {
            this.render(this.filters.all)
        };
    }

    addBtnFilterDone(btn) {
        btn.onclick = () => {
            this.render(this.filters.done)
        };
    }

    addBtnFilterActive(btn) {
        btn.onclick = () => {
            this.render(this.filters.active)
        };
    }


    addTodo(text) {
        let newItem = new TodoItem(text, this);
        this.todoItems.unshift(newItem);
        this.htmlElem.insertBefore(newItem.htmlElem, this.htmlElem.firstChild);
    };

    removeTodo(item) {
        this.todoItems.splice(this.todoItems.indexOf(item), 1);
        this.htmlElem.removeChild(item.htmlElem);
    };
}

export default TodoList;