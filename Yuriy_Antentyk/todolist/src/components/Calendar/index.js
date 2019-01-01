import { compose, pure, withState, withProps } from 'recompose'

import Calendar from './Calendar'

import { changeMonth } from '../../helpers/js/date'

const enhancer = compose(
  pure,
  withState(
    'calendarDate',
    'setCalendarDate',
    ({ calendarDate }) => calendarDate
  ),
  withProps(({ calendarDate, setCalendarDate }) => ({
    onIncrementMonth: () => setCalendarDate(changeMonth(calendarDate, 1)),
    onDecrementMonth: () => setCalendarDate(changeMonth(calendarDate, -1)),
  }))
)

export default enhancer(Calendar)
