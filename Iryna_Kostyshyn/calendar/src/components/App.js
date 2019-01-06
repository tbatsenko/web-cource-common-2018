import React from 'react';
import TodoList from './TodoContainer';
import Calendar from './Calendar'
import '../App.scss';
import {compose, withState} from "recompose";

const withAppState = compose(
    withState('selectedDate', 'setSelectedDate', new Date().toDateString())

);

const App = withAppState(props => {
    const currentDate = new Date();
    return <main>
        <Calendar month={currentDate.getMonth()} year={currentDate.getFullYear()}
                  selectedDate={props.currentDate} setSelectedDate={props.setSelectedDate}/>
        <TodoList selectedDate={props.currentDate} />
    </main>
});



export default App;
