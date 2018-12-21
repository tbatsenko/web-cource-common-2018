import React from 'react';
import './Todo.scss';

class Todo extends React.Component {
    state = {
        value: ''
    };

    change = (e) => {
        this.setState({value: e.target.value});
    }

    submit = (e) => {
        e.preventDefault();

        if (this.state.value === 'Clear') localStorage.clear();
        else this.addItem(this.state.value);
        this.setState({value: ''});
    }

    setStorage(storage) {
        localStorage.setItem('storage', JSON.stringify(storage));
    }

    getStorage() {
        return JSON.parse(localStorage.getItem('storage'));
    }

    isSameDate(date) {
        return date.day === this.props.day && date.month === this.props.month && date.year === this.props.year;
    }

    addItem(item) {
        let storage = this.getStorage();
        let isDayFound = false;

        for (let i = 0; i < storage.length; i++) {
            if (this.isSameDate(storage[i])) {          
                storage[i].items.push(item);
                this.setStorage(storage);
                isDayFound = true;
                break;
            }
        } 
        
        if (!isDayFound) {
            storage.push({"day": this.props.day, 
                          "month":  this.props.month, 
                          "year": this.props.year, 
                          "items": [item]
                        })
            this.setStorage(storage);
        }
    }

    render() {
        let storage = this.getStorage();

        if (storage == null) {
            this.setStorage([{"day": 0, "month": 0, "year": 0, "items": ["-"]}]);
            storage = this.getStorage();
        }
        
        let items = [];

        for (let i = 0; i < storage.length; i++) {
            if (this.isSameDate(storage[i])) {           
                for (let j = 0; j < storage[i].items.length; j++) {
                    items.push(<li key={j} className="todo__item">{storage[i].items[j]}</li>);
                }
            }
        }

        return (
            <section className="todo">
                <header className="todo__header">
                    <h1 className="todo__date">
                        {this.props.day} {this.props.months[this.props.month]} {this.props.year}
                    </h1>
                </header>
                <main className="todo__main">
                    <ul className="todo__list">{items}</ul>
                </main>
                <form className="todo__form" onSubmit={this.submit}>
                    <input className="todo__input" value={this.state.value} type="text" onChange={this.change} placeholder="Enter a task for this day" />
                </form>
            </section>
        )
    }
}

export default Todo;
