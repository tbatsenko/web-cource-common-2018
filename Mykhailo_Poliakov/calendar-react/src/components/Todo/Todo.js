import React from 'react';
import './Todo.scss';

class Todo extends React.Component {
    state = {
        value: '',
        data: null,
        id: 1
    };

    change = (e) => {
        this.setState({value: e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        this.setState({value: ''});
    }

    componentDidMount() {
        fetch('http://localhost:4000/dates').then((response) => response.json()).then(data => {
            this.setState({data: data, id: data[data.length - 1].id});        
        })
    }
        

    isSameDate(date) {
        return date.day === this.props.day && date.month === this.props.month && date.year === this.props.year;
    }

    async postData(data) {
        this.state.data.push(data);
        this.state.id = this.state.id + 1;

        let options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
          return fetch('http://localhost:4000/dates', options).then((response) => response.json)
    }

    async putData(data) {
        let options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
          return fetch('http://localhost:4000/dates/' + data.id, options).then((response) => response.json)
    }

    addItem(item) {
        let isDayFound = false;

        for (let i = 0; i < this.state.data.length; i++) {
            if (this.isSameDate(this.state.data[i])) {   
                isDayFound = true;       
                this.state.data[i].items.push(item);
                this.putData(this.state.data[i]);
                break;
            }
        } 
        
        if (!isDayFound) {
            this.postData(
            {
                "id": this.state.id + 1, "day": this.props.day, 
                "month":  this.props.month, "year": this.props.year, "items": [item]
            });
        }
    }

    render() {
        let items = [];
        if (this.state.data != null) {
            for (let i = 0; i < this.state.data.length; i++) {
                if (this.isSameDate(this.state.data[i])) {           
                    for (let j = 0; j < this.state.data[i].items.length; j++) {
                        items.push(<li key={j} className="todo__item">{this.state.data[i].items[j]}</li>);
                    }
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
