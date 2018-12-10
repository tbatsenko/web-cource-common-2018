// export default class TODOList{
//   constructor(){
//
//     this.date = ''
//
//   }
//
//   get(url){
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "GET", url, false ); // false for synchronous request
//     xmlHttp.send( null );
//     return xmlHttp.responseText;
//   }
//
//   post(url, req){
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "POST", url, false ); // false for synchronous request
//     xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//     xmlHttp.send(req);
//     return xmlHttp.responseText;
//   }
//
//
//   put(url, req){
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.open( "PUT", url, false ); // false for synchronous request
//     xmlHttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//     xmlHttp.send(req);
//     return xmlHttp.responseText;
//   }
//
//
//   add() {
//     var input = document.getElementById('input')
//     var new_item = input.value.trim()
//     if (new_item !== '') {
//       var resp = todo.get("http://localhost:3000/todo_lists/" + this.date)
//
//       var decoded = JSON.parse(resp)
//       var items = decoded.items
//       items.push(new_item)
//       var resp_put = todo.put("http://localhost:3000/todo_lists/"+this.date, JSON.stringify({"id": this.date, "items":items}))
//
//       this.build_list(items)
//     }
//     input.value = ''
//   }
//
//   remove(i){
//     var resp = todo.get("http://localhost:3000/todo_lists/" + this.date)
//
//     var decoded = JSON.parse(resp)
//     var items = decoded.items
//
//     items.splice(i, 1)
//     var resp_put = todo.put("http://localhost:3000/todo_lists/"+this.date, JSON.stringify({"id": this.date, "items":items}))
//
//     this.build_list(items)
//   }
//
//   build_list(items) {
//     document.getElementById('todo').innerHTML = ''
//     var inner_html = ''
//     for (var i = 0; i < items.length; i++) {
//       inner_html += '<div class="item"><p class="item__text">' + items[i] + '</p><button class="cancel_button" onclick="todo.remove(' + i + ')">X</button></div>'
//     }
//     document.getElementById('todo').innerHTML = inner_html
//   }
//
//
// }
