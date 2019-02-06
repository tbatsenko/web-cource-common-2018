import React, { Component } from 'react'
import './field.scss'
import Card from '../Card/Card'

class Field extends Component {
  static defaultProps = {
    onGameOver: () => {},
    onWin: () => {},
    onTry: () => {},
    onCompareFail: () => {},
    onCompareSuccess: () => {},
  }

  state = {
    triedCards: [],
    openedCards: [],
    children: [],
  }

  processRotation = index => {
    const { triedCards, openedCards } = this.state
    const {
      gameOverCard,
      pictures,

      onGameOver,
      onWin,
      onTry,
      onCompareFail,
      onCompareSuccess,
    } = this.props

    onTry()
    if (triedCards.length === 0) {
      this.setState({ triedCards: [index] })
    } else if (triedCards.length === 1) {
      this.setState({ triedCards: [...triedCards, index] })
      setTimeout(() => {
        this.setState({ triedCards: [] })
      }, 1000)
    }

    if (triedCards.length === 1) {
      if (pictures[triedCards[0]] === pictures[index]) {
        const nextOpenedCards = [...openedCards, triedCards[0], index]
        this.setState({ openedCards: nextOpenedCards })

        if (nextOpenedCards.length === 8) onWin()

        onCompareSuccess()
      } else {
        onCompareFail()
      }
    }

    if (index === gameOverCard) onGameOver()
  }

  render() {
    const { pictures } = this.props
    const { triedCards, openedCards } = this.state

    return (
      <section className="field shadow">
        {pictures.map((img, index) => (
          <Card
            key={index}
            picture={img}
            opened={triedCards.includes(index) || openedCards.includes(index)}
            onRotate={() => this.processRotation(index)}
          />
        ))}
      </section>
    )
  }
}

export default Field
