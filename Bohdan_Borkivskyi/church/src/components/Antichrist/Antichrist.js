import React, { Component } from 'react'
import './Antichrist.css'

export default class Antichrist extends Component {
  getClasses() {
    return 'Antichrist' + (this.props.good ? ' Antichrist_good' : '')
  }

  render() {
    return (
      <div
        className={this.getClasses()}
        style={{ left: this.props.x, top: this.props.y }}
      />
    )
  }
}
