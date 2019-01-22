import React, { Component } from 'react'
import TodoWrapper from './TodoWrapper'
import '../style/style.css'
import '../style/filter-container.css'


class App extends Component {

  render() {
    return (
      <div className="main-layout">
        <header className="top-layout">
          <h1 className="top-layout__main-text">What do you need to do?</h1>
        </header>

        <TodoWrapper/>
        <TodoWrapper/>
        <TodoWrapper/>
      </div>
    )
  }
}

export default App
