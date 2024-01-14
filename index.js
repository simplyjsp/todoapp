document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.querySelector('.task-input');
    const taskList = document.querySelector('.task-list');
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBar = document.querySelector('.progress-bar');
    const downloadBtn = document.querySelector('.download-btn');
    const addTaskBtn = document.querySelector('.add-task-btn');
    const dateDisplay = document.getElementById('date-display');

    // Initially hide the progress bar container
    progressBarContainer.style.display = 'none';

    // Display current date
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    dateDisplay.textContent = currentDate;

    // Function to update the progress bar
    function
updateProgressBar() {
const tasks = taskList.querySelectorAll('.task-list-item');
const completedTasks = taskList.querySelectorAll('.completed').length;
const totalTasks = tasks.length;
const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
progressBar.style.width = progress + '%';
    // Hide or show the progress bar container based on tasks
    progressBarContainer.style.display = totalTasks === 0 ? 'none' : 'block';
}

// Function to add a new task with a delete button
function addTask() {
    if (taskInput.value.trim() !== '') {
        const listItem = document.createElement('li');
        listItem.classList.add('task-list-item');
        
        // Create a span to hold the task text
        const textSpan = document.createElement('span');
        textSpan.textContent = taskInput.value;
        listItem.appendChild(textSpan);

        // Create a delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-task-btn');
        deleteBtn.onclick = function() {
            listItem.remove();
            updateProgressBar();
        };

        // Append the delete button to the list item
        listItem.appendChild(deleteBtn);

        listItem.addEventListener('click', function(event) {
            // Toggle completed class only when clicking on the text, not the delete button
            if (event.target === textSpan) {
               ();
}
});
        taskList.appendChild(listItem);
        taskInput.value = '';
        updateProgressBar();
    }
}

// Event listeners for adding tasks
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to download completed tasks
downloadBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const completedTasks = Array.from(taskList.querySelectorAll('.completed')).map(task => task.textContent);
    const blob = new Blob([completedTasks.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'completed_tasks.txt';
    link.click();
    URL.revokeObjectURL(url);
});
});
