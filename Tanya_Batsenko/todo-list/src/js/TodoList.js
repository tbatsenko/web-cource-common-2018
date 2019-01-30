import ApiService from './ApiService';

export default class TodoList {
  constructor(serverURL = 'http://localhost:3000') {
    this.serverURL = serverURL;
    this.todosURL = `${serverURL}/todos/`;
    this.selectedDate = '';
    this.tasks = JSON.parse(localStorage.getItem('tasks'));
    if (this.tasks) {
      this.updateTodoList();
    } else this.tasks = [];

    document.getElementById('add-btn').addEventListener('click', () => {
      if (this.selectedDate) this.addTodo(this.selectedDate);
      else this.addTodo();
    });

    document.getElementById('add-task').addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        if (this.selectedDate) this.addTodo(this.selectedDate);
        else this.addTodo();
      }
    });

    document.getElementById('todo-list');
  }

  async getTodos() {
    const url =
      this.serverURL + (this.selectedDate === '' ? `/todos` : `/todos/?when=${this.selectedDate}`);
    const todosResp = await ApiService.getRequest(url);
    return todosResp;
  }

  async addTodo(date = '2019-1-30') {
    const taskTitle = document.getElementById('add-task').value;

    if (taskTitle === '') {
      alert("TODO input can't be empty, please add some description"); // eslint-disable-line no-alert
      // Clear the input
      document.getElementById('add-task').value = '';
      return;
    }

    const newTask = {
      uniqueId: TodoList.getUniqueID(),
      title: taskTitle,
      status: 'active',
      when: date
    };

    this.tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    // await ApiService.postRequest(this.todosURL, requestBody);

    this.updateTodoList(date);

    // Clear the input
    document.getElementById('add-task').value = '';
  }

  async deleteTodo(itemId) {
    // const url = `${this.todosURL}${itemId}`;
    // await ApiService.deleteRequest(url);
    this.tasks = this.tasks.filter(task => task.uniqueId !== itemId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.updateTodoList();
  }

  async updateTodoStatus(itemId, status) {
    // const url = `${this.todosURL}${itemId}`;
    const statusString = status ? 'completed' : 'active';

    // const requestBody = {
    //   status: statusString
    // };

    // await ApiService.patchRequest(url, requestBody);
    let taskToEdit = this.tasks.filter(task => task.uniqueId === itemId);
    this.tasks = this.tasks.filter(task => task.uniqueId !== itemId);
    console.log(taskToEdit);
    taskToEdit[0].status = statusString;
    this.tasks.push(taskToEdit[0]);

    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.updateTodoList(this.selectedDate);
  }

  async updateTodoList(filterDate = '') {
    // try {
    //   todos = await this.getTodos(filterDate);
    // } catch (e) {
    //   console.error(e); // eslint-disable-line no-console
    // }

    let todos = JSON.parse(localStorage.getItem('tasks'));
    if (this.selectedDate !== '' && todos) {
      todos = todos.filter(todo => todo.when === this.selectedDate);
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
      todoCheckbox.id = `checkbox-${todo.uniqueId}`;
      todoCheckbox.className = 'todo-checkbox';

      todoDeleteBtn.innerHTML = 'Delete';
      todoDeleteBtn.id = `del-btn-${todo.uniqueId}`;
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
          this.updateTodoList();
        } catch (e) {
          console.error(e); // eslint-disable-line no-console
        }
      })
    );
  }

  static getUniqueID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
