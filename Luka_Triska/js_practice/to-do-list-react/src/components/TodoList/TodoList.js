import React, {Component} from 'react';
import TodoForm from './TodoForm/TodoForm'
import Todo from './Todo/Todo'

import './TodoList.css'

export default class TodoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      currDate: this.props.currDate,
    };
  }


  addTodo = (todo) => {
    todo.currDate = this.props.currDate;
    this.setState({
      todos: [todo, ...this.state.todos]
    });
  };

  toggleCompleted(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        } else {
          return todo;
        }
      })
    });
  }

  handleDeleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  };

  render() {
    return (
      <section className="todo__container">
        <h2>TodoList</h2>
        <TodoForm onSubmit={this.addTodo} currDate={this.state.currDate}/>
        <ul className="main-todo-list">
          {this.state.todos.map(todo => (
            <Todo
              key={todo.id}
              toggleCompleted={() => this.toggleCompleted(todo.id)}
              onDelete={() => this.handleDeleteTodo(todo.id)}
              completed={todo.completed}
              text={todo.text}
              currDate={todo.currDate}
            />
          ))}
        </ul>
        <div>todos left: {this.state.todos.filter(todo => !todo.completed).length}</div>
      </section>
    )
  }
}
