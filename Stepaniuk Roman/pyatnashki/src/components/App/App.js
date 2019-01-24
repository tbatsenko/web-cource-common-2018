import React, { Component } from 'react';
// import logo from './logo.svg';
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

var numbers = shuffle(Array.from({length: 15}, (v, k) => k+1));

var cellList = numbers.map(function(i){
    return <Cell number={i} />;
});
cellList.push(<CellEmpty />);

var chunkedList = [];
var i,j,temparray, chunk = 4;
for (i=0,j=cellList.length; i<j; i+=chunk) {
    temparray = cellList.slice(i,i+chunk);
    chunkedList.push(temparray)
}



console.log(chunkedList);
export default App;
