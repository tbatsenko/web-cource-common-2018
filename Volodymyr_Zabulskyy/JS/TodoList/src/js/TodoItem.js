import {compareDayMonthYear} from './utils'

class TodoItem {
    constructor(jsonData, parent) {
        this.parent = parent;
        this.id = jsonData.id;
        this.text = jsonData.text;
        this.date = jsonData.date === undefined ? new Date() : new Date(jsonData.date);
        this.done = jsonData.done === undefined ? false : jsonData.done;

        this.htmlElem = document.createElement('li');
        this.content = document.createElement('div');
        this.htmlElem.appendChild(this.content);
        this.render();
    }

    remove() {
        this.parent.removeTodo(this);
    }

    toggleDone() {
        this.parent.replaceTodo(this, {
            text: this.text,
            date: this.date,
            done: !this.done,
        });
        this.render();
    }

    changeData(jsonData) {
        this.text = jsonData.text;
        this.date = jsonData.date === undefined ? new Date() : new Date(jsonData.date);
        this.done = jsonData.done === undefined ? false : jsonData.done;
        this.render()
    }

    parseDate(d) {
        const today = new Date();
        if (compareDayMonthYear(d, today))
            return 'today';
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear().toString()[2] + d.getFullYear().toString()[3]
    }

    addDate() {
        let date = document.createElement('span');
        date.innerText = this.parseDate(this.date);
        date.setAttribute('class', "task__timestamp");
        return date;
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
        checkBtn.addEventListener('click', () => {this.toggleDone()});
        checkBtn.checked = this.done;
        return checkBtn;
    }

    addText(text) {
        let textElem = document.createElement('span');
        textElem.innerText = text;
        textElem.setAttribute('class', 'task__text');
        textElem.addEventListener('click', () => {
            this.toggleDone()
        });
        this.innerText = textElem;
        return textElem;
    }

    render() {
        let content = document.createElement('div');
        content.setAttribute('class', 'task');
        content.appendChild(this.addCheckBox());
        content.appendChild(this.addText(this.text));
        content.appendChild(this.addDate());
        content.appendChild(this.addRemoveBtn());
        this.innerText.style.textDecoration = this.done ? "line-through" : "";

        this.htmlElem.removeChild(this.content);
        this.content = content;
        this.htmlElem.appendChild(this.content);

        return this.htmlElem;
    }
}

export default TodoItem;