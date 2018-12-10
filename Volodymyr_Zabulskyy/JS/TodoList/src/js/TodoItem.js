import {compareDayMonthYear}from './utils'

class TodoItem {
    constructor(text, parent, date) {
        this.text = text;
        this.parent = parent;
        this.done = false;
        this.date = date === undefined ? new Date() : date;
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
        this.htmlElem = document.createElement('li');
        this.htmlElem.setAttribute('class', 'task');
        this.htmlElem.appendChild(this.addCheckBox());
        this.htmlElem.appendChild(this.addText(this.text));
        this.htmlElem.appendChild(this.addDate());
        this.htmlElem.appendChild(this.addRemoveBtn());
        this.htmlElem.addEventListener('click', () => {
            this.toggleDone()
        });
        this.htmlElem.style.textDecoration = this.done ? "line-through" : "";
        return this.htmlElem;
    }
}

export default TodoItem;