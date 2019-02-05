import React, { Component } from 'react'

import { withScreenSize } from '@vx/responsive'

import FormatPrice from '../../helpers/FormatPrice'
import Chart from '../Chart/Chart'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
  }

  componentDidMount() {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-08-30&end=2019-01-30')
      .then(res => {
        return res.json()
      })
      .then(json => {
        this.setState({
          data: json,
        })
      })
  }

  render() {
    const { data } = this.state
    const { screenWidth, screenHeight } = this.props

    if (!data.bpi) return <div>Data is loading...</div>

    const prices = Object.keys(data.bpi).map(date => {
      return {
        time: date,
        price: data.bpi[date],
      }
    })

    const currentPrice = prices[prices.length - 1].price
    const firstPrice = prices[0].price
    const differencePrice = currentPrice - firstPrice
    const hasIncreased = differencePrice > 0

    return (
      <div className='App'>
        <div className='App__Top-Bar'>
          <div className='App__Title'>
            <div>BitCoin Price Chart</div>
            <div>
              <small>last 4 months</small>
            </div>
          </div>
          <div className='App__Prices'>
            <div>{FormatPrice(currentPrice)}</div>
            <div className={hasIncreased ? 'Price__Increased' : 'Price__Decreased'}>
              <small>
                {hasIncreased ? '+' : ''}
                {FormatPrice(differencePrice)}
              </small>
            </div>
          </div>
        </div>
        <Chart data={prices} width={screenWidth} height={screenHeight}/>
      </div>
    )
  }
}

export default withScreenSize(App)