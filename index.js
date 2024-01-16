document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dateDisplay').innerText = new Date().toISOString().split('T')[0];

    document.getElementById('addTaskButton').addEventListener('click', addTask);
    document.getElementById('taskInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    document.getElementById('downloadButton').addEventListener('click', downloadTasks);

    document.getElementById('taskList').addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteTask')) {
            event.target.parentElement.remove();
        } else if (event.target.type === 'checkbox') {
            toggleCompletion(event.target);
        }
    });
});

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskValue = taskInput.value.trim();
    if (taskValue === '') return;

    let taskList = document.getElementById('taskList');
    let newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.innerHTML = `<input type="checkbox"><label>${taskValue}</label> <button class="deleteTask">X</button>`;
    taskList.appendChild(newTask);
    taskInput.value = '';
}

function toggleCompletion(checkbox) {
    let label = checkbox.nextSibling;
    label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
}

function downloadTasks() {
    let tasks = document.querySelectorAll('#taskList label');
    let data = Array.from(tasks).map(task => {
        let completed = task.previousElementSibling.checked;
        return `"${task.innerText}", ${completed}`;
    });
    let csvContent = "data:text/csv;charset=utf-8,Task,Completed\n" + data.join("\n");
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_tasks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
