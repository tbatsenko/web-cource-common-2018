class List{
    constructor(container, db, calendar){
        this.container = container;
        this.db = db;
        this.calendar = calendar;
        this.render();
        this.addListener();
    }
    addListener = () => {
        this.container.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (e.target !== e.currentTarget) {
                let clickedItem = e.target;
                if (clickedItem.classList.contains("list__submit-btn")){
                    if(e.keyCode === 13 && clickedItem.value.length > 0){
                        let newTodo = {
                            "text": clickedItem.value,
                            "time": this.toTimestamp(this.calendar.selected)
                        }
                        this.db.addTodo(newTodo, () => {
                            this.render();
                            clickedItem.value = "";
                        });
                        
                    }
                }
            }
        });
        this.container.addEventListener("click", (e) => {
            if (e.target !== e.currentTarget) {
                let clickedItem = e.target;
                if (clickedItem.classList.contains("list__close")){
                    let id = clickedItem.parentNode.dataset.listId;
                    this.db.deleteTodo(id, () => {
                        this.render();
                    })
                }
            }
        });
    }
    render = () => {
        let selectedDayDate = this.calendar.selected;
        this.db.getTodosForSelectedDay(selectedDayDate, (data) => {
            this.container.innerHTML = ""
            this.renderTodos(data);
            this.renderInput();
        });
    }
    renderTodos = (data) => {
        let html = "";
        html += `
        <div class="list__content">
        `
        data.forEach(todoItem => {
            html += `
            <div class="list__item" data-list-id="${todoItem.id}">
                <p>${todoItem.text}</p>
                <img class="list__close" src="images/close.png" />
            </div>
            `
        });
        html += `
        </div>
        `
        this.container.innerHTML += html;
    }

    renderInput = () => {
        this.container.innerHTML += `
        <div class="list__input material__group">
        <input class="material__input list__submit-btn" type="text">
        <span class="material__highlight"></span>
        <span class="material__bar"></span>
        </div>
        `
    }
    toTimestamp = (date) => {
        let timestamp = Date.parse(date);
        return timestamp / 1000;
    }
}
module.exports = List;