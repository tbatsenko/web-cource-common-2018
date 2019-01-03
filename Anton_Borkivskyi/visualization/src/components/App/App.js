import React, { Component } from 'react'
import './App.css'
import { csvParse, extent } from 'd3'
import Graph from '../Chart/Chart'

class App extends Component {

  state = {
    countries: [
      {
        countryName: '80+',
        population: 18,
      },
      {
        countryName: '60-80',
        population: 21,
      },
      {
        countryName: '40-60',
        population: 24,
      },
      {
        countryName: '20-40',
        population: 27,
      },
      {
        countryName: '0-20',
        population: 30,
      },
    ],
    men: null,
    women: null,
    activeYear: 0,
  }

  constructor(props) {
    super(props)
    this.getData()
  }

  getData = async () => {
    const response = await fetch('data.csv')
    const dataText = await response.text()

    const parsedData = csvParse(dataText, (row) => {
      let newRow = Object.assign({}, row)
      Object.keys(newRow).forEach((key) => newRow[key] = Number(newRow[key]))
      return newRow
    })

    const men = parsedData.filter((row) => row['Sex'] === 1)
    const women = parsedData.filter((row) => row['Sex'] === 2)

    this.setState({
      men: men,
      women: women,
      activeYear: 2017,
    })

  }

  render() {
    if (this.state.activeYear === 0) {
      return null
    }

    return (
      <div className={'main'}>
        <Graph state={this.state}/>

        <input
          type="range"
          min={2010}
          max={2017}
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
}

export default App


