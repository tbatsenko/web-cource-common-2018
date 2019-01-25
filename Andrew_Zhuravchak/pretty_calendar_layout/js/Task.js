export default class Task {
  constructor(text, isNotification, isEmpty, type, date) {
    this.id = (new Date()).getTime()
    this.text = text
    this.isNotification = isNotification
    this.isEmpty = isEmpty
    this.type = type
    this.date = date
  }
}