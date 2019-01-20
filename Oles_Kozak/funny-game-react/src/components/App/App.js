import React from 'react'
import Field from '../Field'
import { shuffle, doubleElements } from '../../utils'

const App = () => (
  <>
    <audio id="explosion-audio" preload="auto" src="audio/explosion.mp3" />
    <section id="game-modal" className="game-over-window">
      <p className="game-over-window__text">Don't worry. Eto ne konec</p>
      <button className="game-over-window__close-button">Restart</button>
    </section>
    <div className="overlay-explosion" />
    <span className="game-name">FUNNY GAME</span>

    <Field
      pictures={shuffle([
        ...doubleElements([
          'pear.svg',
          'apple.svg',
          'cherry.svg',
          'blueberries.svg',
        ]),
        'talon.svg',
      ])}
    />
  </>
)

export default App
