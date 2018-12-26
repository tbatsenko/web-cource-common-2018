import React from 'react';
import Calendar from '../Calendar/Calendar';
import Todo from '../Todo/Todo';

class TodoCalendar extends React.Component {
    state = {
        year:  new Date().getFullYear(),
        month: new Date().getMonth(),
        day:   new Date().getDate(),
        months:  [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 
        'August', 'September', 'October', 'November', 'December'
        ]
    };

    nextMonth = () => {
        this.setState({
            year:  (this.state.month === 11) ? this.state.year + 1 : this.state.year,
            month: (this.state.month + 1) % 12,
        }, this.setDay);
    }

    previousMonth = () => {  
        this.setState({
            year:  (this.state.month === 0) ? this.state.year - 1 : this.state.year,
            month: (this.state.month === 0) ? 11 : this.state.month - 1,
        }, this.setDay);
    }

    daysInMonth() {
        return new Date(this.state.year, this.state.month + 1, 0).getDate();
    }

    setDay = () => {
        this.setState({day: (this.state.day > this.daysInMonth()) ? 1 : this.state.day});
    }

    onSelect = e => {
        if (e.target.value) this.setState({day: e.target.value});
    }

    render() {
        return (
            [
                <Calendar key='0' {...this.state} nextMonth={this.nextMonth} previousMonth={this.previousMonth} 
                    onSelect={this.onSelect} daysInMonth={this.daysInMonth} />,
                <Todo key='1'  {...this.state} />
            ]
        );
    }
}

export default TodoCalendar;