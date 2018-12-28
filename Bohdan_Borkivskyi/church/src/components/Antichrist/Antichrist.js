import React, { Component } from 'react'
import './Antichrist.css'

export default class Antichrist extends Component {
  render() {
    return (
      <div
        className="Antichrist"
        style={{ left: this.props.x, top: this.props.y }}
        onClick={() => this.props.onClick(this.props.id)}
      />
    )
  }
}
