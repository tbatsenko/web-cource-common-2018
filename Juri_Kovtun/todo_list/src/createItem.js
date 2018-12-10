const createItem = function(value) {
    const li = document.createElement('li');
    li.classList.add('todo__item');
    li.innerHTML = `<input class="todo__completed" type="checkbox">
                    <input class="todo__remove" type="submit" value="remove">
                    <input class="todo__edit" type="submit" value="edit">
                    <p class="todo__content">${value}</p>`;
    return li
};

export {createItem};