import React, { Component } from 'react'

import Chart from '../Chart'

import './App.scss'
import { csvParse, extent } from 'd3'

class App extends Component {
  state = {
    data: null,
    activeYear: 1995,
    staticYear: 1989,
  }
  constructor(props) {
    super(props)
    this.getData()
  }

  getData = async () => {
    const response = await fetch('/population_by_age_sex_year.csv')
    const dataText = await response.text()
    const data = csvParse(dataText, ({ year, age, men, women }) => ({
      year: Number(year),
      age: Number(age),
      men: Number(men),
      women: Number(women),
    })).filter(({ age }) => !isNaN(age))

    this.setState({
      data,
      countDomain: extent([
        ...data.map(({ men }) => men),
        ...data.map(({ women }) => women),
      ]),
    })
  }

  render() {
    if (!this.state.data) return <div className="App"> 'Loading...'</div>
    const { activeYear, staticYear, countDomain } = this.state

    const data = this.state.data.filter(
      ({ year }) => year === this.state.activeYear
    )

    const staticData = this.state.data.filter(({ year }) => year === staticYear)

    return (
      <div className="App">
        <Chart countDomain={countDomain} data={data} staticData={staticData} />{' '}
        <input
          type="range"
          min={1989}
          max={2018}
          step={1}
          value={activeYear}
          onChange={({ target }) =>
            this.setState({ activeYear: Number(target.value) })
          }
        />
      </div>
    )
  }
}

export default App
