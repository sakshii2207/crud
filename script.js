document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = { id: Date.now(), text: taskText };
            tasks.push(task);
            addTaskToList(task);
            taskInput.value = '';
           
        }
    });

    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit')) {
            const li = e.target.closest('li');
            const taskId = li.getAttribute('data-id');
            const taskText = prompt('Edit task:', li.firstChild.textContent);
            if (taskText !== null && taskText.trim() !== '') {
                const task = tasks.find(task => task.id == taskId);
                task.text = taskText.trim();
                li.firstChild.textContent = task.text;
               
            }
        } else if (e.target.classList.contains('delete')) {
            const li = e.target.closest('li');
            const taskId = li.getAttribute('data-id');
            tasks = tasks.filter(task => task.id != taskId);
            taskList.removeChild(li);
          
        }
    });

    function addTaskToList(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.textContent = task.text;
        const actions = document.createElement('div');
        actions.classList.add('actions');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        actions.appendChild(editButton);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        actions.appendChild(deleteButton);
        li.appendChild(actions);
        taskList.appendChild(li);
    }

    
});