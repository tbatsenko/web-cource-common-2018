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
    doneButton.id = 'done';
    editButton.id = 'edit';
    removeButton.id = 'remove';

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
    removeTask(taskItem);

    if (ul.id === "list") {
        taskItem.querySelector("#done").innerText = 'Undone';
        taskItem.querySelector("label").className = "label-text--completed";
        completedTasksList.appendChild(taskItem);
        console.log('Task is moved to complete list');
    } else {
        taskItem.querySelector("#done").innerText = 'Done';
        taskItem.querySelector("label").className = "label-text";
        tasksList.appendChild(taskItem);
        console.log('Task is moved to incomplete list');
    }
};

let editTask = (taskItem) => {
    console.log("Edit task");

    let editButton = taskItem.querySelector('#edit');
    let doneButton = taskItem.querySelector('#done');

    if (editButton.className !== 'edit--active') {
        const label = taskItem.querySelector("label");

        let editField = document.createElement('input');
        editField.placeholder = label.innerText;
        editField.className = 'label-text__edit';
        editField.type = 'text';

        taskItem.replaceChild(editField, label);

        editButton.className = 'edit--active';
        doneButton.disabled = true;
    } else {
        const editField = taskItem.querySelector("input");
        let newLabel = document.createElement('label');
        newLabel.innerText = editField.value === '' ? editField.placeholder : editField.value;

        taskItem.replaceChild(newLabel, editField);

        editButton.className = null;
        doneButton.disabled = false;
    }
};

let removeTask = (taskItem) => {
    console.log("Delete Task...");
    taskItem.parentNode.removeChild(taskItem);
};

let bindTaskEvents = (taskListItem) => {
    console.log("bind list item events");

    let doneButton = taskListItem.querySelector('#done');
    let editButton = taskListItem.querySelector('#edit');
    let removeButton = taskListItem.querySelector("#remove");

    removeButton.onclick = () => {
        removeTask(taskListItem);
    };

    doneButton.onclick = () => {
        taskCompleted(taskListItem);
    };

    editButton.onclick = () => {
        editTask(taskListItem);
    };

};

submitButton.onclick = addTask;