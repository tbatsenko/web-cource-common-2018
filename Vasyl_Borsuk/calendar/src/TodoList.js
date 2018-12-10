import TodoItem from "./TodoItem";

export default class TodoList {
    constructor(container) {
        this.container = container;
        this.create();

        this.listContainer = this.container.getElementsByClassName("todo-list--list")[0];
        this.todoItems = [];
    }

    addTodo(text) {
        let newItem = new TodoItem(text, false, this);
        this.todoItems.unshift(newItem);
        this.listContainer.insertBefore(newItem.container, this.listContainer.firstChild);
    }
    removeTodo(item) {
        this.todoItems.splice(this.todoItems.indexOf(item), 1);
        this.listContainer.removeChild(item.container);
    }
    setTodoList(newTodoList) {
        this.todoItems = newTodoList;
        this.render();
    }

    render() {
        this.listContainer.innerHTML = ``;
        this.todoItems.forEach(item => this.listContainer.appendChild(item.container));
    }

    create() {
        this.container.innerHTML = `
            <ul class="todo-list--list" id="todo-list--list"></ul>
        `
    }
}