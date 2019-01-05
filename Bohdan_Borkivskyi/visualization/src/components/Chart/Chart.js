import React, { Component } from 'react'
import './Chart.scss'

export default class Chart extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Chart here</h1>
        {this.props.population.map((item, index) => <p key={index}>{String(item)}</p>)}
      </React.Fragment>
    )
  }
}
