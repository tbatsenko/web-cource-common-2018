import React, {Component} from 'react'
import './style/main.css'


class TodoItems extends Component{
    constructor(props) {
        super(props);

        this.createTask = this.createTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.checkTask = this.checkTask.bind(this);
    }

    checkTask(input){

    }

    deleteTask(key){
        this.props.delete(key);
    }

    createTask(item){
        return (
            <form className="section__checklist-container" key={item.key}>
                <label className="checklist-container__label">{item.date}</label>
                <label className="checklist-container__label">{item.text}</label>
                <button className="form__button" onClick={() => this.deleteTask(item.key)}>Delete</button>
            </form>
        );
    }

    render(){
        let todoEntries = this.props.entries;
        let listItems = todoEntries.map(this.createTask);

        return (
            <section className="to-do__section">
                <h3 className="section__header">TODO</h3>
                {listItems}
            </section>
        )
    }
}

export default TodoItems;