const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let todoList = {
    addTodo: function (todoText) {
        $.post('http://localhost:3000/todos', {
            'todoText': todoText,
            'completed': false
        })
    },
    changeTodo: function (index, todoText) {
        $.ajax({
                url: `http://localhost:3000/todos/${index}`,
                type: 'PUT',
                data: {
                    'todoText': todoText,
                    'completed': false
                }
            }
        );
    },
    deleteTodo: function (index) {
        $.ajax({
                url: `http://localhost:3000/todos/${index}`,
                type: 'DELETE'
            }
        );
    },
    toggleCompleted: function (index) {
        $.getJSON(`http://localhost:3000/todos/${index}`, (todo) => {
            $.ajax({
                    url: `http://localhost:3000/todos/${index}`,
                    type: 'PUT',
                    data: {
                        'todoText': todo.todoText,
                        'completed': todo.completed === "false"
                    }
                }
            );
        });
    }
};

let handlers = {
    addTodo: () => {
        let addTodoInput = document.getElementsByClassName("add-todo-input")[0];
        if (addTodoInput.value) {
            todoList.addTodo(addTodoInput.value);
        } else {
            let idOfLastTodo = parseInt($('li').last().attr('id'));
            todoList.addTodo(`todo ${(idOfLastTodo ? idOfLastTodo : 0) + 1}`);
        }
        addTodoInput.value = "";
        view.displayTodos();
    },
    changeTodo: (index) => {
        let clickedTodoText = document.getElementById("span-" + index);

        let tempInput = document.createElement("input");
        tempInput.className = "container__todo--temp-edit-input";
        tempInput.type = "text";

        clickedTodoText.parentNode.replaceChild(tempInput, clickedTodoText);
        tempInput.focus();

        tempInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                let receivedInput = document.getElementsByClassName("container__todo--temp-edit-input")[0];

                let liText = document.createElement("span");
                liText.className = "todo-text";
                liText.id = "span-" + index;
                liText.textContent = receivedInput.value;

                receivedInput.parentNode.replaceChild(liText, receivedInput);
                todoList.changeTodo(index, receivedInput.value);
            }
        });
    },
    deleteTodo: async (index) => {
        todoList.deleteTodo(index);
        await sleep(100);
        view.displayTodos();
    },
    toggleCompleted: async (index) => {
        todoList.toggleCompleted(index);
        await sleep(100);
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
                todoLi.className = "container__todo";

                let completeCheckbox = document.createElement("input");
                completeCheckbox.setAttribute("type", "checkbox");
                completeCheckbox.className = "check-box";
                completeCheckbox.checked = todo.completed === "true";
                todoLi.appendChild(completeCheckbox);

                let liText = document.createElement("span");
                liText.className = "todo-text";
                liText.id = "span-" + todo.id.toString();
                liText.textContent = todo.todoText;
                todoLi.appendChild(liText);


                let deleteButton = document.createElement("button");
                deleteButton.textContent = "X";
                deleteButton.className = "container__todo--delete-button";
                todoLi.appendChild(deleteButton);

                todosUl.appendChild(todoLi);
            });
        });
    },
    setUpEventListeners: () => {
        let todosUl = document.querySelector("ul");
        todosUl.addEventListener("click", (e) => {

            let elementClicked = e.target;
            let elementClickedIndex = parseInt(elementClicked.parentNode.id);

            if (elementClicked.className === "delete-button") {
                handlers.deleteTodo(elementClickedIndex);
            } else if (elementClicked.className === 'check-box') {
                handlers.toggleCompleted(elementClickedIndex);
            } else if (elementClicked.className === 'todo-text') {
                handlers.changeTodo(elementClickedIndex);
            }
        });
    }
};

view.displayTodos();
view.setUpEventListeners();
