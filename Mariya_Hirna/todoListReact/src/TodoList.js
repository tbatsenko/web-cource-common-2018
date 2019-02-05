import React, {Component} from 'react'
import TodoItems from './TodoItems'
import Calendar from 'react-calendar'

class TodoList extends Component{
    constructor(props){
        super(props);

        this.state = {
            items : [],
            selectedDate: new Date()
        }

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    addItem(e){
        if (this._inputElement !== ""){
            let selectedDate = this.state.selectedDate;
            let newItem = {
                date: selectedDate.getDate().toString().concat("/", (selectedDate.getMonth() + 1).toString()),
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            })
        }
        this._inputElement.value = "";
        e.preventDefault();
    }

    deleteItem(key){
        let filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key)
        });

        this.setState({
            items: filteredItems
        });
    }

    changeDate = date => this.setState({selectedDate: date});

    render() {
        return(
            <div className="TodoList">
                    <form className="add-item__form" onSubmit={this.addItem}>
                        <input ref={(e) => this._inputElement = e} className="form__input" placeholder="Enter task"/>
                            <button className="form__button" type="submit">Add item</button>
                    </form>
                <TodoItems entries={this.state.items} delete={this.deleteItem}/>
                <Calendar value={this.state.selectedDate} onChange={this.changeDate} className={["calendar"]}/>
            </div>
        )
    }
}

export default TodoList;