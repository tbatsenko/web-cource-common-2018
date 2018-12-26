import { compose } from 'ramda'

export const hashDate = date =>
  date.getDate() + date.getMonth() * 100 + date.getFullYear() * 10000

const isValidDate = date => date instanceof Date && !isNaN(date)
export const retrieveDateFromUrlString = compose(
  notValidatedDate =>
    isValidDate(notValidatedDate) ? notValidatedDate : new Date(),
  urlStringRepresentation => new Date(urlStringRepresentation),
  url => url.pathname.substring(1),
  urlString => new URL(urlString)
)

export const getDaysInMonth = date =>
  32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate()
export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const weekDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const getMonthName = date => monthNames[date.getMonth()]

export const getWeekDayIndex = date => (date.getDay() + 6) % 7
export const getWeekDayName = date => weekDayNames[getWeekDayIndex(date)]

export const isWeekEnd = (date) => getWeekDayIndex(date) >= 5

export const getOrdinalIndicator = number =>
  number <= 3 ? ['st', 'nd', 'rd'][number - 1] : 'th'
export const makeOrdinal = number => number + getOrdinalIndicator(number)
