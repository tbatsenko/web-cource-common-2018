import React from 'react';
import './Highscore.css';

var Highscore = ({difficulty}) => (
    <div className="Highscore">
        <i className="Highscore__caption">High scores</i>
        <ol>
            {getDifficulty(difficulty)}
            {scoresList}
        </ol>
    </div>
);

var scoresTable, scoresList, difficultyLevel=0;


function getDifficulty(difficulty) {
    difficultyLevel = difficulty
}

function toTable(){
    scoresTable = localStorage.getItem("scores") === null ? {easy : [],medium : [], hard : []} : JSON.parse(localStorage.getItem("scores"));
    if(difficultyLevel === 0){
        scoresList = scoresTable.easy.map(function(i, index){
            return <li key={index} className="Highscore__li">{convertTime(i)}</li>;
        })}
    else if(difficultyLevel === 1){
        scoresList = scoresTable.medium.map(function(i, index){
            return <li key={index} className="Highscore__li">{convertTime(i)}</li>;
        })}
        else if(difficultyLevel === 2){
        scoresList = scoresTable.hard.map(function(i, index){
            return <li key={index} className="Highscore__li">{convertTime(i)}</li>;
        })}
}

setInterval(toTable, 500);

function convertTime(totalSeconds) {
    var secondsLabel = pad(totalSeconds % 60);
    var minutesLabel = pad(parseInt(totalSeconds / 60));
    return minutesLabel + ':' + secondsLabel
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

export default Highscore;
