window.openTaskModalForNew = function() {
  const taskModal = document.getElementById('task-modal');
  const taskForm = document.getElementById('task-form');
  if (taskForm && taskModal) {
    taskForm.reset();
    delete taskForm.dataset.editingId;
    taskModal.querySelector('h3').textContent = 'Add new task';
    // Show only Create Task button
    document.getElementById('create-task-btn').style.display = 'block';
    document.getElementById('save-task-btn').style.display = 'none';
    document.getElementById('delete-task-btn').style.display = 'none';
    taskModal.showModal();
  }
};

window.openTaskModalWithTask = function(task) {
  const taskModal = document.getElementById('task-modal');
  const taskForm = document.getElementById('task-form');
  if (taskForm && taskModal) {
    taskForm.reset();
    taskForm['title'].value = task.title;
    taskForm['description'].value = task.description;
    taskForm['status'].value = task.status;
    taskForm['priority'].value = task.priority || 'low';
    taskForm.dataset.editingId = task.id;
    taskModal.querySelector('h3').textContent = 'Edit Task';
    // Show only Save and Delete buttons
    document.getElementById('create-task-btn').style.display = 'none';
    document.getElementById('save-task-btn').style.display = 'block';
    document.getElementById('delete-task-btn').style.display = 'block';
    taskModal.showModal();
  }
};

window.closeTaskModal = function() {
  const taskModal = document.getElementById('task-modal');
  if (taskModal) taskModal.close();
};