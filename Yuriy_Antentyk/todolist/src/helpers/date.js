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
