import { csvParse } from 'd3'

class State {
  constructor() {
    this.subscriptions = []
    this.state = null
    this.pending = false
  }

  getHolidays() {
    return this.state
  }

  isPending() {
    return this.pending
  }

  async fetchHolidays() {
    this.pending = true
    const response = await fetch('/holidays.csv')
    const dataText = await response.text()

    this.state = csvParse(dataText, ({ day, month, name }) => ({
      date: Number(day),
      month: Number(month) - 1,
      name: name,
    }))

    this.pending = false
    this.subscriptions.forEach(fn => fn(this.state))

    return this.state
  }

  subscribe(fn) {
    this.subscriptions.push(fn)
  }
}

const holidays = new State()
export default holidays
