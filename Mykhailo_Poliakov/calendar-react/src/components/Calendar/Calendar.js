import React from 'react';
import Days from './Days/Days';
import './Calendar.scss';

import BEM from '../../utils/bem';

const b = BEM('calendar');

class Calendar extends React.Component {
	render() {
		return (
			<section className={b()}>
				<header className={b('header')}>
					<button aria-label="Previous month" className={b('button')} onClick={this.props.onPreviousMonth}>
						navigate_before
					</button>
					<h1 className={b('date')}>{this.props.monthList()[this.props.date.month]}</h1>
					<button aria-label="Next month" className={b('button')} onClick={this.props.onNextMonth}>
						navigate_next
					</button>
				</header>
				<main className={b('main')}>
					<Days {...this.props} />
				</main>
			</section>
		);
	}
}

export default Calendar;
