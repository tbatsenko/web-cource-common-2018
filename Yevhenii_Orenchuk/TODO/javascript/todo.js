const taskInput = document.getElementById('text-input');
const submitButton = document.getElementById('submit');
const tasksList = document.getElementById('list');
const completedTasksList = document.getElementById('completed-list');

let createNewTask = (taskName) => {
    let listItem = document.createElement('li');
    let label = document.createElement('label');
    let buttonsContainer = document.createElement('div');
    let doneButton = document.createElement('button');
    let editButton = document.createElement('button');
    let removeButton = document.createElement('button');

    label.innerText = taskName;

    doneButton.innerText = 'Done';
    editButton.innerText = 'Edit';
    removeButton.innerText = 'Remove';

    listItem.className = 'tasks__item';
    buttonsContainer.className = 'tasks__buttons';
    doneButton.className = 'isDone';
    editButton.className = 'edit';
    removeButton.className = 'remove';

    listItem.appendChild(label);

    buttonsContainer.appendChild(doneButton);
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(removeButton);

    listItem.appendChild(buttonsContainer);

    bindTaskEvents(listItem);

    return listItem;
};

let addTask = () => {
    console.log('Add task');

    const listItem = createNewTask(taskInput.value);
    tasksList.appendChild(listItem);

    taskInput.value = '';
};

let taskCompleted = (taskItem) => {
    console.log('Item checked');
    let ul = taskItem.parentNode;
    if (ul.id === "list") {
        removeTask(taskItem);
        taskItem.querySelector(".isDone").innerText = 'Undone';
        taskItem.querySelector("label").className = "label-text--completed";
        completedTasksList.appendChild(taskItem);
    } else {
        removeTask(taskItem);
        taskItem.querySelector(".isDone").innerText = 'Done';
        taskItem.querySelector("label").className = "label-text";
        tasksList.appendChild(taskItem);
    }
};

let removeTask = (taskItem) => {
    console.log("Delete Task...");
    taskItem.parentNode.removeChild(taskItem);
};

let bindTaskEvents = (taskListItem) => {
    console.log("bind list item events");

    let doneButton = taskListItem.querySelector('.isDone');
    let editButton = taskListItem.querySelector('.edit');
    let removeButton = taskListItem.querySelector(".remove");

    removeButton.onclick = () => {
        removeTask(taskListItem);
    };

    doneButton.onclick = () => {
        taskCompleted(taskListItem);
    };

};

submitButton.onclick = addTask;