import React, { Component } from 'react';
import './App.css';
import Cell from '../Cell/Cell';
import Panel from '../Panel/Panel';
import CellEmpty from "../Cell/CellEmpty";


class App extends Component {
  render() {
    return (
      <div className={"App " + difficultyApp}>
          {cellList}
          {difficultyPanel}
      </div>
    );
  }
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var emptyX, emptyY, movetoX, movetoY
var numbers, cellList, chunkedList,j,temparray, chunk, difficulty, rows, numOfCells, difficultyApp, solvable;

var i = 0
var buttonTypes = [{regionName:"Easy"}, {regionName:"Medium"}, {regionName:"Hard"}];

var buttons = buttonTypes.map(item => {
    return <button key={i++} className="Panel__button" onClick={() => handleRegionClick(item.regionName)}>{item.regionName}</button>
})

var difficultyPanel = <Panel buttons={buttons} />
// var difficultyIndex = difficultyPanel.props.difficulty
var difficultyIndex = 0;
console.log(difficultyPanel)

function gameFormat() {
    if (difficultyIndex === 0) {
        difficulty = "Cell--easy"
        difficultyApp = "App--easy"
        rows = 4
        numOfCells = 16
    }
    else if (difficultyIndex === 1) {
        difficulty = "Cell--medium"
        difficultyApp = "App--medium"
        rows = 5
        numOfCells = 25
    }
    else if (difficultyIndex === 2) {
        difficulty = "Cell--hard"
        difficultyApp = "App--hard"
        rows = 6
        numOfCells = 36
    }
}

startGame()
function startGame() {
    gameFormat()
    emptyX = rows - 1;
    emptyY = rows - 1;
    movetoX =rows - 1;
    movetoY =rows - 1;
    solvable = false;
    while(!solvable){
        numbers = shuffle(Array.from({length: numOfCells - 1}, (v, k) => k+1));
        solvable = checkNumbers(numbers)
    }

    cellList = numbers.map(function(i, index){
        return <Cell key={index} number={i} inPosition={"notPosition"} difficulty={difficulty}/>;
    });
    cellList.push(<CellEmpty key={numOfCells - 1} difficulty={difficulty}/>);

    chunkedList = [];
    chunk = rows;
    for (i=0,j=cellList.length; i<j; i+=chunk) {
        temparray = cellList.slice(i,i+chunk);
        chunkedList.push(temparray)
    }
    checkCell()
}

var counter;
function checkNumbers(nums) {
    counter = 0;
    for(i=0;i<nums.length;i++){
        for(j=0;j<i;j++){
            if(nums[j] > nums[i]){
                counter++;
            }
        }
    }
    return (counter + rows) % 2 !== 1;
}

const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;

document.addEventListener('keydown', e => {
    switch (e.keyCode) {
        case KEY_DOWN: {
            moveCell('TOP')
            return
        }
        case KEY_LEFT: {
            moveCell('RIGHT')
            return
        }
        case KEY_RIGHT: {
            moveCell('LEFT')
            return
        }
        case KEY_UP: {
            moveCell('BOTTOM')
            return
        }
    }
});


function moveCell(direction){
    if (direction === 'BOTTOM' && emptyY < rows - 1) movetoY++;
    else if (direction === 'TOP' && emptyY > 0) movetoY--;
    else if (direction === 'LEFT' && emptyX > 0) movetoX--;
    else if (direction === 'RIGHT' && emptyX < rows - 1) movetoX++
    replaceCell()
}

// var assert = require('assert');
var temp;
function replaceCell(){
    temp = chunkedList[movetoY][movetoX]
    chunkedList[movetoY][movetoX] = chunkedList[emptyY][emptyX]
    chunkedList[emptyY][emptyX] = temp
    // cellList = chunkedList[0].concat(chunkedList[1], chunkedList[2], chunkedList[3])
    cellList = [].concat.apply([], chunkedList)
    emptyX = movetoX
    emptyY = movetoY
    checkCell()
    //console.log(chunkedList[3][2])
}

var curVic;
function checkCell() {
    curVic = true;
    for(var i=0; i<numOfCells; i++){
        if(cellList[i].props.number === i + 1 && cellList[i].type.name === "Cell"){
            cellList[i] = <Cell key={cellList[i].key} number={cellList[i].props.number} inPosition={"inPosition"} difficulty={difficulty}/>
        }
        else if(cellList[i].type.name === "Cell"){
            cellList[i] = <Cell key={cellList[i].key} number={cellList[i].props.number} inPosition={"notPosition"} difficulty={difficulty}/>
            curVic = false;
        }
    }
    if (curVic){
        setTimeout(function() { alert("YOU WON!!!\nPress enter to play more"); }, 102);
        startGame()
    }

}


function handleRegionClick(region) {
    i = 0
    buttons = buttonTypes.map(item => {
        return <button key={i++} className="Panel__button" onClick={() => handleRegionClick(item.regionName)}>{item.regionName}</button>
    })
    if (region === "Easy") {
        difficultyIndex = 0
    }
    else if (region === "Medium") {
        difficultyIndex = 1
    }
    else if (region === "Hard") {
        difficultyIndex = 2
    }
    buttons[difficultyIndex] = <button key={difficultyIndex} className="Panel__button selected" onClick={() => handleRegionClick(region)}>{region}</button>
    // console.log(difficultyIndex)
    startGame()
}


export default App;
