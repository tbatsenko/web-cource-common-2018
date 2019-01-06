import { compose, withState, withPropsOnChange } from 'recompose'

import holidaysStore from '../../helpers/holidays'

export default compose(
  withState('holiday', 'setHoliday', undefined),
  withPropsOnChange(['date'], ({ date, holiday, setHoliday }) => {
    const holidayUpdaterFunction = holidays => {
      const suitableHoliday = holidays.find(
        currentHoliday =>
          currentHoliday.date === date.getDate() &&
          currentHoliday.month === date.getMonth()
      )
      const suitableHolidayName = suitableHoliday
        ? suitableHoliday.name
        : undefined

      if (suitableHoliday !== holiday) setHoliday(suitableHolidayName)
    }

    if (holidaysStore.getHolidays())
      holidayUpdaterFunction(holidaysStore.getHolidays())
    else {
      holidaysStore.subscribe(holidayUpdaterFunction)
      holidaysStore.fetchHolidays()
    }

    return {}
  })
)
