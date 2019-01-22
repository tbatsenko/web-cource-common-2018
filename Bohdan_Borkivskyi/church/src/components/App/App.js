import React, { Component } from 'react'
import './App.css'
import Person from '../Person/Person'

export default class App extends Component {
  state = {
    antichrists: null,
    cristians: null,
  }

  use_requestFrames = false

  clickHandler = null

  constructor() {
    super()

    this.recalculatePosition = this.recalculatePosition.bind(this)
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

      if (anti[i].x <= 0) {
        anti[i].xMove = Math.abs(anti[i].xMove)
      } else if (anti[i].x >= this.props.size.width - this.props.size.person) {
        anti[i].xMove = -Math.abs(anti[i].xMove)
      }

      if (anti[i].y <= 0) {
        anti[i].yMove = Math.abs(anti[i].yMove)
      } else if (anti[i].y >= this.props.size.height - this.props.size.person) {
        anti[i].yMove = -Math.abs(anti[i].yMove)
      }

      let multiplier = anti.length <= 2 ? 1 : 0.5
      anti[i].x += anti[i].xMove * multiplier
      anti[i].y += anti[i].yMove * multiplier

      if (bumped.includes(i)) {
        continue
      }
      for (let j = 0; j < this.state.antichrists.length; j++) {
        if (i === j) {
          continue
        }

        if (App.areVeryOverlapped(anti[i], anti[j], this.props.size.person)) {
          anti[i] = this.movedToSafePlace(anti[i])
        } else if (
          App.areOverlapped(anti[i], anti[j], this.props.size.person)
        ) {
          if (
            App.areOverlapped(anti[i], anti[j], this.props.size.person, 16) &&
            anti[i].xMove === anti[j].xMove &&
            anti[i].yMove === anti[j].yMove
          ) {
            let newXMove = Math.abs(anti[i].xMove) - 0.1
            if (anti[i].xMove < 0) {
              newXMove *= -1
            }
            anti[i].xMove = newXMove
            anti[i].yMove = Math.pow(1 - Math.pow(anti[i].xMove, 2), 0.5)
            console.log(anti[i].xMove, anti[i].yMove)
            if (anti[i].x < anti[j].x) {
              anti[i].x -= 1
            } else {
              anti[j].x -= 1
            }
            if (anti[i].y < anti[j].y) {
              anti[i].y -= 1
            } else {
              anti[j].y -= 1
            }
          }
          bumped.push(i)
          bumped.push(j)
          anti[i].x -= anti[i].xMove
          anti[i].y -= anti[i].yMove
          anti[j].x -= anti[j].xMove
          anti[j].y -= anti[j].yMove
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
      let obstacle_x = 0
      let obstacle_y = 0
      for (let j = 0; j < this.state.cristians.length; j++) {
        let cristi = this.state.cristians[j]
        if (App.areVeryOverlapped(anti[i], cristi, this.props.size.person)) {
          anti[i] = this.movedToSafePlace(anti[i])
        } else if (App.areOverlapped(anti[i], cristi, this.props.size.person)) {
          obstacle_x = cristi.x
          obstacle_y = cristi.y
          if (!anti[i].good) {
            punished.push({
              id: cristi.id,
              x: cristi.x,
              y: cristi.y,
              xMove: anti[i].xMove,
              yMove: anti[i].yMove,
            })
          }
          punishment = true
          break
        }
      }

      if (punishment) {
        anti[i].good = true
        if (anti[i].xMove < 0) {
          anti[i].yMove *= -1
        } else {
          if (
            Math.abs(anti[i].x - obstacle_x) > Math.abs(anti[i].y - obstacle_y)
          ) {
            anti[i].xMove *= -1
          } else {
            anti[i].yMove *= -1
          }
        }
        anti[i].x += anti[i].xMove * 2
        anti[i].y += anti[i].yMove * 2
      }

      if (anti[i].x < this.props.size.width - this.props.size.person - 200) {
        anti[i].good = false
      }

      if (anti[i].x < 0) {
        anti[i].x = 0
      }
      if (anti[i].y < 0) {
        anti[i].y = 0
      }
      if (anti[i].x > this.props.size.width - this.props.size.person) {
        anti[i].x = this.props.size.width - this.props.size.person
      }
      if (anti[i].y > this.props.size.height - this.props.size.person) {
        anti[i].y = this.props.size.height - this.props.size.person
      }
    }

    let newAntichrists = []
    for (let i = 0; i < punished.length; ++i) {
      newAntichrists.push({
        id: anti[anti.length - 1].id + i + 1,
        x: punished[i].x,
        y: punished[i].y,
        xMove: punished[i].xMove,
        yMove: punished[i].yMove,
        good: true,
      })
    }

    for (let i = 0; i < newAntichrists.length; ++i) {
      anti.push(newAntichrists[i])
    }
    cristi = cristi.filter(
      cristian => !punished.map(obj => obj.id).includes(cristian.id),
    )

    for (let i = 0; i < cristi.length; ++i) {
      cristi[i].id = i
      cristi[i].x = App.calculateCristianPosition(
        i,
        cristi.length,
        this.props.size,
      )[0]
      cristi[i].y = App.calculateCristianPosition(
        i,
        cristi.length,
        this.props.size,
      )[1]
    }

    this.setState({ antichrists: anti, cristians: cristi })
  }

  movedToSafePlace(obj) {
    let overlap = true
    while (overlap) {
      obj.x += obj.xMove
      obj.y += obj.yMove
      overlap = false
      for (let i = 0; i < this.state.antichrists.length; ++i) {
        let anti = this.state.antichrists[i]
        if (obj.id === anti.id) {
          continue
        }
        if (App.areOverlapped(obj, anti, this.props.size.person)) {
          overlap = true
          break
        }
      }
      if (overlap) {
        continue
      }
      for (let i = 0; i < this.state.cristians.length; ++i) {
        let cristi = this.state.cristians[i]

        if (App.areOverlapped(obj, cristi, this.props.size.person)) {
          overlap = true
          break
        }
      }
    }
    return obj
  }

  static generatePyramidStructure(total) {
    let steps = [1]
    while (steps.reduce((a, b) => a + b, 0) < total) {
      let next = steps[steps.length - 1] + 1
      if (steps.reduce((a, b) => a + b, 0) + next <= total) {
        steps.push(next)
      } else {
        break
      }
    }
    let rest = total - steps.reduce((a, b) => a + b, 0)

    if (rest > 0) {
      steps.push(rest)
    }

    steps.sort((a, b) => a - b)

    return steps
  }

  static calculateCristianPosition(index, total, size) {
    let interval = 20
    let baselineX = size.width - size.person - 5
    let baselineY = size.height / 2
    let groupNumber = 0
    let inGroupNumber = 0
    let groupCount = App.generatePyramidStructure(total)
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
    let extraShift = 0
    if (groupCount[groupCountIndex] % 2 === 0) {
      extraShift = Number(interval / 2)
    }
    if (groupCount[groupCountIndex] === undefined) {
      groupCountIndex -= 1
    }

    let calculatedY =
      baselineY +
      extraShift -
      (Math.floor(groupCount[groupCountIndex] / 2) - inGroupNumber) * interval
    // console.log(calculatedX, calculatedY)
    return [calculatedX, calculatedY]
  }

  generateRandomAntichrists(n) {
    let anti = []
    let i = 0
    while (i < n) {
      let randomXMove = Math.random()
      let antichrist = {
        id: i,
        x: Math.floor(Math.random() * 270) + 1,
        y: Math.floor(Math.random() * 270) + 1,
        xMove: randomXMove,
        yMove: Math.pow(1 - randomXMove ** 2, 0.5),
        good: false,
      }
      antichrist.xMove =
        Math.random() < 0.5 ? antichrist.xMove : -antichrist.xMove
      antichrist.yMove =
        Math.random() < 0.5 ? antichrist.yMove : -antichrist.yMove

      let overlapped = false
      for (let j = 0; j < anti.length; ++j) {
        if (App.areOverlapped(antichrist, anti[j], this.props.size.person)) {
          overlapped = true
        }
      }
      if (overlapped) {
        continue
      }

      anti.push(antichrist)
      i += 1
    }
    this.setState({ antichrists: anti })
  }

  generateCristians(n) {
    let cristi = []
    for (let i = 0; i < n; ++i) {
      let cristian = {
        id: i,
        x: App.calculateCristianPosition(i, n, this.props.size)[0],
        y: App.calculateCristianPosition(i, n, this.props.size)[1],
      }
      cristi.push(cristian)
    }
    this.setState({ cristians: cristi })
  }

  static areVeryOverlapped(instance1, instance2, size) {
    return App.areOverlapped(instance1, instance2, size, 12)
  }

  static areOverlapped(instance1, instance2, size, threshold = 15) {
    if (!App.areSquaresOverlapped(instance1, instance2, size, threshold)) {
      return false
    }

    return (
      Math.pow(
        Math.pow(instance1.x - instance2.x, 2) +
          Math.pow(instance1.y - instance2.y, 2),
        0.5
      ) < threshold
    )
  }

  static areSquaresOverlapped(instance1, instance2, size, threshold) {
    let x_collapse = false
    let y_collapse = false

    if (instance1.x < instance2.x) {
      if (instance1.x + size - instance2.x > size - threshold) {
        x_collapse = true
      }
    } else {
      if (instance2.x + size - instance1.x > size - threshold) {
        x_collapse = true
      }
    }

    if (instance1.y < instance2.y) {
      if (instance1.y + size - instance2.y > size - threshold) {
        y_collapse = true
      }
    } else {
      if (instance2.y + size - instance1.y > size - threshold) {
        y_collapse = true
      }
    }

    return x_collapse || y_collapse
  }

  render() {
    if (this.state.antichrists === null || this.state.cristians === null) {
      return <p>Loading...</p>
    } else if (this.state.antichrists.length === 0) {
      return (
        <div
          className="App App_win"
          style={{
            width: this.props.size.width,
            height: this.props.size.height,
          }}
        >
          <button onClick={this.restart}>New game</button>
          <h1 className="App__text">Catholics won😇</h1>
        </div>
      )
    } else if (this.state.cristians.length === 0) {
      return (
        <div
          className="App App_lose"
          style={{
            width: this.props.size.width,
            height: this.props.size.height,
          }}
        >
          <button onClick={this.restart}>New game</button>
          <h1 className="App__text">Antichrists won😈</h1>
        </div>
      )
    }

    let div_id = 'App' + this.props.id

    return (
      <div
        className="App"
        id={div_id}
        style={{ width: this.props.size.width, height: this.props.size.height }}
      >
        {this.state.antichrists.map((antichrist, index) => (
          <Person
            key={antichrist.id}
            id={antichrist.id}
            x={antichrist.x}
            y={antichrist.y - this.props.size.person * index}
            size={this.props.size.person}
            personality={{ isAnti: true, isGoodAnti: antichrist.good }}
          />
        ))}
        {this.state.cristians.map((cristian, index) => (
          <Person
            key={cristian.id}
            id={cristian.id}
            x={cristian.x}
            y={
              cristian.y -
              this.props.size.person * (index + this.state.antichrists.length)
            }
            size={this.props.size.person}
            personality={{ isAnti: false, isPop: cristian.id === 0 }}
          />
        ))}
        <div
          className="Church"
          style={{
            top:
              -this.props.size.person *
              (this.state.cristians.length + this.state.antichrists.length),
          }}
        />
      </div>
    )
  }

  restart() {
    this.setState({ antichrists: null, cristians: null })
    this.generateRandomAntichrists(this.props.antichrists)
    this.generateCristians(this.props.cristians)
  }

  componentDidMount() {
    this.restart()
    if (this.use_requestFrames) {
      window.requestAnimationFrame(this.recalculatePosition)
    } else {
      setInterval(this.recalculatePosition, 5)
    }
  }

  componentDidUpdate() {
    if (this.clickHandler === null) {
      this.clickHandler = true
      this.addClickHandler()
    }
    if (this.use_requestFrames) {
      window.requestAnimationFrame(this.recalculatePosition)
    }
  }

  addClickHandler() {
    document
      .getElementById('App' + this.props.id)
      .addEventListener('click', event => {
        let click_obj = { x: event.clientX, y: event.clientY }
        for (let i = 0; i < this.state.antichrists.length; ++i) {
          if (
            App.areOverlapped(
              click_obj,
              this.state.antichrists[i],
              this.props.size.person,
            )
          ) {
            this.handleAntichristClick(this.state.antichrists[i].id)
            break
          }
        }
      })
  }

  handleAntichristClick(antichrist_id) {
    let anti = this.state.antichrists.filter(
      antichrist => antichrist.id !== antichrist_id
    )

    let cristi = [...this.state.cristians].map(obj => {
      return { ...obj }
    })

    cristi.push({
      id: 0,
    })

    for (let i = 0; i < cristi.length; ++i) {
      cristi[i].id = i
      cristi[i].x = App.calculateCristianPosition(
        i,
        cristi.length,
        this.props.size,
      )[0]
      cristi[i].y = App.calculateCristianPosition(
        i,
        cristi.length,
        this.props.size,
      )[1]
    }

    this.setState({ antichrists: anti, cristians: cristi })
  }
}
