import React, { Component } from 'react'
import './Cristian.css'

export default class Cristian extends Component {
  getClasses(){
    return "Cristian"+(this.props.id === 0 ? " Cristian_pop": "")
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
