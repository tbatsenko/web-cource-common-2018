import React from 'react';
import './Calendar.scss';

const NUMBER_OF_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MONTH_NAMES = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];


const Calendar = props => {
    const date = new Date(props.year, props.month, 1);
    const firstDayWeekday = date.getDay();
    let firstDay = 1;
    let prevMonthIndex;

    if (props.month === 0) prevMonthIndex = 11;
    else prevMonthIndex = props.month - 1;

    if (firstDayWeekday !== 0) {
        firstDay = NUMBER_OF_DAYS[prevMonthIndex] - firstDayWeekday + 2;
    }
    return <section className='calendar'>
        <span className='calendar--month-name'>{MONTH_NAMES[props.month]}</span>
        <div className='calendar-container'>
            <span className='calendar-header__weekday'>Mon</span>
            <span className='calendar-header__weekday'>Tue</span>
            <span className='calendar-header__weekday'>Wed</span>
            <span className='calendar-header__weekday'>Thu</span>
            <span className='calendar-header__weekday'>Fri</span>
            <span className='calendar-header__weekday'>Sun</span>
            <span className='calendar-header__weekday'>Sat</span>
            <CalendarGrid
                currentDate={firstDay}
                prevMonthDays={NUMBER_OF_DAYS[prevMonthIndex]}
                currMonthDays={NUMBER_OF_DAYS[props.month]}
                currMonth={MONTH_NAMES[props.month]}
                currYear={props.year}
                setSelectedDate={props.setSelectedDate}
            />
        </div>
    </section>;
};

const getMonthName = (isCurrentMonth, currYear, currMonth, currentDate) => {
    if (!isCurrentMonth) {
        if (currMonth === 11) {
            if (currentDate < 19) {
                currMonth = 0;
                currYear = currYear + 1;
            }
            else {
                currMonth = currMonth - 1;
            }
        }
        else if (currMonth === 0) {
            if (currentDate > 19) {
                currMonth = 11;
                currYear = currYear - 1;
            }
            else {
                currMonth = currMonth + 1;
            }
        }
        else {
            if (currentDate < 19) currMonth = currMonth + 1;
            else currMonth = currMonth - 1;
        }
    }
    console.log(currYear + currMonth + currentDate);
    return currYear + currMonth + currentDate;
};


const CalendarGrid = props => {
    let currentDate = props.currentDate;
    let isCurrentMonth = currentDate === 1;
    const dayTiles = [];
    for (let i = 0; i < 42; i++) {
        if (!isCurrentMonth && currentDate > props.prevMonthDays) {
            isCurrentMonth = true;
            currentDate = 1;
        } else if (isCurrentMonth && currentDate > props.currMonthDays) {
            isCurrentMonth = false;
            currentDate = 1;
        }
        dayTiles.push(
            <span
                key={getMonthName(isCurrentMonth, props.currYear, props.currMonth, currentDate)}
                className={isCurrentMonth ? 'calendar__day--current' : 'calendar__day'}
                onClick={() => props.setSelectedDate(
                        getMonthName(isCurrentMonth, props.currYear, props.currMonth, currentDate))}
            >
                {currentDate++}
                </span>);
    }
    return <>
        {dayTiles}
    </>;
};


export default Calendar;