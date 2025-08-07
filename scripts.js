const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const completeList = document.querySelector('.list-tasks');

let taskList = [];

function addNewTask() {
    if (input.value.trim() !== '') {
        taskList.push({
            task: input.value.trim(),
            completed: false
        });
        input.value = '';
        showTasks();
    }
}

function showTasks() {
    let newLi = '';

    taskList.forEach((item, index) => {
        newLi += `
            <li class="task ${item.completed ? 'done' : ''}">
                <img src="img/checked.png" alt="checked" onclick="concludeTask(${index})">
                <p>${item.task}</p>
                <img src="img/trash.png" alt="trash" onclick="deleteTask(${index})">
            </li>`;
    });

    completeList.innerHTML = newLi;

    // Salvar no localStorage
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function concludeTask(index) {
    taskList[index].completed = !taskList[index].completed;
    showTasks();
}

function deleteTask(index) {
    taskList.splice(index, 1);
    showTasks();
}

function loadTasks() {
    const storedTasks = localStorage.getItem('taskList');
    if (storedTasks) {
        taskList = JSON.parse(storedTasks);
    }
    showTasks(); // Importante: mostrar as tarefas após carregar
}

// Inicialização
loadTasks();
button.addEventListener('click', addNewTask);