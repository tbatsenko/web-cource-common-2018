import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {

  state = {
    countries: [
      {
        countryName: 'China',
        population: 1415045928,
      },
      {
        countryName: 'India',
        population: 1354051854,
      },
      {
        countryName: 'USA',
        population: 326766748,
      },
      {
        countryName: 'Indonesia',
        population: 266794980,
      },
      {
        countryName: 'Brazil',
        population: 210867954,
      },
    ],
  }

  render() {
    return (
      <div>
        <Graph countries={this.state.countries}/>
      </div>
    )
  }
}

export default App


class Graph extends Component {
  state = {}

  renderLines() {
    return Array(10).fill(null).map((el, i) => (<Line left={i * 10} key={i}/>))
  }

  renderBars() {
    const { countries } = this.props

    let maxNumOfPeople = 0
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].population > maxNumOfPeople) {
        maxNumOfPeople = countries[i].population
      }
    }

    return countries.map((country) => {
      const percent = (country.population / maxNumOfPeople) * 100
      return (<Bar percent={percent} key={country.countryName}/>)
    })
  }

  render() {
    return (
      <div className="graph-wrapper">
        <div className="graph">
          <BarTextContent countries={this.props.countries}/>

          <div className="bar-lines-container">
            {this.renderLines()}
            {this.renderBars()}
          </div>
        </div>
      </div>
    )
  }
}

const BarTextContent = ({ countries }) => {
  return (
    <div className="bar-text-content">
      {
        countries.map((country) => (
          <div className='text'>
            {country.countryName}
          </div>
        ))
      }

    </div>
  )
}

const Line = ({ left }) => {
  return (
    <div
      className="line"
      style={{ left: `${left}%` }}
    />
  )
}

const Bar = ({ percent }) => {
  return (
    <div className="bar" style={{ width: `${percent}%` }}/>
  )
}