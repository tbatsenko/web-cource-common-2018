import TodoList from './TodoList'

class TodoItem {
    constructor(text, parent) {
        this.text = text;
        this.parent = parent;
        this.done = false;
        this.htmlElem = this.render();
    }

    remove() {
        this.parent.removeTodo(this);
    }

    toggleDone() {
        this.done = !this.done;
        this.htmlElem.style.textDecoration = this.done ? "line-through" : "";
        this.checkBoxHtml.checked = this.done;
    }

    addRemoveBtn() {
        let removeBtn = document.createElement('button');
        removeBtn.innerText = 'x';
        removeBtn.setAttribute('class', 'task__delete-button');
        removeBtn.onclick = () => {
            this.remove()
        };
        this.xmarkHtml = removeBtn;
        return removeBtn;
    }

    addCheckBox() {
        let checkBtn = document.createElement('input');
        checkBtn.setAttribute('type', 'checkbox');
        // checkBtn.addEventListener('click', () => {this.toggleDone()});
        checkBtn.checked = this.done;
        this.checkBoxHtml = checkBtn;
        return checkBtn;
    }

    addText(text) {
        let textElem = document.createElement('span');
        textElem.innerText = text;
        textElem.setAttribute('class', 'task__text');
        this.textHtml = textElem;
        return textElem;
    }

    render() {
        let elem = document.createElement('li');
        elem.setAttribute('class', 'task');
        elem.appendChild(this.addCheckBox());
        elem.appendChild(this.addText(this.text));
        elem.appendChild(this.addRemoveBtn());
        elem.addEventListener('click', () => {this.toggleDone()});
        elem.style.textDecoration = this.done ? "line-through" : "";
        return elem;
    }
}

export default TodoItem;