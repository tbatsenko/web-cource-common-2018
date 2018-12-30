import { csvParse } from 'd3'
import axios from "axios"

class HolidaysStore {
  constructor() {
    this._holidays = null
    this._pending = false
    this._subscriptions = []
  }

  subscribe(fn){
    this._subscriptions.push(fn)
  }

  getHolidays(){
    return this._holidays
  }

  async fetchHolidays() {
    if (this._pending || this._holidays) return

    this._pending = true

    const response = await axios.get("/holidays.csv")
    const dataText = response.data

    this._holidays = csvParse(dataText, ({ day, month, name }) => ({
      date: Number(day),
      month: Number(month) - 1,
      name: name,
    }))

    this._subscriptions.forEach(fn => fn(this._holidays))
    this._subscriptions = []

    this._pending = false
  }
}

const holidaysStore = new HolidaysStore()
export default holidaysStore
