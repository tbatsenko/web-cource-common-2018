import React from "react"
import {todoListBem} from "../../../helpers/bem"

import "./TodoCreator.scss"

export default class TodoCreator extends React.Component{
    state = {disabled: true}

    validateInput = () => this.textInput.value.trim() !== ""

    onTextInputChange = () => this.setState({disabled: !this.validateInput()})

    onFormSubmit = (ev) => {
        ev.preventDefault()

        if(!this.validateInput())
            return
        
        this.props.addTodoCallback(this.textInput.value)
        this.textInput.value = ""
        this.onTextInputChange()
    }

    render(){
        return (
            <div>
                <form
                    onSubmit={this.onFormSubmit}
                >
                    <label className={todoListBem({element: "todoCreator"})}>
                        <h3 className={todoListBem({element: "todoCreator-header"})}>Create new Todo</h3>
                        <input
                            className={todoListBem({element: "todoCreator-input"})}
                            type="text"
                            ref={(node) => this.textInput = node}
                            onChange={this.onTextInputChange}
                        />
                        <button type="submit" disabled={this.state.disabled}>Submit</button>
                    </label>
                </form>
                <p className={todoListBem({element: "todoCreator-error"})}>{this.state.disabled? "Text is too short": null}</p>
            </div>
        )
    }
}
