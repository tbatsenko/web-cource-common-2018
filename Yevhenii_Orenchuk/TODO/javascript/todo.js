const taskInput = document.getElementById('text-input');
const submitButton = document.getElementById('submit');
const tasksList = document.getElementById('list');

let createNewTask = (taskName) => {
    let listItem = document.createElement('li');
    let label = document.createElement('label');
    let buttonsContainer = document.createElement('menu');
    let doneButton = document.createElement('button');
    let editButton = document.createElement('button');
    let removeButton = document.createElement('button');

    label.innerText = taskName;

    doneButton.innerText = 'Done';
    editButton.innerText = 'Edit';
    removeButton.innerText = 'Remove';

    listItem.className = 'tasks__item';
    buttonsContainer.className = 'tasks__buttons';

    listItem.appendChild(label);

    buttonsContainer.appendChild(doneButton);
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(removeButton);

    listItem.appendChild(buttonsContainer);

    return listItem;
};

let addTask = () => {
    console.log('Add task');

    const listItem = createNewTask(taskInput.value);
    tasksList.appendChild(listItem);

    taskInput.value = '';
};

submitButton.onclick = addTask;