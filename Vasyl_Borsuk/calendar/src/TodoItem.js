export default class TodoItem {
    constructor(text, completed, todoList) {
        this.text = text;
        this.completed = completed;
        this.container = this.render();

        this.todoList = todoList;
    }

    render() {
        let container = document.createElement("li");
        container.className = "todo-list--item";

        container.appendChild(this.renderText());
        container.appendChild(this.renderCheckBox());
        container.appendChild(this.renderRemoveButton());

        return container;
    }

    remove() {
        this.todoList.removeTodo(this);
    }
    completeChecked() {
        this.completed = !this.completed;
        this.container.getElementsByClassName("todo-list--input-checkbox")[0].checked = this.completed;
    }

    renderText() {
        let container = document.createElement("span");
        container.className = "todo-list--item-text";
        container.innerText = this.text;
        return container;
    }
    renderCheckBox() {
        let container = document.createElement("input");
        container.type = "checkbox";
        container.className = "todo-list--input-checkbox";
        container.checked = this.completed;

        container.addEventListener("click", (e) => {
            // e.preventDefault();
            this.completeChecked();
            e.stopPropagation();
        });
        return container;
    }
    renderRemoveButton() {
        let container = document.createElement("input");
        container.type = "button";
        container.innerText = "Remove";

        container.addEventListener("click", (e) => {
            e.preventDefault();
            this.remove();
            e.stopPropagation();
        });
        return container;
    }
}