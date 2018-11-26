class Item{
  constructor(value){
    this.value = value;
    this.checked = false;
  }
}


class ToDo{
  constructor(){
    this.todo_array = [new Item('Buy potato'), new Item('Go to TMVK'), new Item('Verstaty TODO List')]
  }

  add(value){
    var input = document.getElementById("input");
    var new_item = input.value;
    this.todo_array.push(new Item(new_item))
    document.getElementById('main').innerHTML += '<div class="item" tabindex="1">' + new_item + '</div>'
    input.value = "";
  }

  build_list(){

  }

}


var todo = new ToDo()