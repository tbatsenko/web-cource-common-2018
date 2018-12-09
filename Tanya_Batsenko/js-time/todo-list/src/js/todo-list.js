export class TodoList {
  constructor(serverURL = 'http://localhost:3000') {
    this.serverURL = serverURL;
    this.updateTodoList();

    document
      .getElementById('add-btn')
      .addEventListener('click', () => {
        this.addTodo();
      });

  }

  getTodos(filterDate = "") {
    let url = "";
    if (filterDate === "") { 
      url = this.serverURL + `/todos`;
    }
    else {
      url = this.serverURL + `/todos/?when=${filterDate}`;
    }
    

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        return myJson;
      });
  }

  addTodo() {
    const url = this.serverURL + '/todos';
    let taskTitle = document.getElementById('add-task').value;

    if (taskTitle === '') {
      console.error(
        "TODO input can't be empty, please add some description"
      );
    } else {
      fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            title: taskTitle,
            status: "active",
            when: "2018-12-19",
          }), // data can be `string` or {object}!
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(response => {
          console.log('Success:', JSON.stringify(response));
          this.updateTodoList();
        })
        .catch(error => console.error('Error:', error));
    }
  }

  deleteTodo(itemId) {
    const url = this.serverURL + '/todos/' + itemId;

    fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
        this.updateTodoList();
      })
      .catch(error => console.error('Error:', error));
  }

  updateTodoStatus(itemId, status) {
    const url = this.serverURL + '/todos/' + itemId;

    const statusString = status ? "completed" : "active";

    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          status: statusString,
        }), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
        this.updateTodoList();
      })
      .catch(error => console.error('Error:', error));
  }


  async updateTodoList(filterDate = "") {
    let todos;

    try {
      todos = await this.getTodos(filterDate);
    } catch (e) {
      console.error(e);
    }

    let todosEl = document.getElementById('todos');
    let completedEl = document.getElementById('completed');
    todosEl.innerHTML = '';
    completedEl.innerHTML = '';

    todos.forEach(todo => {
      const todoEl = document.createElement('li');
      const todoCheckbox = document.createElement('input');
      const todoDeleteBtn = document.createElement('button');

      todoCheckbox.type = 'checkbox';
      todoCheckbox.id = 'checkbox-' + todo.id;
      todoCheckbox.className = 'todo-checkbox';

      todoDeleteBtn.innerHTML = 'Delete';
      todoDeleteBtn.id = 'del-btn-' + todo.id;
      todoDeleteBtn.className = 'delete-button';



      todoEl.appendChild(todoCheckbox);
      todoEl.appendChild(document.createTextNode(`${todo.title}`));
      todoEl.appendChild(todoDeleteBtn);

      if (todo.status === "active") {
        todosEl.appendChild(todoEl);

      } else {
        todoCheckbox.checked = true;
        todoEl.classList.add("todo__completed");
        completedEl.appendChild(todoEl);
      }
    });

    let delBtns = Array.from(document.getElementsByClassName("delete-button"));

    delBtns.map(btn => btn.addEventListener('click', (event) => {

      try {
        const itemId = event.target.id.split("-").pop(); // del-btn-10
        this.deleteTodo(itemId);
      } catch (e) {
        console.error(e);
      }

    }));

    let checkboxes = Array.from(document.getElementsByClassName("todo-checkbox"));

    checkboxes.map(btn => btn.addEventListener('change', (event) => {

      try {
        console.log(event);
        const itemId = event.target.id.split("-").pop(); // checkbox-10
        let checkboxStatus = event.target.checked;
        this.updateTodoStatus(itemId, checkboxStatus);
      } catch (e) {
        console.error(e);
      }

    }));
  }

}