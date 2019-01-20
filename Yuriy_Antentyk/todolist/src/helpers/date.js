import { compose, range } from 'ramda'
import { isValid, addDays, startOfWeek, format } from 'date-fns'

export const hashDate = date =>
  date.getDate() + date.getMonth() * 100 + date.getFullYear() * 10000

export const retrieveDateFromUrlString = compose(
  notValidatedDate =>
    isValid(notValidatedDate) ? notValidatedDate : new Date(),
  urlStringRepresentation => new Date(urlStringRepresentation),
  url => url.pathname.substring(1),
  urlString => new URL(urlString)
)

export const weekDaysNames = range(0, 7)
  .map(delta => addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), delta))
  .map(date => format(date, 'ddd'))
