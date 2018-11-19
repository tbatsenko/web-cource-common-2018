let task = `
    <li id="{id}" class="content__item content__item__task">
        <input type="text" class="task__text" placeholder="" value="{text}">
        <button id="{btn-id}" class="task__delete-button" onclick="deleteTask(this.id)">
        <svg class="task__delete-button__ico"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
        </button>
     </li>
`;
const form = document.getElementById("newTaskForm");
const input = document.getElementById("newTaskInput");
form.addEventListener('submit', newTask);

function newTask(e) {
    e.preventDefault();
    const text = input.value;
    if (!/\S/.test(text)) return;
    const uniqueId = generateId();
    let newTask = document.createElement('div');
    newTask.innerHTML = task.replace("{text}", text).replace("{id}", uniqueId).replace("{btn-id}", '-btn-' + uniqueId).trim();
    document.getElementById("taskContainer").appendChild(newTask.firstChild);
    input.value = "";
}

function deleteTask(btnId) {
    let elemId;
    if (btnId.startsWith("-btn-"))
        elemId = btnId.slice(5);
    else
        elemId = btnId;
    document.getElementById(elemId).remove();
}

function generateId() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

document.getElementsByClassName('content')[0].style.height = window.innerHeight + 'px';
