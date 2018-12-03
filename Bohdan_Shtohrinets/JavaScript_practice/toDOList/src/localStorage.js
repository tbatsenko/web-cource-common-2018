let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

export {data, dataObjectUpdated}