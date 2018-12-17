import Calendar from './Calendar'
import List from './List'
import Database from './Database'


const calendarContainer = document.getElementById("calendar");
const calendar = new Calendar(calendarContainer);

const listContainer = document.getElementById("list");
const db = new Database("http://localhost:3000/todo");
const list = new List(listContainer, db, calendar);
calendar.list = list;



