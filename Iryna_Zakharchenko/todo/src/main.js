let toDo = new ToDo()


document.querySelector('.main-layout__input-container').addEventListener('submit',
  function(e) {
    toDo.add()
    e.preventDefault()
  })