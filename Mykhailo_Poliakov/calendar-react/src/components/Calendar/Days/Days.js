import React from 'react';
import './Days.scss';
import BEM from '../../../utils/bem';
import { holidays } from '../../../utils/holidays.json';
const b = BEM('days');

class Days extends React.Component {
	state = {
		startMonday: true
	};

	daysList() {
		let days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
		let firstDay = new Date(this.props.year, this.props.month).getDay();

		if (this.state.startMonday) {
			days.push(days.shift());
			firstDay = (firstDay + 6) % 7;
		}
		return [ days, firstDay ];
	}

	render() {
		let [ days, firstDay ] = this.daysList();

		let rows = [];
		let day = 1;

		for (let i = 0; i < 7; i++) {
			let row = [];
			for (let j = 0; j < 7; j++) {
				let className = b('day');
				let value = '';
				if (i === 0) {
					// Day names
					value = days[j];
				} else if ((i === 1 && j < firstDay) || day > this.props.daysInMonth(this.props.month, this.props.year)) {
					// Empty
				} else {
					value = day;

					className = b('day', [ 'date' ]);

					if (j === days.indexOf('Sat') || j === days.indexOf('Sun')) {
						className = b('day', [ 'date', 'weekend' ]);
					}

					holidays.forEach((holiday) => {
						if (value === holiday.day && this.props.month === holiday.month) {
							className = b('day', [ 'date', 'holiday' ]);
						}
					});

					if (day === this.props.day) {
						className = b('day', [ 'date', 'active' ]);
					}

					day++;
				}

				row.push(
					<a
						key={j}
						className={className}
						onClick={this.props.onSelect}
						href={'?year=' + this.props.year + '&month=' + this.props.month + '&day=' + value}
					>
						{value}
					</a>
				);
			}

			rows.push(
				<ul key={i} className={b()}>
					{row}
				</ul>
			);
		}

		return rows;
	}
}

export default Days;
