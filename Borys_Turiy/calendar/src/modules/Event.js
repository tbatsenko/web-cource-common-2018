class Event {
  constructor(name, start, end, description, status) {
    this.name = name
    this.description = description
    this.status = status
    this.start_date = new Date(start[0], start[1], start[2], start[3], start[4], start[5])
    this.end_date = new Date(end[0], end[1], end[2], end[3], end[4], end[5])
  }
}
export default Event