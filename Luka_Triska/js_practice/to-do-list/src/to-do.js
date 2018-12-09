const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

let todoList = {
    todos: [],
    addTodo: function (todoText) {
        this.todos.push({
            'todoText': todoText,
            'completed': false
        });
        $.post('http://localhost:3000/todos', {
            'todoText': todoText,
            'completed': false
        })
    },
    changeTodo: function (index, todoText) {
        index++;
        this.todos[index - 1].todoText = todoText;
        $.ajax({
                url: 'http://localhost:3000/todos/' + index,
                type: 'PUT',
                data: {
                    'todoText': todoText,
                    'completed': false
                }
            }
        );
    },
    deleteTodo: function (index) {
        this.todos.splice(index - 1, 1);
        // index++;
        $.ajax({
                url: 'http://localhost:3000/todos/' + index,
                type: 'DELETE'
            }
        );
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

        // uncheck (uncomplete) all todos if they're all checked (completed); otherwise -- check (complete) all todos
        this.todos.forEach((todo) => allTrue ? todo.completed = false : todo.completed = true);
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
    deleteTodo: async (index) => {
        todoList.deleteTodo(index);
        await sleep(100);
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

        $.getJSON('http://localhost:3000/todos', function (data) {
            data.forEach((todo) => {
                let todoLi = document.createElement("li");
                todoLi.id = todo.id.toString();
                todoLi.className = "todo-display-item";

                let completeCheckbox = document.createElement("input");
                completeCheckbox.setAttribute("type", "checkbox");
                completeCheckbox.className = "check-box";
                completeCheckbox.id = data.indexOf(todo).toString();
                completeCheckbox.checked = todo.completed;
                todoLi.appendChild(completeCheckbox);

                let liText = document.createElement("span");
                liText.textContent = todo.todoText;
                todoLi.appendChild(liText);

                let deleteButton = document.createElement("button");
                deleteButton.textContent = "X";
                deleteButton.className = "delete-button";
                todoLi.appendChild(deleteButton);

                todosUl.appendChild(todoLi);
            });
        });
        /*
                todoList.todos.forEach((todo) => {
                    let todoLi = document.createElement("li");
                    todoLi.id = (todoList.todos.indexOf(todo) + 1).toString();
                    todoLi.className = "todo-display-item";

                    let checkBox = this.createCompleteCheckbox();
                    checkBox.id = todoList.todos.indexOf(todo).toString();
                    checkBox.checked = todo.completed;

                    todoLi.appendChild(checkBox);
                    todoLi.appendChild(this.createLiText(todo));
                    todoLi.appendChild(this.createDeleteButton());
                    todosUl.appendChild(todoLi);
                });
        */
    },
    /*
        createCompleteCheckbox: () => {
            let completeCheckbox = document.createElement("input");
            completeCheckbox.setAttribute("type", "checkbox");
            completeCheckbox.className = "check-box";
            return completeCheckbox;
        },
        createLiText: (todo) => {
            let liText = document.createElement("span");
            liText.textContent = todo.todoText;
            return liText;
        },
        createDeleteButton: () => {
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.className = "delete-button";
            return deleteButton;
        },
    */
    setUpEventListeners: () => {
        let todosUl = document.querySelector("ul");
        todosUl.addEventListener("click", (e) => {
            let elementClicked = e.target;
            if (elementClicked.className === "delete-button") {
                console.log("parseInt(elementClicked.parentNode.id)" + parseInt(elementClicked.parentNode.id));
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};

view.displayTodos();
view.setUpEventListeners();
