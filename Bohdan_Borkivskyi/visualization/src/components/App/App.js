import React, { Component } from 'react'
import './App.scss'
import Chart from '../Chart/Chart'
import { csvParse, sum } from 'd3'

export default class App extends Component {
  state = {
    data: null,
    currentYear: 1990,
  }

  constructor() {
    super()
    this.getData()
  }

  render() {
    return <Chart />
  }

  getYearsData(numberOfYears) {
    if (
      numberOfYears <= 0 ||
      isNaN(numberOfYears) ||
      this.state.data === null
    ) {
      return []
    }

    if (numberOfYears > this.state.length) {
      numberOfYears = this.state.length
    }

    if (numberOfYears % 2 === 0) {
      numberOfYears -= 1
    }

    let epsilon = Math.floor(numberOfYears / 2)

    let years = []
    for (
      let i = this.state.currentYear - epsilon;
      i <= this.state.currentYear + epsilon;
      ++i
    ) {
      let yearData = this.state.data.filter(({ year }) => year === i)
      let firstPopulation = sum(
        yearData
          .filter(({ age }) => 0 <= age && age <= 19)
          .map(({ population }) => population)
      )
      let secondPopulation = sum(
        yearData
          .filter(({ age }) => 20 <= age && age <= 39)
          .map(({ population }) => population)
      )
      let thirdPopulation = sum(
        yearData
          .filter(({ age }) => 40 <= age && age <= 59)
          .map(({ population }) => population)
      )
      let fourthPopulation = sum(
        yearData
          .filter(({ age }) => 60 <= age && age <= 79)
          .map(({ population }) => population)
      )
      let totalPopulation =
        firstPopulation + secondPopulation + thirdPopulation + fourthPopulation

      years.push([
        Math.round((firstPopulation * 1000) / totalPopulation),
        Math.round((secondPopulation * 1000) / totalPopulation),
        Math.round((thirdPopulation * 1000) / totalPopulation),
        Math.round((fourthPopulation * 1000) / totalPopulation),
      ])
    }
    return years
  }

  getData = async () => {
    let fetched = await fetch('/data.csv')
    let row_data = await fetched.text()
    let parsed = csvParse(row_data, ({ year, age, men, women }) => ({
      year: Number(year),
      age: Number(age),
      population: Number(men) + Number(women),
    }))
    let filtered = parsed.filter(({ age }) => !isNaN(age))

    this.setState({ data: filtered })
  }
}
