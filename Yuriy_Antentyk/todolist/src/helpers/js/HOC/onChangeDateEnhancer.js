import { withHandlers } from 'recompose'

export default withHandlers({
  onChangeDate: ({ date, onChangeDate }) => ev => {
    ev.preventDefault()
    onChangeDate(date)
  },
})
