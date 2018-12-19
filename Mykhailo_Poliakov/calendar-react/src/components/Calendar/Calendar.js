import React from 'react';
import Days from './Days/Days';
import './Calendar.scss';

class Calendar extends React.Component {
    render() {
        return (
            <section className="calendar">
                <header className="calendar__header">
                    <button className="calendar__button" onClick={this.props.previous}>
                        navigate_before
                    </button>
                    <h1 className="calendar__date">{this.props.months[this.props.month]}</h1>
                    <button className="calendar__button" onClick={this.props.next}>
                        navigate_next
                    </button>
                </header>
                <main className="calendar__main">
                    <Days {...this.props} select={this.props.select} />
                </main>
            </section>
        );
    }
}

export default Calendar;
