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
    this.restart = this.restart.bind(this)
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
    let bumped = []
    for (let i = 0; i < anti.length; ++i) {
      let punishment = false
      if (anti[i].x <= 0 || anti[i].x >= 485) {
        anti[i].xMove *= -1
      }

      if (anti[i].y <= 0 || anti[i].y >= 285) {
        anti[i].yMove *= -1
      }
      let multiplier = anti.length <= 2 ? 3 : 1
      anti[i].x += anti[i].xMove * multiplier
      anti[i].y += anti[i].yMove * multiplier

      if (anti[i].x < 300) {
        anti[i].good = false
      }

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

      if (bumped.includes(i)) {
        continue
      }
      for (let j = 0; j < this.state.antichrists.length; j++) {
        if (i === j) {
          continue
        }
        if (App.areOverlapped(anti[i], anti[j])) {
          bumped.push(i)
          bumped.push(j)

          let tempXMove = anti[j].xMove
          let tempYMove = anti[j].yMove

          anti[j].xMove = anti[i].xMove
          anti[j].yMove = anti[i].yMove

          anti[i].xMove = tempXMove
          anti[i].yMove = tempYMove
        }
      }

      if (this.state.cristians === null) {
        continue
      }
      for (let j = 0; j < this.state.cristians.length; j++) {
        let cristi = this.state.cristians[j]
        if (App.areOverlapped(anti[i], cristi)) {
          if (!anti[i].good) {
            punished.push([cristi.id, anti[i].id])
          }
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

    let newAntichrists = []
    for (let i = 0; i < punished.length; ++i) {
      let cristiId = punished[i][0]
      let cristi = this.state.cristians.filter(
        cristi => cristi.id === cristiId
      )[0]
      let antiId = punished[i][1]
      let antic = this.state.antichrists.filter(
        antichrist => antichrist.id === antiId
      )[0]
      newAntichrists.push({
        id: anti[anti.length - 1].id + i + 1,
        x: cristi.x,
        y: cristi.y,
        xMove: antic.xMove,
        yMove: antic.yMove,
        good: true,
      })
    }

    for (let i = 0; i < newAntichrists.length; ++i) {
      anti.push(newAntichrists[i])
    }
    cristi = cristi.filter(
      cristian => !punished.map(pair => pair[0]).includes(cristian.id)
    )
    this.setState({ antichrists: anti, cristians: cristi })
  }

  static calculateCristianPosition(index) {
    let interval = 20
    let baselineX = 480
    let baselineY = 150
    let groupNumber = 0
    let inGroupNumber = 0
    let groupCount = [1, 2, 3, 4, 5, 6, 7]
    let groupCountIndex = 0
    let iter = 0
    while (iter !== index) {
      if (inGroupNumber === groupCount[groupCountIndex]) {
        groupCountIndex += 1
        inGroupNumber = 0
        groupNumber += 1
      }
      inGroupNumber += 1
      iter += 1
      if (inGroupNumber === groupCount[groupCountIndex]) {
        groupCountIndex += 1
        inGroupNumber = 0
        groupNumber += 1
      }
    }
    let calculatedX = baselineX - groupNumber * interval
    if (groupCount[groupCountIndex] % 2 === 0) {
      baselineY += interval / 2
    }
    let calculatedY =
      baselineY -
      (Math.floor(groupCount[groupCountIndex] / 2) - inGroupNumber) * interval
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
        good: false,
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
        x: App.calculateCristianPosition(i)[0],
        y: App.calculateCristianPosition(i)[1],
      }
      cristi.push(cristian)
    }
    this.setState({ cristians: cristi })
  }

  static areOverlapped(instance1, instance2) {
    return (
      Math.pow(
        Math.pow(instance1.x - instance2.x, 2) +
          Math.pow(instance1.y - instance2.y, 2),
        0.5
      ) < 15
    )
  }

  render() {
    if (
      this.state.antichrists === null ||
      this.state.cristians === null ||
      this.state.antichrists.length === 0 ||
      this.state.cristians.length === 0
    ) {
      return (
        <div className="App">
          <button onClick={this.restart}>New game</button>
        </div>
      )
    }
    return (
      <div className="App">
        {this.state.antichrists.map(antichrist => (
          <Antichrist
            key={antichrist.id}
            id={antichrist.id}
            x={antichrist.x}
            y={antichrist.y}
            good={antichrist.good}
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

  restart() {
    this.generateRandomAntichrists(this.props.antichrists)
    this.generateCristians(this.props.cristians)
  }

  componentDidMount() {
    this.restart()

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
      id: cristi[cristi.length - 1].id + 1,
      x: App.calculateCristianPosition(cristi[cristi.length - 1].id + 1)[0],
      y: App.calculateCristianPosition(cristi[cristi.length - 1].id + 1)[1],
    })
    this.setState({ antichrists: anti, cristians: cristi })
  }
}
