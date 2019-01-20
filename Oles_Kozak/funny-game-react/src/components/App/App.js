import React, { Component } from 'react'
import { shuffle, doubleElements } from '../../utils'

import Field from '../Field'
import CountdownTimer from '../CountdownTimer'

class App extends Component {
  state = {
    isGameOver: false,
    moves: 0,
    pictures: shuffle([
      ...doubleElements([
        'pear.svg',
        'apple.svg',
        'cherry.svg',
        'blueberries.svg',
      ]),
      'talon.svg',
    ]),
  }

  doExplosion = () => {
    let explosionSound = this.refs.audio
    explosionSound.volume = 0.4
    explosionSound.play()

    this.refs.explosion.style.display = 'block'
    setTimeout(() => (this.refs.explosion.style.display = 'none'), 2000)
  }

  gameOver = () => {
    this.doExplosion()

    setTimeout(() => {
      this.setState({ isGameOver: true })
    }, 1800)
  }

  render() {
    const { pictures, moves, isGameOver } = this.state
    const gameOverCard = pictures.findIndex(img => img === 'talon.svg')
    return (
      <>
        <audio ref={'audio'} preload="auto" src="audio/explosion.mp3" />

        <section
          style={{ display: isGameOver ? 'flex' : 'none' }}
          className="game-over-window"
        >
          <p className="game-over-window__text">Don't worry. Eto ne konec</p>
          <button
            className="game-over-window__close-button"
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </section>

        <div ref={'explosion'} className="overlay-explosion" />

        <span className="game-name">FUNNY GAME</span>

        <section id="game">
          <CountdownTimer seconds={600} onExpired={this.gameOver} />

          <Field
            pictures={pictures}
            gameOverCard={gameOverCard}
            onCompareFail={() => this.setState({ moves: moves + 1 })}
            onGameOver={this.gameOver}
          />

          <section className="round-info shadow">
            <h3 className="round-info__title3">MOVES:</h3>
            <span className="round-info__num-text">{moves}</span>
          </section>
        </section>
      </>
    )
  }
}

export default App
