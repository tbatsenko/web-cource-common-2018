import React from 'react';
import Calendar from '../Calendar/Calendar';
import Todo from '../Todo/Todo';
import { withState, withProps, compose, lifecycle } from 'recompose';

const TodoCalendar = (props) => {
	return [ <Calendar key="calendar" {...props} />, <Todo key="todo" {...props} /> ];
};

const enhancer = compose(
	withState('date', 'setDate', {
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
		day: new Date().getDate()
	}),
	withProps(() => {
		return {
			monthList: () => {
				return [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December'
				];
			},
			daysInMonth: (year, month) => {
				return new Date(year, month + 1, 0).getDate();
			},
			updateURL: (year, month, day) => {
				let url = 'http://' + window.location.host + '/?year=' + year + '&month=' + month + '&day=' + day;
				window.history.pushState({ year: year, month: month, day: day }, null, url);
			}
		};
	}),
	withProps((props) => {
		return {
			onNextMonth: () => {
				let newYear = props.date.month === 11 ? props.date.year + 1 : props.date.year;
				let newMonth = (props.date.month + 1) % 12;
				let newDay = props.date.day > props.daysInMonth(newYear, newMonth) ? 1 : props.date.day;
				props.setDate({ year: newYear, month: newMonth, day: newDay });
				props.updateURL(newYear, newMonth, newDay);
			},
			onPreviousMonth: () => {
				let newYear = props.date.month === 0 ? props.date.year - 1 : props.date.year;
				let newMonth = props.date.month === 0 ? 11 : props.date.month - 1;
				let newDay = props.date.day > props.daysInMonth(newYear, newMonth) ? 1 : props.date.day;
				props.setDate({ year: newYear, month: newMonth, day: newDay });
				props.updateURL(newYear, newMonth, newDay);
			},
			onSelect: (e) => {
				e.preventDefault();
				let newDay = parseInt(e.target.innerHTML);
				let isActive = e.target.className.includes('active');
				if (!isNaN(newDay) && !isActive) {
					props.setDate({ year: props.date.year, month: props.date.month, day: newDay });
					props.updateURL(props.date.year, props.date.month, newDay);
				}
			},
			onControlsClick: (e) => {
				if (e.state != null) {
					props.setDate({ year: e.state.year, month: e.state.month, day: e.state.day });
				}
			}
		};
	}),
	lifecycle({
		componentDidMount() {
			const params = new URLSearchParams(window.location.search);
			let newYear = parseInt(params.get('year'));
			let newMonth = parseInt(params.get('month'));
			let newDay = parseInt(params.get('day'));
			if (
				newYear > 0 &&
				(newMonth >= 0 && newMonth < 12) &&
				(newDay > 0 && newDay <= this.props.daysInMonth(newMonth, newYear))
			) {
				this.props.setDate({ year: newYear, month: newMonth, day: newDay });
				this.props.updateURL(newYear, newMonth, newDay);
			} else {
				this.props.updateURL(this.props.date.year, this.props.date.month, this.props.date.day);
			}
			window.addEventListener('popstate', this.props.onControlsClick);
		}
	})
);

export default enhancer(TodoCalendar);
