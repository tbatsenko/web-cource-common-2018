const adapter = require("./adapter");

module.exports = function todo() {
    const taskInput = document.getElementById('text-input');
    const submitButton = document.getElementById('submit');
    const tasksList = document.getElementById('list');
    const completedTasksList = document.getElementById('completed-list');
    let index = 0;

    let createNewTask = (taskName) => {
        let listItem = document.createElement('li');
        let label = document.createElement('label');
        let buttonsContainer = document.createElement('div');
        let doneButton = document.createElement('button');
        let editButton = document.createElement('button');
        let removeButton = document.createElement('button');

        label.innerText = taskName;
        label.className = "label-text";

        doneButton.innerText = 'Done';
        editButton.innerText = 'Edit';
        removeButton.innerText = 'Remove';

        listItem.className = 'tasks__item';
        index += 1;
        listItem.id = index.toString();
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

        if (taskInput.value !== '') {
            const listItem = createNewTask(taskInput.value);
            tasksList.appendChild(listItem);

            let data = {
                id: Number(listItem.id),
                title: taskInput.value,
            };

            adapter.add("task", data);

            taskInput.value = '';
        }
    };

    let taskCompleted = (taskItem) => {
        console.log('Item checked');

        let ul = taskItem.parentNode;
        const data = {
            id: Number(taskItem.id),
            title: taskItem.querySelector("label").innerText,
        };
        removeTask(taskItem);

        if (ul.id === "list") {
            taskItem.querySelector("#done").innerText = 'Undone';
            taskItem.querySelector("label").className = "label-text--completed";
            completedTasksList.appendChild(taskItem);
            adapter.add("done", data);
            console.log('Task is moved to complete list');
        } else {
            taskItem.querySelector("#done").innerText = 'Done';
            taskItem.querySelector("label").className = "label-text";
            tasksList.appendChild(taskItem);
            adapter.add("task", data);
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
            const ul = taskItem.parentNode;
            newLabel.className = ul.id === 'list' ? 'label-text' : 'label-text--completed';

            const list = ul.id === 'list' ? "task" : "done";
            const data = {
                id: Number(taskItem.id),
                title: newLabel.innerText,
            };

            adapter.update(list, data.id, data);
            taskItem.replaceChild(newLabel, editField);

            editButton.className = null;
            doneButton.disabled = false;
        }
    };

    let removeTask = (taskItem) => {
        console.log("Delete Task...");

        let ul = taskItem.parentNode;
        const id = Number(taskItem.id);
        const list = ul.id === "list" ? "task" : "done";
        adapter.removeById(list, id);
        ul.removeChild(taskItem);
    };

    let bindTaskEvents = (taskListItem) => {
        console.log("bind list item events");

        let doneButton = taskListItem.querySelector('#done');
        let editButton = taskListItem.querySelector('#edit');
        let removeButton = taskListItem.querySelector("#remove");

        removeButton.onclick = () => { removeTask(taskListItem); };
        doneButton.onclick = () => { taskCompleted(taskListItem); };
        editButton.onclick = () => { editTask(taskListItem); };

    };

    let initList = () => {
        console.log("init db");

        adapter.getTasks("task").then(result => {
            for (let i = 0; i < result.length; i++) {
                const item = result[i];
                const listItem = createNewTask(item.title);
                listItem.id = item.id;
                tasksList.appendChild(listItem);
            }
        });

        adapter.getTasks("done").then(result => {
            for (let i = 0; i < result.length; i++) {
                const item = result[i];
                let listItem = createNewTask(item.title);
                listItem.querySelector("label").className = "label-text--completed";
                listItem.id = item.id;
                completedTasksList.appendChild(listItem);
            }
        });
    };

    initList();
    submitButton.onclick = addTask;

    taskInput.addEventListener("keydown", function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
            return false;
        }
    });
};
