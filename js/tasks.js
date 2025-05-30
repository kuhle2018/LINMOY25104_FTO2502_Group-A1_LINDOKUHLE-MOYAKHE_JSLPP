window.createTaskElement = function(task) {
const div = document.createElement('div');
div.className = 'task-div';
div.innerHTML = `
<strong>${task.title}</strong>
`;
  div.addEventListener('click', function() {
    window.openTaskModalWithTask(task);
  });
return div;
};

window.renderAllTasks = function(tasks) {
  ['todo', 'doing', 'done'].forEach(status => {
    const container = document.querySelector(`[data-status="${status}"] .tasks-container`);
    if (container) container.innerHTML = '';
  });
  tasks.forEach(task => {
    const container = document.querySelector(`[data-status="${task.status}"] .tasks-container`);
    if (container) container.appendChild(window.createTaskElement(task));
  });
  document.getElementById('toDoText').textContent = `TODO (${tasks.filter(t => t.status === 'todo').length})`;
  document.getElementById('doingText').textContent = `DOING (${tasks.filter(t => t.status === 'doing').length})`;
  document.getElementById('doneText').textContent = `DONE (${tasks.filter(t => t.status === 'done').length})`;
};