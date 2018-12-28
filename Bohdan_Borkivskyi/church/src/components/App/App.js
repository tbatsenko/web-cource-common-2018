import React, { Component } from 'react'
import './App.css'
import Antichrist from '../Antichrist/Antichrist'
import Cristian from '../Cristian/Cristian'

export default class App extends Component {
  state = {
    antichrists: null,
    cristians: null,
  }

  constructor() {
    super()

    this.recalculatePosition = this.recalculatePosition.bind(this)
    this.handleAntichristClick = this.handleAntichristClick.bind(this)
  }

  recalculatePosition() {
    if (this.state.antichrists === null) {
      return
    }
    let anti = [...this.state.antichrists].map(obj => {
      return { ...obj }
    })
    let cristi = [...this.state.cristians].map(obj => {
      return { ...obj }
    })
    let punished = []
    for (let i = 0; i < anti.length; ++i) {
      let punishment = false
      if (anti[i].x <= 0 || anti[i].x >= 485) {
        anti[i].xMove *= -1
      }

      if (anti[i].y <= 0 || anti[i].y >= 285) {
        anti[i].yMove *= -1
      }

      anti[i].x += anti[i].xMove
      anti[i].y += anti[i].yMove
      if (anti[i].x < 0) {
        anti[i].x = 0
      }
      if (anti[i].y < 0) {
        anti[i].y = 0
      }
      if (anti[i].x > 485) {
        anti[i].x = 485
      }
      if (anti[i].y > 285) {
        anti[i].y = 285
      }
      if (this.state.cristians === null) {
        continue
      }
      for (let j = 0; j < this.state.cristians.length; j++) {
        let cristi = this.state.cristians[j]
        if (
          anti[i].x + 15 >= cristi.x &&
          anti[i].x - 15 <= cristi.x &&
          anti[i].y + 15 >= cristi.y &&
          anti[i].y - 15 <= cristi.y
        ) {
          punished.push(cristi.id)
          punishment = true
        }
      }
      if (punishment) {
        anti[i].xMove *= -1
        anti[i].yMove *= -1
        anti[i].x += anti[i].xMove
        anti[i].y += anti[i].yMove
      }
    }

    cristi = cristi.filter(cristian => !punished.includes(cristian.id))
    this.setState({ antichrists: anti, cristians: cristi })
  }

  calculateCristianPosition(index) {
    let baselineX = 450
    let baselineY = 150
    let groupNumber = 0
    let inGroupNumber = 0
    let groupCount = 1
    let iter = 0
    while (iter !== index) {
      if (inGroupNumber === groupCount) {
        groupCount += 2
        inGroupNumber = 0
        groupNumber += 1
      }
      inGroupNumber += 1
      iter += 1
      if (inGroupNumber === groupCount) {
        groupCount += 2
        inGroupNumber = 0
        groupNumber += 1
      }
    }
    let calculatedX = baselineX - groupNumber * 20
    let calculatedY =
      baselineY - (Math.floor(groupCount / 2) - inGroupNumber) * 20
    return [calculatedX, calculatedY]
  }

  generateRandomAntichrists(n) {
    let anti = []
    for (let i = 0; i < n; ++i) {
      let antichrist = {
        id: i,
        x: Math.floor(Math.random() * 200) + 1,
        y: Math.floor(Math.random() * 270) + 1,
        xMove: Math.floor(Math.random() * 2 + 1),
        yMove: Math.floor(Math.random() * 2 + 1),
      }
      antichrist.xMove =
        Math.random() < 0.5 ? antichrist.xMove : -antichrist.xMove
      antichrist.yMove =
        Math.random() < 0.5 ? antichrist.yMove : -antichrist.yMove
      anti.push(antichrist)
    }
    this.setState({ antichrists: anti })
  }

  generateCristians(n) {
    let cristi = []
    for (let i = 0; i < n; ++i) {
      let cristian = {
        id: i,
        x: this.calculateCristianPosition(i)[0],
        y: this.calculateCristianPosition(i)[1],
      }
      cristi.push(cristian)
    }
    this.setState({ cristians: cristi })
  }

  render() {
    if (this.state.antichrists === null || this.state.cristians === null) {
      return <div className="App">Loading game</div>
    }
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
        {this.state.cristians.map((cristian, index) => (
          <Cristian
            key={cristian.id}
            id={cristian.id}
            x={cristian.x}
            y={cristian.y}
          />
        ))}
        <div className="Church" />
      </div>
    )
  }

  componentDidMount() {
    console.log('mounted')
    this.generateRandomAntichrists(5)
    this.generateCristians(9)

    setInterval(this.recalculatePosition, 70)
  }

  handleAntichristClick(antichrist_id) {
    let anti = this.state.antichrists.filter(
      antichrist => antichrist.id !== antichrist_id
    )

    let cristi = [...this.state.cristians].map(obj => {
      return { ...obj }
    })
    cristi.push({
      id: cristi[cristi.length-1].id+1,
      x: this.calculateCristianPosition(cristi[cristi.length-1].id+1)[0],
      y: this.calculateCristianPosition(cristi[cristi.length-1].id+1)[1],
    })
    this.setState({ antichrists: anti, cristians: cristi })
  }
}
