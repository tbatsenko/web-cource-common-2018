import TodoList from './TodoList';
import Calendar from './Calendar';

export default class Application {
  constructor(todoList = new TodoList(), calendar = new Calendar()) {
    this.todoList = todoList;
    this.calendar = calendar;

    document.addEventListener('onSelectDateEvent', event => {
      this.handleSelectDateEvent(event);
    });

    document.addEventListener('onResetDateEvent', () => {
      this.handleResetDateEvent();
    });
  }

  handleSelectDateEvent(event) {
    this.todoList.selectedDate = event.detail.date;
    this.todoList.updateTodoList();
  }

  handleResetDateEvent() {
    this.todoList.selectedDate = '';
    this.todoList.updateTodoList();
  }
}
