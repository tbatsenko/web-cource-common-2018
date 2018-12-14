import React, { Component } from 'react'
import './Calendar.scss'

export class Calendar extends Component {
  render() {
    return (
      <div className="Calendar">
        <div className="Calendar__title">December 2018</div>
        <div className="Calendar__header">MO, TU, TH, ...</div>
        <div className="Calendar__days">table with days here</div>
      </div>
    )
  }
}