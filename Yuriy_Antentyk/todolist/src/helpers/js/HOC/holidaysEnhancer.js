import { compose, withState, withProps } from 'recompose'

import holidaysStore from '../holidays'

export default compose(
  withState('holidays', 'setHolidays', holidaysStore.getHolidays()),
  withProps(({ date, holidays, setHolidays }) => {
    let holidayRepresentation = null

    if (!holidays) {
      holidaysStore.subscribe(setHolidays)
      holidaysStore.fetchHolidays()

      return { holiday: null }
    }

    holidayRepresentation = holidays.find(
      holiday =>
        holiday.date === date.getDate() && holiday.month === date.getMonth()
    )

    return {
      holiday: holidayRepresentation ? holidayRepresentation.name : null,
    }
  })
)
