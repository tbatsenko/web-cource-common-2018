class Item {
  constructor(id, value) {
    this.id = id
    this.value = value
    this.checked = false
  }
}


class ToDo {
  constructor() {
    this.todo_array = []
  }


  build_list() {
    document.getElementById('main').innerHTML = ''
    var inner_html = ''
    for (var i = 0; i < this.todo_array.length; i++) {
      inner_html += '<div class="item"><p class="item__text" onclick="todo.check(' + i + ')"'

      if (this.todo_array[i].checked == true) {
        inner_html += ' style="text-decoration: line-through;"'
      }

      inner_html += '>' + this.todo_array[i].value + '</p><button class="cancel_button" onclick="todo.remove(' + i + ')"><img class="cancel_image" src="images/cancel.svg"></button></div>'
    }
    document.getElementById('main').innerHTML = inner_html
  }


  add() {
    var input = document.getElementById('input')
    var new_item = input.value.trim()
    if (new_item !== '') {
      this.todo_array.push(new Item(this.todo_array.length, new_item))
      this.build_list()
    }
    input.value = ''
  }


  remove(i) {
    this.todo_array.splice(i, 1)
    this.build_list()
  }


  check(i) {
    this.todo_array[i].checked = !this.todo_array[i].checked
    this.build_list()
  }


}


var todo = new ToDo()