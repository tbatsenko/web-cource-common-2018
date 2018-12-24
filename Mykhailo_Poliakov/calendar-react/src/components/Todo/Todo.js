import React from 'react';
import './Todo.scss';
import BEM from '../bem';

const b = BEM('todo');

class Todo extends React.Component {
    state = {
        value: '',
        data: null,
        id: 1
    };

    onChange = (e) => {
        this.setState({value: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.addItem(this.state.value);
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
                        items.push(<li key={j} className={b('item')}>{this.state.data[i].items[j]}</li>);
                    }
                }
            }

        }

        return (
            <section className={b()}>
                <header className={b('header')}>
                    <h1 className={b('date')}>
                        {this.props.day} {this.props.months[this.props.month]} {this.props.year}
                    </h1>
                </header>
                <main className={b('main')}>
                    <ul className={b('list')}>{items}</ul>
                </main>
                <form className={b('form')} onSubmit={this.onSubmit}>
                    <input className={b('input')} value={this.state.value} type="text" onChange={this.onChange} placeholder="Enter a task for this day" />
                </form>
            </section>
        )
    }
}

export default Todo;
