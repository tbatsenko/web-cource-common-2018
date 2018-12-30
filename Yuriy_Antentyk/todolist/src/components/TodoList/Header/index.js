import { pure, compose } from 'recompose'

import holidaysEnhancer from '../../../helpers/js/HOC/holidaysEnhancer'
import onChangeDateEnhancer from '../../../helpers/js/HOC/onChangeDateEnhancer'
import Header from './Header'

const enhancer = compose(
  pure,
  holidaysEnhancer,
  onChangeDateEnhancer
)

export default enhancer(Header)
