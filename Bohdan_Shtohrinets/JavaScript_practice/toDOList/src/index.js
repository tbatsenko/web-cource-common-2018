import ToDoList from './todo'

let todo = new ToDoList()

todo.render()

document.getElementById('add').addEventListener('click', function() {
  let value = document.getElementById('item').value
  if (value)
    todo.addItem(value)
})

document.getElementById('item').addEventListener('keydown', function(e) {
  let value = this.value
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value)
    todo.addItem(value)
})
