import React, { Component } from 'react'
import './App.scss'
import { csvParse, extent } from 'd3'
import Chart from '../Chart/Chart'

class App extends Component {
  state = {
    data: null,
    activeYear: 0,
    chart_width: 800,
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
      <div className={'main'}>
        <header className={'header'} style={{ width: this.state.chart_width }}>
          <p className={'header__male'}>   MALE</p>
          <p className={'header__year'}>{this.state.activeYear}</p>
          <p className={'header__female'}>FEMALE</p>
        </header>
        <Chart state={this.state} />

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
    })).filter(({ age }) => !isNaN(age))

    this.setState({
      activeYear: 1989,
      data: parsedData,
    })
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     // let stat = [...this.state]
  //     let newYear = this.state.activeYear + 1
  //     if (newYear > 2018) {
  //       newYear = 1989
  //     }
  //     this.setState({ activeYear: newYear })
  //   }, 100)
  // }
}

export default App
