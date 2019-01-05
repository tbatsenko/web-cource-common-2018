export default class Task {
  constructor(text, isNotification, isEmpty, type, date) {
    this.text = text
    this.isNotification = isNotification
    this.isEmpty = isEmpty
    this.type = type
    this.date = date
  }
}