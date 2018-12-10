import TodoList from './TodoList'

class DateTime {
    constructor(string) {
        this.datetime = this.parseDate(string);
    }

    parseDate(string) {
        switch (string) {
            case 'today':
                return this.getToday();
            case 'tomorrow':
                return this.getTomorrow();
            default:
                return this.parseDate(string);
        }
    }

    getToday() {
        return new Date();
    }

    getTomorrow(){
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow
    }

    parseDate(string){

    }
}

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
    }

    addRemoveBtn() {
        let removeBtn = document.createElement('button');
        removeBtn.innerText = 'x';
        removeBtn.setAttribute('class', 'task__delete-button');
        removeBtn.onclick = () => {
            this.remove()
        };
        return removeBtn;
    }

    addCheckBox() {
        let checkBtn = document.createElement('input');
        checkBtn.setAttribute('type', 'checkbox');
        checkBtn.onclick = () => {
            this.toggleDone()
        };
        checkBtn.checked = this.done;
        return checkBtn;
    }

    addText(text) {
        let textElem = document.createElement('span');
        textElem.innerText = text;
        textElem.setAttribute('class', 'task__text');
        return textElem;
    }

    render() {
        let elem = document.createElement('li');
        elem.setAttribute('class', 'content__item');
        elem.appendChild(this.addCheckBox());
        elem.appendChild(this.addText(this.text));
        elem.appendChild(this.addRemoveBtn());
        elem.style.textDecoration = this.done ? "line-through" : "";
        return elem;
    }
}

export default TodoItem;