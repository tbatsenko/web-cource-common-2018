import React from 'react'
import bem from '../../../helpers/bem'

import './TodoCreator.scss'

const todoListBem = bem('todoList')

export default class TodoCreator extends React.Component {
  state = { showErrorHeader: false }

  validateInput = () => this.textInput.value.trim() !== ''

  onTextInputChange = () => this.setState({ showErrorHeader: false })

  onFormSubmit = ev => {
    ev.preventDefault()

    if (!this.validateInput()) {
      this.setState({ showErrorHeader: true })
      return
    }

    this.props.onAddTodo(this.textInput.value)
    this.textInput.value = ''
    this.onTextInputChange()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label className={todoListBem({ element: 'todoCreator' })}>
            <h3 className={todoListBem({ element: 'todoCreator-header' })}>
              Create new Todo
            </h3>
            <input
              className={todoListBem({ element: 'todoCreator-input' })}
              type="text"
              ref={node => (this.textInput = node)}
              onChange={this.onTextInputChange}
            />
            <button type="submit">Submit</button>
          </label>
        </form>
        <p className={todoListBem({ element: 'todoCreator-error' })}>
          {this.state.showErrorHeader ? 'Text is too short' : null}
        </p>
      </div>
    )
  }
}
