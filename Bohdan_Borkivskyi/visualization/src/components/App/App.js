import React, { Component } from 'react'
import './App.scss'
import Chart from '../Chart/Chart'
import { csvParse } from 'd3'

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

  getData = async () => {
    let fetched = await fetch('/data.csv')
    let row_data = await fetched.text()
    let parsed = csvParse(row_data, ({ year, age, men, women }) => ({
      year: Number(year),
      age: Number(age),
      men: Number(men),
      women: Number(women),
    }))
    let filtered = parsed.filter(({ age }) => !isNaN(age))

    this.setState({data: filtered})
  }
}
