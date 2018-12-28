import React from 'react';


const Calendar = props => {
    return <section className='calendar'>
        <span className='calendar--month-name'>{props.currentMonth}</span>
        <div className='calendar-container'>
            <ul className='calendar-header__weekday-list'>
                <li className='calendar-header__weekday'>Mon</li>
                <li className='calendar-header__weekday'>Tue</li>
                <li className='calendar-header__weekday'>Wed</li>
                <li className='calendar-header__weekday'>Thu</li>
                <li className='calendar-header__weekday'>Fri</li>
                <li className='calendar-header__weekday'>Sun</li>
                <li className='calendar-header__weekday'>Sat</li>
            </ul>
            <ul className='calendar__days'>
                {props.days.map(item=>{
                const isCurrentMonth = item.month ===props.monthNumber;
                return<Tile key={`${item.number} ${item.month}`} number={item.number} isCurrentMonth={isCurrentMonth} />
                })}
            </ul>
        </div>
    </section>;
};


const Tile = props => {
    return <li className={props.isCurrentMonth ? 'calendar__tile': 'calendar__tile--inactive'}>
        {props.number}
    </li>;
};

export default Calendar;