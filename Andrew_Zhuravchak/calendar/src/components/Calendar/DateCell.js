import React, { Component } from 'react'

import PropTypes from 'prop-types'

import './DateCell.scss'

class DateCell extends Component {
  static propTypes = {
    tasks: PropTypes.array,
    date: PropTypes.object
  }

  computeClasses = () => {
    const { date, tasks } = this.props
    const tasksLength = tasks.length
    let cellClassNames = 'dateCell'

    if(date.getDay() === 0) {
      cellClassNames += ' dateCell--sunday'
    } else if(date.getDay() === 6){
      cellClassNames += ' dateCell--saturday'
    }

    if(tasksLength === 0){
      cellClassNames += ' dateCell--empty'
    } else if(tasksLength < 3){
      cellClassNames += ' dateCell--small'
    } else if(tasksLength < 5){
      cellClassNames += ' dateCell--medium'
    } else {
      cellClassNames += ' dateCell--big'
    }

    return cellClassNames
  }

  render() {
    const { date } = this.props

    return (
      <div className={this.computeClasses()}>{date.getDate()}</div>
    )
  }

}

export default DateCell