class ToDoList {
  constructor() {
    this._data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
      todo: [],
      completed: [],
    }
  }

  dataUpdate() {
    localStorage.setItem('todoList', JSON.stringify(this._data))
  }

  addItem(value) {
    this.addToRender(value)
    document.getElementById('item').value = ''
    this._data.todo.push(value)
    this.dataUpdate()
  }

  removeItem(element) {
    let item = element.parentNode
    let parent = item.parentNode;

    (parent.id === 'todo') ?
      this._data.todo.splice(this._data.todo.indexOf(item.innerText), 1) :
      this._data.completed.splice(this._data.completed.indexOf(item.innerText), 1)

    this.dataUpdate()
    parent.removeChild(item)
  }

  completeItem(element) {
    let item = element.parentNode
    let parent = item.parentNode

    if (parent.id === 'todo') {
      this._data.todo.splice(this._data.todo.indexOf(item.innerText), 1)
      this._data.completed.push(item.innerText)
    } else {
      this._data.completed.splice(this._data.completed.indexOf(item.innerText), 1)
      this._data.todo.push(item.innerText)
    }

    this.dataUpdate()
    let target = (parent.id === 'todo') ? document.getElementById('completed') : document.getElementById('todo')
    parent.removeChild(item)
    target.insertBefore(item, target.childNodes[0])
  }

  addToRender(text, completed) {
    let list = (completed) ? document.getElementById('completed') : document.getElementById('todo')

    let item = document.createElement('form')
    item.className = 'task-list__task'

    item.innerHTML += `<label class="task__name" for="check">${text}</label>`

    let checkbox = document.createElement('button')
    checkbox.classList.add('task-list__buttons', 'buttons__checkbox')
    checkbox.addEventListener('click', () => {
      this.completeItem(checkbox)
    })
    item.appendChild(checkbox)

    let remove = document.createElement('button')
    remove.classList.add('task-list__buttons', 'buttons__delete')
    remove.addEventListener('click', () => {
      this.removeItem(remove)
    })
    item.appendChild(remove)

    list.insertBefore(item, list.childNodes[0])
  }

  render() {
    if (!this._data.todo.length && !this._data.completed.length) return

    this._data.todo.forEach(
      (item) => this.addToRender(item))
    this._data.completed.forEach(
      (item) => this.addToRender(item, true))
  }
}

export default ToDoList