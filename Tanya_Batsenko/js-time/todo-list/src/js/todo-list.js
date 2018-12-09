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

  getTodos() {
    const url = this.serverURL + '/todos?';

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
            title: taskTitle
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


  async updateTodoList() {
    let todos;

    try {
      todos = await this.getTodos();
    } catch (e) {
      console.error(e);
    }

    let todosEl = document.getElementById('todos');
    todosEl.innerHTML = '';

    todos.forEach(todo => {
      const todoEl = document.createElement('li');
      const todoCheckbox = document.createElement('input');
      const todoDeleteBtn = document.createElement('button');

      todoCheckbox.type = 'checkbox';
      todoCheckbox.className = 'todo-checkbox';

      todoDeleteBtn.innerHTML = 'Delete';
      todoDeleteBtn.id = 'del-btn-' + todo.id;
      todoDeleteBtn.className = 'delete-button';



      todoEl.appendChild(todoCheckbox);
      todoEl.appendChild(document.createTextNode(`${todo.title}`));
      todoEl.appendChild(todoDeleteBtn);

      todosEl.appendChild(todoEl);
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
  }

}