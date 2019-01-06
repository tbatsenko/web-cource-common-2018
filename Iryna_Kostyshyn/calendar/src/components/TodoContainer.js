import React from 'react';
import {withState, compose} from 'recompose';

const withTodoItemsState = compose(
    withState('todoItems', 'setTodoItems', []),
    withState('newTodo', 'setNewTodo', [])
);

const TodoContainer = withTodoItemsState(
    ({todoItems, setTodoItems, newTodo, setNewTodo, ...props}) => {

        const modifyTodoById = id => (field, value) => {
            setTodoItems(todoItems.map(item => {
                if (item.id === id) {
                    item[field] = value;
                }
                return item;
            }));
        };

        const removeTodoById = id => () => {
            setTodoItems(todoItems.filter(item => item.id !== id));
        };
        return <div className='todo-container'>
            <form className='todo-add'>
                <input name='todo-new' id='todo-add_input' placeholder='Enter your TODO text'
                       onChange={event => setNewTodo(event.target.value)}/>
                <div className={typeof newTodo === 'undefined' ? 'todo-add__btn--disabled' : 'todo-add__btn--active'}
                     onClick={() => {
                         if (typeof newTodo !== 'undefined') setTodoItems([...todoItems,
                             {
                                 text: newTodo,
                                 date: props.selectedDate,
                                 done: false,
                                 id: Date.now(),
                             },
                         ]);
                     }
                     }>
                    Add
                </div>
            </form>
            <TodoList modifyItemById={modifyTodoById} removeItemById={removeTodoById} items={todoItems}
                      currentDate={props.selectedDate}/>
        </div>
    });


const TodoList = React.memo(props => {
    const items = props.items.filter(item => item.date === props.selectedDate);
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
