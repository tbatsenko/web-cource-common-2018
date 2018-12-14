import {get, put} from "./rest"

export class TODOList{

  constructor(){

    this.date = ''

  }

  add() {
    let input = document.getElementById('input')
    let new_item = input.value.trim()
    if (new_item !== '') {
      let resp = get("http://localhost:3000/todo_lists/" + this.date)

      let decoded = JSON.parse(resp)
      let items = decoded.items
      items.push(new_item)
      put("http://localhost:3000/todo_lists/"+this.date, JSON.stringify({"id": this.date, "items":items}))

      this.build_list(items)
    }
    input.value = ''
  }

  remove(i){
    let resp = get("http://localhost:3000/todo_lists/" + this.date)

    let decoded = JSON.parse(resp)
    let items = decoded.items

    items.splice(i, 1)
    put("http://localhost:3000/todo_lists/"+this.date, JSON.stringify({"id": this.date, "items":items}))

    this.build_list(items)
  }

  build_list(items) {
    document.getElementById('todo').innerHTML = ''
    let inner_html = ''
    for (let i = 0; i < items.length; i++) {
      inner_html += '<div class="item"><p class="item__text">' + items[i] + '</p><button class="item__button" id = "' + (100 + i) + '">X</button></div>'
    }
    document.getElementById('todo').innerHTML = inner_html
  }


}
