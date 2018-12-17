import { addDays, endOfMonth, getDate, startOfMonth } from 'date-fns'

export const getCalendarDays = date => {
  let start = startOfMonth(date)
  const end = endOfMonth(date)

  const leadingZeros = start.getDay() !== 0 ? start.getDay() - 1 : 6
  return [
    ...Array(leadingZeros).fill(undefined),
    ...Array(getDate(end))
      .fill(start)
      .map((date, i) => addDays(date, i)),
  ]
}
