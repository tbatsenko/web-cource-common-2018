class todoItem {
    constructor(todoText, completed=false) {
        this.todoText = todoText;
        this.completed = completed;
    }
    complete() {
        this.completed = true;
    }
}

// todo = new todoItem("some todo text");

console.log(todo);
