class ToDo {
  constructor() {
    this.task_list = []

    // if (localStorage.getItem('todo') !== undefined || localStorage.getItem('todo') !== "undefined") {
    //   this.task_list = JSON.parse(localStorage.getItem('todo'))
    //   for (let i = 0; i < this.len(); i++) {
    //     this.task_list[i] = new Task(this.task_list[i].value, this.task_list[i].id, this, this.task_list[i].checked)
    //   }
    //
    // }

  }

  add(task = '') {

    if (task.length < 1) {
      task = ToDo.getTextFromInput()
      if (task.length < 1) return
    }
    let temp_id = this.generateId()
    this.task_list.push(new Task(task, temp_id, this))
    ToDo.cleanInput()
    // localStorage.setItem('todo', JSON.stringify(this.task_list, getCircularReplacer))

  }

  static cleanInput(){
    document.getElementById('main-layout__input').value = ''
  }

  generateId() {

    let ra = Math.ceil(Math.random() * this.len() * 9 + Math.random() * 100)
    while (ra in this.task_list) {
      ra += Math.ceil(Math.random() * this.len() * 9 + Math.random() * 100)
    }
    return ra
  }

  len() {
    return this.task_list.length

  }

  static getTextFromInput() {
    return document.getElementById('main-layout__input').value
  }


  show(st = 0) {
    for (let i = st; i < this.len(); i++) this.task_list[i].htmlRender()
  }


  delTask(elem) {
    let index = this.task_list.indexOf(elem)
    if (index > -1) {
      this.task_list.splice(index, 1)
    }

  }

  showAllTasks(){
    for (let i = 0; i < this.len(); i++) this.task_list[i].htmlRender()
  }

  showOpenTasks(){
    for (let i = 0; i < this.len(); i++) {
      if ( this.task_list[i].checked) {
        this.task_list[i].removeFromDoc()
      }
      else{
        this.task_list[i].htmlRender()
      }
    }
  }

  showClosedTasks(){
    for (let i = 0; i < this.len(); i++) {
      if ( this.task_list[i].checked) {
        this.task_list[i].htmlRender()
      }
      else{
        this.task_list[i].removeFromDoc()
      }
    }
  }


}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};