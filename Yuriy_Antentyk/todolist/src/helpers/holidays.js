import { csvParse } from 'd3'

class HolidaysStore {
  constructor() {
    this._holidays = null
    this._wasFetched = false
    this._subscriptions = []
  }

  subscribe(fn){
    this._subscriptions.push(fn)
  }

  getHolidays(){
    return this._holidays
  }

  async fetchHolidays() {
    if (this._wasFetched) return

    this._wasFetched = true

    const response = await fetch('/holidays.csv')
    const dataText = await response.text()

    this._holidays = csvParse(dataText, ({ day, month, name }) => ({
      date: Number(day),
      month: Number(month) - 1,
      name: name,
    }))

    this._subscriptions.forEach(fn => fn(this._holidays))
    this._subscriptions = []
  }
}

const holidaysStore = new HolidaysStore()
export default holidaysStore
