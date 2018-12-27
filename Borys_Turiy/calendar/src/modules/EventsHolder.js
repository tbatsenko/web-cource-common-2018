class EventsHolder {
  constructor(event) {
    this.events = []
    if (event !== undefined && event.instanceOf(Event))
      this.addEvent(event)
  }

  addEvent(start, end, description) {
    this.events.push(new Event(name, start, end, description))
  }

  getEvents(day) {
    let events = []
    for (let event in this.events) {
      if (event.start_date < day && day < event.end_date) {
        events.push(event)
      }
    }
    return events
  }
}
export default EventsHolder