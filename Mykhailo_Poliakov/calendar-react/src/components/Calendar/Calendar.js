import React from 'react';
import Days from './Days/Days';
import './Calendar.scss';

import BEM from '../bem';

const b = BEM('calendar');

class Calendar extends React.Component {
    render() {
        return (
            <section className={b()}>
                <header className={b('header')}>
                    <button aria-label="Previous month" className={b('button')} onClick={this.props.previousMonth}>
                        navigate_before
                    </button>
                    <h1 className={b('date')}>{this.props.months[this.props.month]}</h1>
                    <button aria-label="Next month" className={b('button')} onClick={this.props.nextMonth}>
                        navigate_next
                    </button>
                </header>
                <main className={b('main')}>
                    <Days {...this.props} select={this.props.select} />
                </main>
            </section>
        );
    }
}

export default Calendar;
