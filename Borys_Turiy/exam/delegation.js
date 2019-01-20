let getRandomColor = function() {
  let letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

let colorize = function(e, id) {
  console.log(1111)
  if ((e.target.click_counter < 3 || e.target.click_counter == null) && (document.blocked_counter < 3 || document.blocked_counter == null)) {
    e.target.click_counter = e.target.click_counter == null ? 1 : e.target.click_counter + 1
    if (e.target.click_counter === 3)
      document.blocked_counter = document.blocked_counter == null ? 1 : document.blocked_counter + 1
    if (e.target.click_counter <= 3) {
      e.target.style.color = getRandomColor()
      e.target.innerText = e.target.innerText.replace(/\d+/g, '')
      e.target.innerText += e.target.click_counter
    }
    if (document.blocked_counter===3)
    undelegate(id)

  }
}
let delegateEvent = function(parent, selector, eventName, callBack, id) {
  let easyfunc = (e) => {
    console.log(111)
      if (e.target.matches(selector))
        callBack(e, id)
    }
  parent.addEventListener(eventName, easyfunc)
  return easyfunc
}

let parent = document.body
let EventsHolder = []
let Event = {
}
Event.eventName = 'click'
Event.id = 0
Event.callBack = delegateEvent(parent, '.hello', "click" , colorize, 0)
EventsHolder.push(Event)
let undelegate = function(id){
  parent.removeEventListener(EventsHolder[id].eventName, EventsHolder[id].callBack)
}
let uncolor = function(e) {
  
}