class Item {
  constructor(id, value) {
    this.id = id
    this.value = value
    this.checked = false
  }
}


class ToDo {
  constructor() {
    this.todo_array = [new Item(0, 'Buy potato2'), new Item(1, 'Go to TMVK'), new Item(2, 'Verstaty TODO List')]
  }


  build_list() {
    document.getElementById('main').innerHTML = ''
    for (var i = 0; i < this.todo_array.length; i++) {
      document.getElementById('main').innerHTML += '<div class="item"><p class="item__text">' + this.todo_array[i].value + '</p><button class="cancel_button" onclick="todo.remove('+ i +')"><img class="cancel_image" src="images/cancel.svg"></button></div>'
    }
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

  remove(i){
    this.todo_array.splice(i, 1)
    this.build_list()
  }

  check(){

  }



}


var todo = new ToDo()