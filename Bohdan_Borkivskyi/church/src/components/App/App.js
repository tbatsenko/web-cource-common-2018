import React, { Component } from 'react'
import './App.css'
import Antichrist from '../Antichrist/Antichrist'

export default class App extends Component {
  state = {
    antichrists: [
      {
        id: 1,
        x: 20,
        y: 30,
        xMove: 3,
        yMove: 4,
      },
      {
        id: 2,
        x: 70,
        y: 180,
        xMove: 5,
        yMove: 2,
      },
    ],
    cristians: [
      {
        id: 1,
        x: 0,
        y: 0,
      },
    ],
  }

  constructor() {
    super()

    this.recalculatePosition = this.recalculatePosition.bind(this)
    this.handleAntichristClick = this.handleAntichristClick.bind(this)
  }



  recalculatePosition() {
    let anti = [...this.state.antichrists].map(obj => {
      return { ...obj }
    })
    for (let i = 0; i < anti.length; ++i) {
      if (anti[i].x <= 0 || anti[i].x >= 485) {
        anti[i].xMove *= -1
      }

      if (anti[i].y <= 0 || anti[i].y >= 285) {
        anti[i].yMove *= -1
      }

      anti[i].x += anti[i].xMove
      anti[i].y += anti[i].yMove
      if(anti[i].x < 0){anti[i].x = 0}
      if(anti[i].y < 0){anti[i].y = 0}
      if(anti[i].x > 485){anti[i].x = 485}
      if(anti[i].y > 285){anti[i].y = 285}
    }
    this.setState({ antichrists: anti })
  }

  generate_random_antichrists(n) {
    let anti = []
    for (let i = 0; i < n; ++i) {
      let antichrist = {
        id: i,
        x: Math.floor(Math.random() * 200)+1,
        y: Math.floor(Math.random() * 270)+1,
        xMove: Math.floor(Math.random()*5+3),
        yMove: Math.floor(Math.random()*5+3),
      }
      antichrist.xMove = Math.random() < 0.5 ? antichrist.xMove : -antichrist.xMove
      antichrist.yMove = Math.random() < 0.5 ? antichrist.yMove : -antichrist.yMove
      anti.push(antichrist)
    }
    this.setState({ antichrists: anti })
  }

  render() {
    return (
      <div className="App">
        {this.state.antichrists.map(antichrist => (
          <Antichrist
            key={antichrist.id}
            id={antichrist.id}
            x={antichrist.x}
            y={antichrist.y}
            onClick={this.handleAntichristClick}
          />
        ))}

        <div className="Church" />
      </div>
    )
  }

  componentDidMount() {
    this.generate_random_antichrists(5)
    setInterval(this.recalculatePosition, 500)
  }

  handleAntichristClick(antichrist_id) {
    let anti = this.state.antichrists.filter(
      antichrist => antichrist.id !== antichrist_id
    )
    this.setState({ antichrists: anti })
  }
}
