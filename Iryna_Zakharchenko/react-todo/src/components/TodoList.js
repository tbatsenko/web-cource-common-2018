import React, { Component } from 'react'


class TodoList extends Component {


  render() {


    const { changeTaskState, items, onDeleteTask } = this.props
    // console.log(items)
      return <ul className="main-layout__task-container">
        {
          items.map(item =>
            <li key={item.id} className="main-layout__task">
              <div className="main-layout__task-text-check">
                <label>

                  <input key={item.id} type="checkbox" className="main-layout__input-checkbox"
                         checked={item.checked}
                         onChange={() => changeTaskState({ id: item.id, checked: !item.checked })
                         }
                  />
                </label>
                <span
                  className=
                    {item.checked ?
                      'main-layout__task-text main-layout__task__crossed-out'
                      : 'main-layout__task-text '}
                  onClick={() => changeTaskState({ id: item.id, checked: !item.checked })
                  }
                >{item.value}</span>
              </div>

              <button className="main-layout__del-task-btn" onClick={() => onDeleteTask({id: item.id})}>×
              </button>

            </li>,
          )


        }
      </ul>


  }


}

//
// const TodoList = ({changeTaskState, items}) => (
//   <div>
//
//   </div>
// )


export default TodoList