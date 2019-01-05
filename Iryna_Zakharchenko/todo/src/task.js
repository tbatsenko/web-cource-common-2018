class Task {
  constructor(task_text, id, todolist, checked) {
    this.value = task_text
    this.id = id
    if (checked !== undefined) this.checked = checked
    else this.checked = false

    this.todolist = todolist
    this.showed = false
    this.htmlRender()

  }

  htmlRender() {
    if (this.showed) return
    this.container = document.createElement('li')
    this.container.setAttribute('class', 'main-layout__task')
    this._text_container = document.createElement('div')

    this.container.appendChild(this._text_container)
    let _label = document.createElement('label')
    this._text_container.appendChild(_label)
    this._checkbox = document.createElement('input')
    this._checkbox.setAttribute('type', 'checkbox')

    if (this.checked) {
      this._text_container.setAttribute('class', 'main-layout__task-text-check main-layout__task__crossed-out')
      this._checkbox.setAttribute('checked', 'true')
    }
    else this._text_container.setAttribute('class', 'main-layout__task-text-check')


    _label.appendChild(this._checkbox)

    this._html_p = document.createElement('p')
    this._html_p.setAttribute('class', 'main-layout__task-text')
    this._html_text = document.createTextNode(this.value)

    this._html_p.appendChild(this._html_text)

    this._text_container.appendChild(this._html_p)

    this._btn = document.createElement('button')
    this._btn.setAttribute('class', 'main-layout__del-task-btn')

    this.container.appendChild(this._btn)

    let _img = document.createElement('img')
    _img.setAttribute('src', 'img/remove-icon.png')
    _img.setAttribute('class', 'main-layout__del-task-img')

    this._btn.appendChild(_img)

    document.querySelector('.main-layout__task-container').appendChild(this.container)

    this.createEventsListeners()
    this.showed = true
  }

  changeState() {
    this.checked = !this.checked
  }

  showChangedState() {
    if (this.checked) this._text_container.setAttribute('class', 'main-layout__task-text-check main-layout__task__crossed-out')
    else this._text_container.setAttribute('class', 'main-layout__task-text-check')

  }


  createEventsListeners() {
    this._checkbox.addEventListener('click', () => {

      this.changeState()
      this.showChangedState()
    })


    this._btn.addEventListener('click', () => {
      this.kill()
      // this.htmlRender()
    })

  }

  kill() {
    this.todolist.delTask(this)
    this.removeFromDoc()
  }

  removeFromDoc() {
    if (!this.showed) return
    document.querySelector('.main-layout__task-container').removeChild(this.container)
    this.showed = false
  }


}