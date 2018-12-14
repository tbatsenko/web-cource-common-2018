export default class TodoItem {
    constructor(data, todoList) {
        this.data = data
        this.container = this.render()

        this.todoList = todoList
    }

    render() {
        let container = document.createElement('li')
        container.className = 'todo-list--item'

        container.appendChild(this.renderCheckBox())
        container.appendChild(this.renderText())
        container.appendChild(this.renderRemoveButton())

        return container
    }

    remove() {
        this.todoList.removeTodo(this)
    }
    completeChecked() {
        this.data.completed = !this.data.completed
        this.container.getElementsByClassName(
            'todo-list--item-checkbox'
        )[0].checked = this.data.completed
        this.todoList.updateTodo(this)
    }

    renderText() {
        let container = document.createElement('span')
        container.className = 'todo-list--item-text'
        container.innerText = this.data.text
        return container
    }
    renderCheckBox() {
        let container = document.createElement('input')
        container.type = 'checkbox'
        container.className = 'todo-list--item-checkbox'
        container.checked = this.data.completed

        container.addEventListener('click', e => {
            this.completeChecked()
            e.stopPropagation()
        })
        return container
    }
    renderRemoveButton() {
        let container = document.createElement('button')
        container.className = 'todo-list--item-remove'
        container.innerText = 'X'

        container.addEventListener('click', e => {
            e.preventDefault()
            this.remove()
            e.stopPropagation()
        })
        return container
    }
}
