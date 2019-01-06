import React, { Component } from 'react'
import TodoList from './TodoList'

class TodoWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      items: [],
    }
    this.allTasks ={ items: []}
  }

  onChangeInput = (event) => {
    this.setState({ term: event.target.value })
    // this.setState({ term: { value: event.target.value, id: Date.now(), checked: false, showed: false } })
  }

  addTask = (event) => {
    event.preventDefault()
    let id = Date.now()
    if (this.state.term.length > 0) {
      this.setState({
        term: '',
        // items: [...this.state.items, this.state.term],
        items: [...this.state.items, { value: this.state.term, id: id, checked: false }],

      })
    }
    this.allTasks.items = [...this.state.items, { value: this.state.term, id: id, checked: false }]
  }

  onChangeCheckedState = ({ id, checked }) => {
    const { items } = this.state

    items.forEach(item => {
      if (item.id === id)
        item.checked = checked
    })

    this.setState({
      term: '',
      items: items,
    })
  }

  onDeleteTask = ({ id }) => {
    let withoutDel = this.state.items.filter(it => it.id !== id)
    this.setState({
      term: '',
      items: withoutDel,
    })
    this.allTasks.items = this.allTasks.items.filter(it => it.id !== id)
  }

  showAllTasks() {

    // console.log(items)
    this.setState({
      term: '',
      items: this.allTasks.items
    })
  }

  showOpenTasks(){

    this.setState({
      term: '',
      items: this.allTasks.items.filter(item => !item.checked)});
  }

  showClosedTasks(){
    this.setState({
      term: '',
      items: this.allTasks.items.filter(item => item.checked)});
  }


  render() {
    return (
      <React.Fragment>

        <div className="main-layout__top-container">

          <form className="main-layout__input-container" placeholder="Task" onSubmit={this.addTask}>
            <label>
              <input className="main-layout__input"
                     placeholder="Task"
                     value={this.state.term}
                     onChange={this.onChangeInput}
              />
            </label>

            <button className="main-layout__submit" type="submit">Add</button>
          </form>

          <div className="main-layout__filters-container">
            <button className="main-layout__filter-all" onClick={()=>this.showAllTasks.bind(this)()}>All tasks</button>
            <button className="main-layout__filter-open-to-do" onClick={()=>this.showOpenTasks.bind(this)()}>Open tasks</button>
            <button className="main-layout__filter-done" onClick={()=>this.showClosedTasks.bind(this)()}>Closed tasks</button>

          </div>
        </div>
        <TodoList items={this.state.items} changeTaskState={this.onChangeCheckedState}
                  onDeleteTask={this.onDeleteTask}/>
      </React.Fragment>
    )
  }
}

export default TodoWrapper