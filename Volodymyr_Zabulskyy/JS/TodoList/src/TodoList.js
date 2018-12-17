import ListItem from './ListItem'

function encodeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

class TodoList {
  renderAddForm() {
    const addForm = document.createElement('form')
    addForm.innerHTML = `
        <input name="todoItem" type="text" />
        <button>add</button>
    `

    addForm.addEventListener('submit', ev => {
      ev.preventDefault()
      const { value } = ev.target.todoItem

      this.list.unshift(encodeHTML(value))
      this.addTodo(encodeHTML(value))

      ev.target.todoItem.value = ''
    })
w
    return addForm
  }

  render() {
    const addFormContainer = this.renderAddForm()

    this.container.append(addFormContainer)

    this.listContainer = document.createElement('div')
    this.container.append(this.listContainer)

    this.list.map(data => this.addTodo(data))
  }

  addTodo(data) {
    const listItem = new ListItem(data)

    listItem.onRemove(listItem => this.removeTodo(listItem))
    listItem.onCheck(listItem => {
      listItem.data.checked ? listItem.check(false) : listItem.check(true)
    })

    this.listContainer.prepend(listItem.container)
    return listItem
  }

  removeTodo(listItem) {
    this.list = this.list.filter(li => li !== listItem)
    listItem.remove()
  }

  constructor(container, todoItems) {
    this.container = container
    this.list = todoItems

    this.render()
  }
}

export default TodoList
