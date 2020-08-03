/**
 * Task Management App
 * author: ankitboghra@gmail.com
 * *******DS Prototype*******
    servers = {
        'server-1': {
            tasks: ['server-1-task-1', 'server-1-task-2', 'server-1-task-3',...],
            nextTaskId: 3,
            active: true,
        },
        'server-2': {
            tasks: ['server-2-task-1', 'server-2-task-2', 'server-3-task-3',...],
            nextTaskId: 3,
            active: false,
        },
        ...
    }
 */

/* CONSTANTS */
const TIME_FOR_ONE_TASK = 20; // In seconds

/* GLOBAL */
const servers = {};
let nextId = 0;

const createServer = () => {
    if (Object.keys(servers).length >= 10) return;

    // adding new server to servers object
    servers[`server-${++nextId}`] = { tasks: [], nextTaskId: 0, active: false };

    const newServer = document.createElement('div');
    newServer.classList.add('server');
    newServer.id = `server-${nextId}`;
    document.getElementById("servers").append(newServer);

    const deleteServerButton = document.createElement('button');
    deleteServerButton.classList.add('delete-server');
    deleteServerButton.id = `delete-server-${nextId}`;
    deleteServerButton.innerHTML = "Delete Server";
    deleteServerButton.onclick = (e) => deleteServer(e);
    newServer.append(deleteServerButton);

    const countTextField = document.createElement('input');
    countTextField.type = 'number';
    countTextField.classList.add('count-of-task');
    countTextField.placeholder = "Count";
    newServer.append(countTextField);

    const createTaskButton = document.createElement('button');
    createTaskButton.innerHTML = 'Add Tasks';
    createTaskButton.classList.add('add-task');
    newServer.append(createTaskButton);

    createTaskButton.onclick = (e) => addTasks(e);

    return `server-${nextId}`;
};

const deleteServer = (e) => {
    const serverId = e.target.parentElement.id;
    if (servers[serverId] && servers[serverId].tasks.length <= 0 && Object.keys(servers).length > 1) {
        delete servers[serverId];
        document.getElementById(serverId).remove();
    }
};

const createTask = (serverId) => {
    // Creating a single task
    const task = document.createElement('div');
    const taskId = `${serverId}-task-${++servers[serverId].nextTaskId}`;
    task.classList.add('task');
    task.id = taskId;

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');

    const progress = document.createElement('div');
    progress.classList.add('progress');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.classList.add('delete-task');
    deleteButton.onclick = (e) => deleteTask(e);

    task.append(progressBar, deleteButton);
    progressBar.append(progress);

    servers[serverId].tasks.push(taskId)
    return task;
};

const addTasks = (e) => {
    // Get count of tasks to be added from textfield
    count = e.target.parentElement.getElementsByClassName('count-of-task')[0].value;
    if (!count && !(count > 0)) return;

    // clear textbox
    e.target.parentElement.getElementsByClassName('count-of-task')[0].value="";

    const currentServerId = e.target.parentElement.id;
    // Adding tasks to UI
    for (let i = 0; i < count; ++i) {
        const task = createTask(currentServerId);
        e.target.parentElement.append(task);
    }

    runTasks(currentServerId);
}

const deleteTask = (e) => {
    const targetId = e.target.parentElement.id;
    const serverId = `server-${/\-(.*?)\-/.exec(targetId)[1]}`; // extracting server id

    // deleting task from task list
    servers[serverId].tasks.splice(servers[serverId].tasks.indexOf(targetId), 1);

    // deleting task from UI
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
};

const runTasks = (serverId) => {
    // if no tasks
    if (servers[serverId].tasks.length <= 0)
        return;
    // if a tasks are already running
    if (servers[serverId].active === true)
        return;

    servers[serverId].active = true;

    let currentTaskId = servers[serverId].tasks[0];

    // disabling delete button for active task
    document.getElementById(currentTaskId).childNodes[1].disabled = true;

    // run timer
    let timeElapsed = 0;
    let intervalId = setInterval(function () {
        // progress bar UI update
        const task = document.getElementById(currentTaskId).firstChild.firstChild;
        task.style.width = `${timeElapsed * (100 / TIME_FOR_ONE_TASK)}%`;

        // task termination
        if (timeElapsed++ >= TIME_FOR_ONE_TASK) {
            window.clearInterval(intervalId);

            // delete current taskId
            servers[serverId].tasks.shift();
            servers[serverId].active = false;

            // enabling delete button for completed task
            document.getElementById(currentTaskId).childNodes[1].disabled = false;

            runTasks(serverId);
        }
    }, 1000);
};


// linking functions with UI
document.getElementById("add-server").onclick = () => createServer();

// adding first server
const firstServerId = createServer();
