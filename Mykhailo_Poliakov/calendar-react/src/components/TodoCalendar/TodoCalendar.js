import React from 'react';
import Calendar from '../Calendar/Calendar';
import Todo from '../Todo/Todo';

class TodoCalendar extends React.Component {
<<<<<<< HEAD
	url = 'localhost:3000';

	months = [
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

	state = {
		year: new Date().getFullYear(),
		month: new Date().getMonth(),
		day: new Date().getDate()
	};

	nextMonth = () => {
		this.setState(
			{
				year: this.state.month === 11 ? this.state.year + 1 : this.state.year,
				month: (this.state.month + 1) % 12
			},
			this.setDay
		);
	};

	previousMonth = () => {
		this.setState(
			{
				year: this.state.month === 0 ? this.state.year - 1 : this.state.year,
				month: this.state.month === 0 ? 11 : this.state.month - 1
			},
			this.setDay
		);
	};

	daysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate();
	}

	setDay = () => {
		this.setState(
			{ day: this.state.day > this.daysInMonth(this.state.year, this.state.month) ? 1 : this.state.day },
			this.updateURL
		);
	};

	onSelect = (e) => {
		e.preventDefault();
		let value = parseInt(e.target.innerHTML);
		let isActive = e.target.parentNode.className.includes('active');
		if (!isNaN(value) && !isActive) {
			this.setState({ day: value }, this.updateURL);
		}
	};

	updateURL() {
		let url =
			'http://' + this.url + '/?year=' + this.state.year + '&month=' + this.state.month + '&day=' + this.state.day;
		window.history.pushState({ year: this.state.year, month: this.state.month, day: this.state.day }, null, url);
	}

	componentDidMount() {
		const params = new URLSearchParams(window.location.search);
		let year = parseInt(params.get('year'));
		let month = parseInt(params.get('month'));
		let day = parseInt(params.get('day'));
		if (year > 0 && (month >= 0 && month < 12) && (day > 0 && day < this.daysInMonth(month, year))) {
			this.setState(
				{
					year: parseInt(params.get('year')),
					month: parseInt(params.get('month')),
					day: parseInt(params.get('day'))
				},
				this.updateURL
			);
		} else this.updateURL();

		window.addEventListener('popstate', this.onControlButtonClick);
	}

	onControlButtonClick = (e) => {
		if (e.state != null) {
			this.setState({ year: e.state.year, month: e.state.month, day: e.state.day });
		}
	};

	render() {
		return [
			<Calendar
				key="calendar"
				{...this.state}
				nextMonth={this.nextMonth}
				previousMonth={this.previousMonth}
				onSelect={this.onSelect}
				daysInMonth={this.daysInMonth}
				months={this.months}
			/>,
			<Todo key="todo" {...this.state} months={this.months} />
		];
	}
=======
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
>>>>>>> b6dc1d76c05ac86256349157aaf843307e90a439
}

export default TodoCalendar;