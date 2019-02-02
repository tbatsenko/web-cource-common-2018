import React from 'react';
import ReactDOM from 'react-dom';
import todo from './todo';
import Calendar from './components/Calendar'

todo();

ReactDOM.render(<Calendar />, document.getElementById('calendar'));

let today = new Date();
let header = document.getElementsByClassName('header')[0];
header.innerText = 'Today is ' + today.toDateString();
