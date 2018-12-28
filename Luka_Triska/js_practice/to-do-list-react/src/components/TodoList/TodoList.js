import React, {Component} from 'react';
import TodoForm from './TodoForm/TodoForm'
import Todo from './Todo/Todo'

import './TodoList.css'

export default class TodoList extends Component {


  state = {
    todos: [],
    currDate: new Date()
  };

  addTodo = (todo) => {
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
        <TodoForm onSubmit={this.addTodo}/>
        <ul className="main-todo-list" style={{paddingLeft: 0}}>
          {this.state.todos.map(todo => (
            <Todo
              key={todo.id}
              toggleCompleted={() => this.toggleCompleted(todo.id)}
              onDelete={() => this.handleDeleteTodo(todo.id)}
              todo={todo}
            />
          ))}

        </ul>
        <div>todos left: {this.state.todos.filter(todo => !todo.completed).length}</div>
      </section>
    )
  }
}
