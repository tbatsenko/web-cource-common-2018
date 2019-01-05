import TodoItem from './TodoItem'

export default class TodoList {
    constructor(container, dataBase) {
        this.container = container
        this.dataBase = dataBase
        this.create()

        this.date = new Date()
        this.todoItems = []
        this.onAddEvents = []
        this.loadTodo()

        this.listContainer = this.container.getElementsByClassName(
            'todo-list--list'
        )[0]
    }

    setDate(date) {
        this.date = date
        this.loadTodo()
    }
    addOnAddEvent(ev) {
        this.onAddEvents.push(ev)
    }

    setTodoList(newTodoList) {
        this.todoItems = newTodoList
        this.render()
    }
    async addTodo(text) {
        let data = await this.dataBase.create(text, false, this.date)
        let newItem = new TodoItem(data, this)
        this.todoItems.unshift(newItem)
        this.listContainer.insertBefore(
            newItem.container,
            this.listContainer.firstChild
        )
    }
    removeTodo(item) {
        this.todoItems.splice(this.todoItems.indexOf(item), 1)
        this.listContainer.removeChild(item.container)
        this.deleteTodo(item)
    }

    loadTodo() {
        this.dataBase.getByDate(this.date).then(data => {
            this.setTodoList(data.map(el => new TodoItem(el, this)))
        })
    }
    updateTodo(item) {
        this.dataBase.update(item.data).then(data => {})
    }
    deleteTodo(item) {
        this.dataBase.delete(item.data)
    }

    render() {
        this.listContainer.innerHTML = ``
        this.todoItems.forEach(item =>
            this.listContainer.appendChild(item.container)
        )
    }

    create() {
        this.container.innerHTML = `
            <fieldset class="todo-list--header">
                <input type="text" class="todo-list--text-input">
                <button class="todo-list--add-button">Add</button>
            </fieldset>
            <ul class="todo-list--list" id="todo-list--list"></ul>
        `
        this.container
            .getElementsByClassName('todo-list--add-button')[0]
            .addEventListener('click', e => {
                e.preventDefault()
                this.onAddEvents.forEach(ev => ev())
            })
    }
}
