import React from 'react';
import './Stopwatch.css';

var Stopwatch = ({starter}) => (
    <div className="Stopwatch">
        {checkToStart(starter)}
        <span className="Stopwatch__label">{minutesLabel + ':' +secondsLabel}</span>
    </div>
);



setInterval(setTime, 1000);

function checkToStart(starter) {
    if(starter === 0)
        totalSeconds = -1;
}

var minutesLabel = 0;
var secondsLabel = 0;
var totalSeconds = 0;
function setTime() {
    ++totalSeconds;
    secondsLabel = pad(totalSeconds % 60);
    minutesLabel = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

export default Stopwatch;
