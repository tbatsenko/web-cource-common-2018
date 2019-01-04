import React, {Component} from 'react';

import TodoForm from './TodoForm/TodoForm'
import Todo from './Todo/Todo'

import './TodoList.css'
import axios from 'axios';

export default class TodoList extends Component {

  constructor(props) {
    super(props);
    this.baseURL = 'http://localhost:4000/todos/';
    this.state = {
      lastClickedDate: new Date(),
      todos: []
    };
  }

  addTodo = async (todo) => {
    this.setState((prevState) => ({
      todos: [todo, ...prevState.todos]
    }));

    await axios.post(this.baseURL, todo);
  };

  handleDeleteTodo = async (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }))

    await axios.delete(this.baseURL + id);
  };

  toggleCompleted = async (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        } else {
          return todo;
        }
      })
    }));
    await axios.get(this.baseURL + id).then(async response => {
      await axios.put(this.baseURL + id,
        {
          'text': response.data.text,
          'date': response.data.date,
          'completed': !response.data.completed,
          'id': response.data.id
        });
    });
  };

  setLastClickedDate = (lastClickedDate) => {
    this.setState({
      lastClickedDate: lastClickedDate.toDateString()
    })
  };

  async componentDidMount() {
    await axios.get(this.baseURL).then(res => {
      this.setState({todos: res.data});
    })
  }

  render() {

    return (
      <section className='todo__container'>
        <h2>TodoList</h2>
        <TodoForm onSubmit={this.addTodo} lastClickedDate={this.state.lastClickedDate}/>
        <ul className='main-todo-list'>
          {
            this.state.todos
              .filter(todo => new Date(todo.date).toDateString() === new Date(this.state.lastClickedDate).toDateString())
              .map(todo => (
                <Todo
                  todo={todo}
                  key={todo.id}
                  toggleCompleted={() => this.toggleCompleted(todo.id)}
                  onDelete={() => this.handleDeleteTodo(todo.id)}
                />
              ))
          }
        </ul>
      </section>
    )
  }
}
