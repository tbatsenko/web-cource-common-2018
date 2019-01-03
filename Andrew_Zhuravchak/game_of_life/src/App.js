import React, { Component } from 'react'

import GameOfLife from './components/GameOfLife'

import './App.scss'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameOfLife lines={40} cellsPerLine={40} probabilityOfAliveCell={0.4}/>
      </div>
    )
  }
}

export default App
