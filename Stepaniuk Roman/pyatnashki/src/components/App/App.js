import React, { Component } from 'react';
import './App.css';
import Cell from '../Cell/Cell';
import CellEmpty from "../Cell/CellEmpty";


class App extends Component {
  render() {
    return (
      <div className="App">
          {cellList}
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
var numbers, cellList, chunkedList, i,j,temparray, chunk;
startGame()
function startGame() {
    emptyX = 3;
    emptyY = 3;
    movetoX = 3;
    movetoY = 3;
    numbers = shuffle(Array.from({length: 15}, (v, k) => k+1));

    cellList = numbers.map(function(i, index){
        return <Cell key={index} number={i} inPosition={"notPosition"}/>;
    });
    cellList.push(<CellEmpty key={15}/>);

    chunkedList = [];
    chunk = 4;
    for (i=0,j=cellList.length; i<j; i+=chunk) {
        temparray = cellList.slice(i,i+chunk);
        chunkedList.push(temparray)
    }
    checkCell()
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
    if (direction === 'BOTTOM' && emptyY < 3) movetoY++;
    else if (direction === 'TOP' && emptyY > 0) movetoY--;
    else if (direction === 'LEFT' && emptyX > 0) movetoX--;
    else if (direction === 'RIGHT' && emptyX < 3) movetoX++
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
    for(var i=0; i<16; i++){
        if(cellList[i].props.number === i + 1 && cellList[i].type.name === "Cell"){
            cellList[i] = <Cell key={cellList[i].key} number={cellList[i].props.number} inPosition={"inPosition"}/>
        }
        else if(cellList[i].type.name === "Cell"){
            cellList[i] = <Cell key={cellList[i].key} number={cellList[i].props.number} inPosition={"notPosition"}/>
            curVic = false;
        }
    }
    if (curVic){
        setTimeout(function() { alert("YOU WON!!!\nPress enter to play more"); }, 102);
        startGame()
    }

}

export default App;
