import React from 'react';
import Days from './Days/Days';
import './Calendar.scss';

import BEM from '../../utils/bem';

const b = BEM('calendar');

class Calendar extends React.Component {
<<<<<<< HEAD
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
					<Days {...this.props} select={this.props.select} daysinMonth={this.props.daysinMonth} />
				</main>
			</section>
		);
	}
=======
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
>>>>>>> b6dc1d76c05ac86256349157aaf843307e90a439
}

export default Calendar;
