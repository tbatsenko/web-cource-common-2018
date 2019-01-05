import { addDays, endOfMonth, getDate, startOfMonth } from 'date-fns'
import * as math from 'mathjs'

export const getCalendarDays = date => {
  let start = startOfMonth(date)
  const end = endOfMonth(date)

  const leadingZeros = start.getDay() !== 0 ? start.getDay() - 1 : 6
  console.log(start, end, leadingZeros)

  let calendarDays = [
    ...Array(leadingZeros).fill(undefined),
    ...Array(getDate(end))
      .fill(start)
      .map((date, i) => addDays(date, i)),
  ]

  const endingZeros = (7 - (calendarDays.length % 7)) % 7
  calendarDays = [
    ...calendarDays,
    ...Array(endingZeros).fill(undefined),
  ]

  return math.reshape(calendarDays, [calendarDays.length / 7, 7])

}

export const calendarDaysList = ['mo', 'tu', 'wd', 'th', 'fr', 'sa', 'su']