let todoList = {
    todos: [],
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function (index, todoText) {
        this.todos[index].todoText = todoText;
    },
    deleteTodo: function (index) {
        this.todos.splice(index, 1);
    },
    toggleCompleted: function (index) {
        this.todos[index].completed = !this.todos[index].completed;
    },
    toggleAll: function () {
        let allTrue = true;

        // check if all todos are completed
        for (let todo of this.todos) {
            if (todo.completed) {
                allTrue = true
            } else {
                allTrue = false;
                break;
            }
        }

        // uncheck (uncomplete) all todos if they"re all checked (completed); otherwise -- check (complete) all todos

        this.todos.forEach((todo) => {
            allTrue ? todo.completed = false : todo.completed = true
        });
    }
};

let handlers = {
    toggleAll: () => {
        todoList.toggleAll();
        view.displayTodos();
    },
    addTodo: () => {
        let addTodoInput = document.getElementsByClassName("add-todo-input")[0];
        todoList.addTodo(addTodoInput.value ? addTodoInput.value : "todo " + (todoList.todos.length + 1));
        addTodoInput.value = "";
        view.displayTodos();
    },
    changeTodo: () => {
        let changeTodoIndexInput = document.getElementsByClassName("change-todo-index-input")[0];
        let changeTodoTextInput = document.getElementsByClassName("change-todo-text-input")[0];
        todoList.changeTodo(changeTodoIndexInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoTextInput.value = "";
        changeTodoIndexInput.value = 0;
        view.displayTodos();
    },
    deleteTodo: (index) => {
        todoList.deleteTodo(index);
        view.displayTodos();
    },
    toggleCompleted: () => {
        let toggleTodoIndexInput = document.getElementsByClassName("toggle-todo-index-input")[0];
        todoList.toggleCompleted(toggleTodoIndexInput.valueAsNumber);
        toggleTodoIndexInput.value = 0;
        view.displayTodos();
    }
};

let view = {
    displayTodos: function () {
        let todosUl = document.querySelector("ul");
        todosUl.innerHTML = "";

        todoList.todos.forEach((todo) => {
            let todoLi = document.createElement("li");
            todoLi.id = todoList.todos.indexOf(todo).toString();
            todoLi.className = "todo-display-item";
            // todoLi.textContent = todo.todoText;
            let checkBox = this.createCompleteCheckbox();
            checkBox.id = todoList.todos.indexOf(todo).toString();
            checkBox.checked = todo.completed;
            todoLi.appendChild(checkBox);
            let liText = document.createElement("span");
            liText.textContent = todo.todoText;
            todoLi.appendChild(liText);
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        });
    },
    createDeleteButton: () => {
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.className = "delete-button";
        return deleteButton;
    },
    createCompleteCheckbox: () => {
        let completeCheckbox = document.createElement("input");
        completeCheckbox.setAttribute("type", "checkbox");
        completeCheckbox.className = "check-box";
        return completeCheckbox;
    },
    setUpEventListeners: () => {
        let todosUl = document.querySelector("ul");
        todosUl.addEventListener("click", (e) => {
            let elementClicked = e.target;
            if (elementClicked.className === "delete-button") handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        });

    }
};

view.displayTodos();
view.setUpEventListeners();











