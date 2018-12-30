import { pure, compose } from 'recompose'

import onChangeDateEnhancer from "../../../helpers/js/HOC/onChangeDateEnhancer"
import holidaysEnhancer from "../../../helpers/js/HOC/holidaysEnhancer"

import Day from './Day'

const enhancer = compose(
  pure,
  holidaysEnhancer,
  onChangeDateEnhancer
)

export default enhancer(Day)
