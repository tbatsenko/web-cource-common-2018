async function newItem() {
  let todo_block = document.getElementsByClassName('todo-list')[0]
  let index_of_new_toto_item = parseInt(todo_block.getAttribute('data-elements-counter')) + 1
  let item = document.getElementById('input').value

  let selected_date = document.getElementsByClassName(
    'calendar__date--selected',
  )[0]
  if (selected_date === undefined) {
    selected_date = document.getElementsByClassName(
      'calendar__date--today',
    )[0]
  }
  let date = new Date(selected_date.getAttribute('data-calendar-date'))

  let date_id = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`


  if (item.length !== 0) {
    let ul = document.getElementById('todo-list__list')
    console.log('Length of ul = ', ul.length)
    let li = document.createElement('li')
    li.className = 'todo-list__item'
    let input_checkbox = document.createElement('input')
    input_checkbox.className = 'todo-list__task-checkbox'
    input_checkbox.type = 'checkbox'
    input_checkbox.onclick = async function() {
      if (input_checkbox.checked === true) {
        console.log('Deleting')
        console.log(await putNewTodoItem(date_id, '', 'delete', index_of_new_toto_item))
        await itemsFromDB(date)
      }
    }
    li.appendChild(input_checkbox)
    let task = document.createElement('span')
    task.innerText = item
    task.className = 'todo-list__task'
    li.appendChild(task)
    ul.appendChild(li)
    document.getElementById('input').value = ''
    // li.ondblclick = removeItem;


    let todo_from_db = await getTodo(date_id)

    console.log('Starting adding, after GET')
    console.log(todo_from_db)

    if (todo_from_db === 404) {
      console.log(await postNewTodoItem(date_id, item))
    } else {
      console.log(await putNewTodoItem(date_id, item, 'add', -1))
    }
  }

  todo_block.setAttribute('data-elements-counter', (index_of_new_toto_item).toString())
}

async function itemsFromDB(date) {
  let todo_block = document.getElementsByClassName('todo-list')[0]

  let todo_from_db = await getTodo(date)

  console.log('Render items from db')
  console.log(todo_from_db)

  if (todo_from_db === 404) {
    console.log(await postNewTodoItem(date, item))
  } else {
    let ul = document.getElementById('todo-list__list')
    ul.innerHTML = ''
    // console.log("Length of ul = ", ul.length);
    for (let i = 0; i < todo_from_db.body.length; i++) {
      let li = document.createElement('li')
      li.className = 'todo-list__item'
      let input_checkbox = document.createElement('input')
      input_checkbox.className = 'todo-list__task-checkbox'
      input_checkbox.type = 'checkbox'
      input_checkbox.onclick = async function() {
        if (input_checkbox.checked === true) {
          console.log('Deleting')
          console.log(await putNewTodoItem(date, '', 'delete', i))
          await itemsFromDB(date)
        }
      }
      li.appendChild(input_checkbox)
      let task = document.createElement('span')
      task.innerText = todo_from_db.body[i]
      task.className = 'todo-list__task'
      li.appendChild(task)
      ul.appendChild(li)
    }
    todo_block.setAttribute('data-elements-counter', todo_from_db.body.length.toString())
  }
}


document.getElementById('input').onkeyup = async function(e) {
  if (e.code === 'Enter') {
    await newItem()
  }
}

setTimeout(async function() {

  let selected_date = document.getElementsByClassName(
    'calendar__date--selected',
  )[0]

  if (selected_date === undefined) {
    selected_date = document.getElementsByClassName(
      'calendar__date--today',
    )[0]
  }
  let date = new Date(selected_date.getAttribute('data-calendar-date'))

  let date_id = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`


  await itemsFromDB(date_id)
}, 50)

function removeItem(e) {
  e.target.parentElement.removeChild(e.target)
}

postNewTodoItem = async (id, body) => {
  const todo_item = {
    id: `${id}`,
    body: [`${body}`],
  }
  const location = window.location.hostname
  const settings = {
    method: 'POST',
    body: JSON.stringify(todo_item),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  return await fetch(`http://${location}:3000/to-do/`, settings)
    .then(response => response.json())
    .then(json => {
      return json
    })
    .catch(e => {
      return e
    })
}

putNewTodoItem = async (id, body, action, element_index) => {
  let curTodo = await getTodo(`${id}`)
  console.log('in PUT')
  if (curTodo === 404) {
    console.log('There is no such todo item with' + `${id}`)
    return null
  }

  console.log(curTodo)
  let curTodoList = curTodo.body
  console.log(curTodoList)
  if (action === 'add') {
    curTodoList.push(`${body}`)
  } else if (action === 'delete') {
    curTodoList.splice(element_index, 1)
    console.log(curTodoList)
  }

  const todo_item = {
    id: `${id}`,
    body: curTodoList,
  }
  const location = window.location.hostname
  const settings = {
    method: 'PUT',
    body: JSON.stringify(todo_item),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  return await fetch(`http://${location}:3000/to-do/${id}`, settings)
    .then(response => response.json())
    .then(json => {
      return json
    })
    .catch(e => {
      return e
    })
}

getTodo = async id => {
  const location = window.location.hostname
  const settings = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  const data = await fetch(`http://${location}:3000/to-do/${id}`, settings)
    .then(function(response) {
      if (response.status === 200) {
        return response.json()
      } else {
        return 404
      }
    })
    .then(json => {
      return json
    })
    .catch(e => {
      return e
    })

  return data
}

