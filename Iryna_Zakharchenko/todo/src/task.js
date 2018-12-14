class Task {
  constructor(task_text, id, todolist, checked) {
    this.value = task_text
    this.id = id
    if(checked !== undefined) this.checked = checked
    else this.checked = false
    this.todolist = todolist
    this.htmlRender()
    this.createEventsListeners()
  }

  htmlRender() {
    this.container = document.createElement('li')
    this.container.setAttribute('class', 'main-layout__task')
    this._text_container = document.createElement('div')

    if (this.checked) this._text_container.setAttribute('class', 'main-layout__task-text-check main-layout__task__crossed-out')
    else this._text_container.setAttribute('class', 'main-layout__task-text-check')

    this.container.appendChild(this._text_container)
    let _label = document.createElement('label')
    this._text_container.appendChild(_label)
    this._checkbox = document.createElement('input')
    this._checkbox.setAttribute('type', 'checkbox')

    _label.appendChild(this._checkbox)

    this._html_text = document.createTextNode(this.value)

    this._text_container.appendChild(this._html_text)

    this._btn = document.createElement('button')
    this._btn.setAttribute('class', 'main-layout__del-task-btn')

    this.container.appendChild(this._btn)

    let _img = document.createElement('img')
    _img.setAttribute('src', 'img/remove-icon.png')
    _img.setAttribute('class', 'main-layout__del-task-img')

    this._btn.appendChild(_img)

    document.querySelector('.main-layout__task-container').appendChild(this.container)

  }

  changeState() {
    this.checked = !this.checked
  }

  showChangedState(){
    if (this.checked) this._text_container.setAttribute('class', 'main-layout__task-text-check main-layout__task__crossed-out')
    else this._text_container.setAttribute('class', 'main-layout__task-text-check')

  }


  createEventsListeners() {
    this._checkbox.addEventListener('click', () => {

      this.changeState()
      this.showChangedState()
    })


    this._btn.addEventListener('click', ()=>{
      this.kill()
      // this.htmlRender()
    })

  }

  kill(){
    this.todolist.delTask(this)
    document.querySelector('.main-layout__task-container').removeChild(this.container)
  }


}