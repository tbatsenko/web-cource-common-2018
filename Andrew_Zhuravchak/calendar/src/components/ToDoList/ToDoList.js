import React, { Component } from 'react'

import { v4 } from 'uuid'

import PropTypes from 'prop-types'

import ToDo from './ToDo'
import AddToDoForm from './AddToDoForm'
import './ToDoList.scss'

class ToDoList extends Component {
  static propTypes = {
    onTasksListChange: PropTypes.func,
    date: PropTypes.object,
    tasks: PropTypes.array,
  }

  addNewTask = (event, newTaskNote) => {
    event.preventDefault()
    if (newTaskNote === '') return

    const newTask = {
      id: v4(), // generate random id string for the new task
      note: newTaskNote,
      date: this.props.date,
      completed: false,
    }

    this.props.onTasksListChange([...this.props.tasks, newTask])
  }

  removeTask = (taskId) => {
    this.props.onTasksListChange(this.props.tasks.filter(task => task.id !== taskId))
  }

  toggleTaskCompletement = (taskId) => {
    this.props.onTasksListChange(this.props.tasks.map(task => {
      task.completed = (task.id === taskId) ? !task.completed : task.completed
      return task
    }))
  }

  getTasksForCurrentDate() {
    return this.props.tasks.filter(task => {
      return (
        task.date.getMonth() === this.props.date.getMonth() &&
        task.date.getFullYear() === this.props.date.getFullYear() &&
        task.date.getDate() === this.props.date.getDate()
      )
    })
  }

  render() {
    const tasks = this.getTasksForCurrentDate()
    const { date } = this.props

    return (
      <div className="ToDoList">
        <div className="ToDoList--header">
          Tasks for:{' '}
          <em>{date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</em>
        </div>

        <div className="ToDoList--controls">Controls are coming soon...</div>

        <div className="ToDoList--tasks">
          {tasks.length !== 0 ? (
            tasks.map((todo, index) => (
              <ToDo
                note={todo.note}
                completed={todo.completed}
                date={todo.date}
                id={todo.id}
                onTaskRemove={this.removeTask}
                onToggleTaskCompletement={this.toggleTaskCompletement}
                key={index}
              />
            ))
          ) : (
            <div className="ToDoList--tasks-placeholder">No tasks yet...</div>
          )}
        </div>


        <div className="ToDoList--footer">
          <AddToDoForm onAddNewTask={this.addNewTask}/>
        </div>

      </div>
    )
  }
}

export default ToDoList
