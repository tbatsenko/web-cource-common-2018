import React, { Component } from 'react'
import './field.scss'
import Card from '../Card/Card'
import CountdownTimer from '../CountdownTimer'

class Field extends Component {
  constructor(props) {
    super(props)

    this.state = {
      children: [],
      moves: 0,
      enable: false,
    }
    this.stopTimer = false
  }

  onRotation = childReactComponent => {
    this.state.children.push(childReactComponent)
    if (childReactComponent.state.picture.includes('talon')) {
      setTimeout(this.explosion, 700)
    }

    if (this.state.children.length === 2) {
      this.setState({ enable: true })

      let children = this.state.children
      let moves = this.state.moves

      if (
        this.state.children[0].state.picture !==
        this.state.children[1].state.picture
      ) {
        setTimeout(
          function() {
            children[0].state.opened = false
            children[1].state.opened = false
            children[0].state.enable = true
            children[1].state.enable = true
            moves++

            this.setState({
              children: [],
              moves: moves,
              enable: false,
            })
          }.bind(this),
          800
        )
      } else {
        setTimeout(
          function() {
            children[0].state.enable = false
            children[1].state.enable = false
            moves++

            this.setState({
              children: [],
              moves: moves,
              enable: false,
            })
          }.bind(this),
          800
        )
      }
    }
  }

  gameOver() {
    const modal = document.getElementById('game-modal')
    const restart = document.getElementsByClassName(
      'game-over-window__close-button'
    )[0]

    modal.style.display = 'flex'
    restart.onclick = function() {
      window.location.reload()
    }
  }

  explosion = () => {
    let explosion_sound = document.getElementById('explosion-audio')
    explosion_sound.volume = 0.4
    explosion_sound.play()

    document.getElementsByClassName('overlay-explosion')[0].style.display =
      'block'
    setTimeout(
      () =>
        (document.getElementsByClassName('overlay-explosion')[0].style.display =
          'none'),
      2000
    )
    this.stopTimer = true
    setTimeout(this.gameOver, 1800)
  }

  render() {
    const { pictures } = this.props

    return (
      <section id="game">
        <CountdownTimer seconds={60} onExpired={this.explosion} />

        <section className="field shadow">
          <div
            className="field__blockClick"
            style={{ display: this.state.enable ? 'block' : 'none' }}
          />

          {pictures.map((img, index) => (
            <Card key={index} picture={'/img/' + img} onRef={this.onRotation} />
          ))}
        </section>
        <section className="round-info shadow">
          <h3 className="round-info__title3">MOVES:</h3>
          <span className="round-info__num-text">{this.state.moves}</span>
        </section>
      </section>
    )
  }
}

export default Field
