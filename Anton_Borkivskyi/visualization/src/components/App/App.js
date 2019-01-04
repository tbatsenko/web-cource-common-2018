import React, { Component } from 'react'
import './App.css'
import { csvParse, extent } from 'd3'
import Chart from '../Chart/Chart'

class App extends Component {

  state = {
    data: null,
    activeYear: 0,
  }

  constructor(props) {
    super(props)
    this.getData()
  }

  render() {
    if (this.state.activeYear === 0) {
      return <div>No data yet.</div>
    }
    return (
      <div>
        <Chart state={this.state}/>

        <input
          type="range"
          min={1989}
          max={2018}
          step={1}
          value={this.state.activeYear}
          onChange={({ target }) =>
            this.setState({ activeYear: Number(target.value) })
          }
        />

        <p>{this.state.activeYear}</p>
      </div>
    )
  }

  getData = async () => {
    const response = await fetch('population_by_age_sex_year.csv')
    const raw_data = await response.text()

    const parsedData = csvParse(raw_data, ({ year, age, men, women }) => ({
      year: Number(year),
      age: Number(age),
      men: Number(men),
      women: Number(women),
    }))


    this.setState({
      activeYear: 1989,
      data: parsedData,
    })


  }

}

export default App


