import React from 'react';
import Days from './Days/Days';
import './Calendar.scss';

class Calendar extends React.Component {
    render() {
        return (
            <section className="calendar">
                <header className="calendar__header">
                    <button aria-label="Previous month" className="calendar__button" onClick={this.props.previousMonth}>
                        navigate_before
                    </button>
                    <h1 className="calendar__date">{this.props.months[this.props.month]}</h1>
                    <button aria-label="Next month" className="calendar__button" onClick={this.props.nextMonth}>
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
