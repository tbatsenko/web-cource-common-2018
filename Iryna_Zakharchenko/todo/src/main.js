let toDo = new ToDo()


document.querySelector('.main-layout__input-container').addEventListener('submit',
  function(e) {
    toDo.add()
    e.preventDefault()
  })


document.querySelector('.main-layout__filter-all').addEventListener("click",
  function(e) {
    toDo.showAllTasks()
    e.preventDefault()
  })


document.querySelector('.main-layout__filter-open-to-do').addEventListener("click",
  function(e) {
    toDo.showOpenTasks()
    e.preventDefault()
  });


document.querySelector('.main-layout__filter-done').addEventListener("click",
  function(e) {
    toDo.showClosedTasks()
    e.preventDefault()
  });