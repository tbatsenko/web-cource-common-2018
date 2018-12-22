import PubSub from './PubSub'

class ListItem {
  render() {
    const { checked, text } = this.data
    this.container.innerHTML = `
      <button class="checkBox">${checked ? '+' : '-'}</button>
      ${text}
      <button class="remove">Remove</button> 
    `

    this.container.querySelector('.remove').addEventListener('click', ev => {
      ev.preventDefault()
      this.pubSub.publish(this, 'REMOVE')
    })

    this.container.querySelector('.checkBox').addEventListener('click', ev => {
      ev.preventDefault()
      this.pubSub.publish(this, 'CHECK')
    })
  }

  onRemove(callbackFn) {
    return this.pubSub.subscribe(callbackFn, 'REMOVE')
  }

  onCheck(callbackFn) {
    return this.pubSub.subscribe(callbackFn, 'CHECK')
  }

  onEdit(callbackFn) {
    return this.pubSub.subscribe(callbackFn, 'EDIT')
  }

  remove() {
    this.container.remove()
  }

  check(isChecked) {
    this.data.checked = isChecked
    this.container.querySelector('.checkBox').innerHTML = isChecked ? '+' : '-'
  }

  constructor(text, checked = false) {
    this.pubSub = new PubSub()
    this.data = { text, checked }
    this.container = document.createElement('form')

    this.render()
  }
}

export default ListItem
