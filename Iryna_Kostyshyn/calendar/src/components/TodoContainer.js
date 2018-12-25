import React, {useState} from 'react';

const TodoContainer = props => {
    const [ todoItems, setTodoItems ] = useState([]);
    const [ newTodo, setNewTodo ] = useState([]);

    const modifyTodoById = id => (field, value) => {
        props.setTodoItems(props.todoItems.map(item => {
            if (item.id === id) {
                item[field] = value;
            }
            return item;
        }));
    };

    const removeTodoById = id => () => {
        setTodoItems(props.todoItems.filter(item => item.id !== id));
    };
    return <div className='todo-container'>
        <form className='todo-add'>
            <input name='todo-new' id='todo-add_input' placeholder='Enter your TODO text'
                   onChange={event => setNewTodo(event.target.value)}/>
            <div className={typeof newTodo === 'undefined' ? 'todo-add__btn--disabled' : 'todo-add__btn--active'}
                 onClick={() => {
                     if (typeof newTodo !== 'undefined') props.setTodoItem([...props.todoItem,
                         {
                             text: newTodo,
                             date: props.currentDate,
                             done: false,
                             id: Date.now(),
                         },]);
                 }
                 }>Add
            </div>
        </form>
        <TodoList modifyItemById={modifyTodoById} removeItemById={removeTodoById} items={todoItems}
                  currentDate={props.currentDate}/>
    </div>
};


const TodoList = React.memo(props => {
    const items = props.items.filter(item => item.date === props.currentDate);
    return (items.length > 0) ?
        <ul className='todo-list'>
            {props.items.map(item =>
                <TodoItem
                    key={item.id}
                    modifyId={props.modifyTodobyId(item.id)}
                    removeId={props.removeTodoById(item.id)}
                    text={item.text}
                    done={item.done}/>)}
        </ul> :
    'Have a nice day'

});

const TodoItem = props => {
    return <li>

        <div className={props.done ? 'todo-item__text--done' : 'todo-item__text'}>{props.text}</div>
        <div className='todo-item__btn-mark'
             onClick={() => props.modifyId('done', !props.done)}>{props.done ? 'Mark done' : 'Mark undone'}</div>
        <div className='todo-item__btn-del' onClick={props.removeId}>Remove</div>
    </li>;
};


export default TodoContainer;
