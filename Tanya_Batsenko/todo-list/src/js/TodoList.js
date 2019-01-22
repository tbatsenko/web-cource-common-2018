export default class TodoList {
  constructor(serverURL = 'http://localhost:3000') {
    this.serverURL = serverURL;
    this.todosURL = `${serverURL}/todos/`;
    this.selectedDate = '';
    this.updateTodoList();

    document.getElementById('add-btn').addEventListener('click', () => {
      if (this.selectedDate) this.addTodo(this.selectedDate);
      else this.addTodo();
    });
  }

  async getTodos(filterDate = '') {
    const url = this.serverURL + (filterDate === '' ? `/todos` : `/todos/?when=${filterDate}`);
    return (await fetch(url)).json();
  }

  async addTodo(date = '2019-1-4') {
    const taskTitle = document.getElementById('add-task').value;

    if (taskTitle === '') {
      alert("TODO input can't be empty, please add some description"); // eslint-disable-line no-alert
    } else {
      const response = await (await fetch(this.todosURL, {
        method: 'POST',
        body: JSON.stringify({
          title: taskTitle,
          status: 'active',
          when: date
        }), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })).json();

      const success = resp => {
        console.log('Success:', JSON.stringify(resp)); // eslint-disable-line no-console
        this.updateTodoList();
      };

      try {
        success(response);
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    }
    // Clear the input
    document.getElementById('add-task').value = '';
  }

  async deleteTodo(itemId) {
    const url = `${this.todosURL}${itemId}`;

    const response = await (await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();

    const success = resp => {
      console.log('Success:', JSON.stringify(resp)); // eslint-disable-line no-console
      this.updateTodoList();
    };

    try {
      success(response);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  }

  async updateTodoStatus(itemId, status) {
    const url = `${this.todosURL}${itemId}`;
    const statusString = status ? 'completed' : 'active';

    const response = await (await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        status: statusString
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();
    const success = resp => {
      console.log('Success:', JSON.stringify(resp)); // eslint-disable-line no-console
      this.updateTodoList();
    };

    try {
      success(response);
      this.updateTodoList();
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  }

  async updateTodoList(filterDate = '') {
    let todos;

    try {
      todos = await this.getTodos(filterDate);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }

    const todosEl = document.getElementById('todos');
    const completedEl = document.getElementById('completed');
    todosEl.innerHTML = '';
    completedEl.innerHTML = '';

    todos.forEach(todo => {
      const todoEl = document.createElement('li');
      const todoCheckbox = document.createElement('input');
      const todoDeleteBtn = document.createElement('button');
      const todoDate = document.createElement('p');

      todoCheckbox.type = 'checkbox';
      todoCheckbox.id = `checkbox-${todo.id}`;
      todoCheckbox.className = 'todo-checkbox';

      todoDeleteBtn.innerHTML = 'Delete';
      todoDeleteBtn.id = `del-btn-${todo.id}`;
      todoDeleteBtn.className = 'delete-button';

      todoDate.innerHTML = todo.when;
      todoDate.className = 'todo-when';

      todoEl.appendChild(todoCheckbox);
      todoEl.appendChild(document.createTextNode(`${todo.title}`));
      todoEl.appendChild(todoDate);
      todoEl.appendChild(todoDeleteBtn);

      if (todo.status === 'active') {
        todosEl.appendChild(todoEl);
      } else {
        todoCheckbox.checked = true;
        todoEl.classList.add('todo__completed');
        completedEl.appendChild(todoEl);
      }
    });

    const delBtns = Array.from(document.getElementsByClassName('delete-button'));

    delBtns.map(btn =>
      btn.addEventListener('click', event => {
        try {
          const itemId = event.target.id.split('-').pop(); // del-btn-10
          this.deleteTodo(itemId);
        } catch (e) {
          console.error(e); // eslint-disable-line no-console
        }
      })
    );

    const checkboxes = Array.from(document.getElementsByClassName('todo-checkbox'));

    checkboxes.map(btn =>
      btn.addEventListener('change', event => {
        try {
          console.log(event); // eslint-disable-line no-console
          const itemId = event.target.id.split('-').pop(); // checkbox-10
          const checkboxStatus = event.target.checked;
          this.updateTodoStatus(itemId, checkboxStatus);
        } catch (e) {
          console.error(e); // eslint-disable-line no-console
        }
      })
    );
  }
}
