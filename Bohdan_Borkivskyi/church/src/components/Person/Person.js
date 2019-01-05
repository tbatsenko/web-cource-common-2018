import React, { Component } from 'react'
import './Person.css'

export default class Person extends Component {
  getClasses() {
    return (
      'Person' +
      (!this.props.personality.isAnti && this.props.personality.isPop
        ? ' Person_pop'
        : '') +
      (this.props.personality.isAnti ? ' Person_anti' : '') +
      (this.props.personality.isAnti && this.props.personality.isGoodAnti
        ? ' Person_anti-good'
        : '')
    )
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
