import React from 'react';
import './Days.scss';

class Days extends React.Component {
    state = {
        startMonday: false
    };

    daysList() {
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let firstDay = new Date(this.props.year, this.props.month).getDay();
        
        if (this.state.startMonday) {
            days.push(days.shift());
            firstDay = (firstDay + 6) % 7;
        }
        return [days, firstDay];
    }

    daysInMonth() {
        return new Date(this.props.year, this.props.month + 1, 0).getDate();
    }

    render() {
        
        let [days, firstDay] = this.daysList();

        let rows = [];
        let day = 1;
        
        for (let i = 0; i < 7; i++) {
            let row = []
            for (let j = 0; j < 7; j++) {
                let className = 'days__day';
                let value = '';

                if (i === 0) value = days[j];
                else if ((i === 1 && j < firstDay) || day > this.daysInMonth()) {} else {
                    value = day;
                    className += ' days__day--date';
                    if (day === this.props.day) className += ' days__day--active';
                    day++;
                }

                row.push(
                    <li key={j} value={value} onClick={this.props.onSelect} className={className}>{value}</li>
                );
            }
            rows.push(<ul key={i} className="days">{row}</ul>);
        }
      
        return rows;
    }
}

export default Days;