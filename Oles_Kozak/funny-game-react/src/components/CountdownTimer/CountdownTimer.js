import React, { Component } from 'react'
import { formatTime } from '../../utils'

class CountdownTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeToExpire: props.seconds,
    }

    const from = new Date()
    setInterval(() => {
      const current = new Date()
      const secondsPassed = Math.round((current - from) / 1000)

      if (secondsPassed < props.seconds) {
        const timeToExpire = props.seconds - secondsPassed
        this.setState({ timeToExpire })
      } else {
        this.setState({ timeToExpire: 0 })
        props.onExpired()
      }
    }, 1000)
  }

  render() {
    const { timeToExpire } = this.state
    return (
      <section className="round-info shadow">
        <h3 className="round-info__title3">TIME:</h3>
        <time className="round-info__num-text">{formatTime(timeToExpire)}</time>
      </section>
    )
  }
}

export default CountdownTimer
