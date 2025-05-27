let currentTaskId = null; // Track which task is being edited

/**
 * Open the modal for editing or adding a task.
 * @param {Object|null} task If null, open for new task; else, open for editing.
 */
export function openTaskModal(task = null) {
  const modal = document.getElementById('task-modal');
  const form = document.getElementById('task-form');
  currentTaskId = task ? task.id : null;

  // Set modal fields
  form['task-title'].value = task ? task.title : '';
  form['task-desc'].value = task ? task.description : '';
  form['task-status'].value = task ? task.status : 'todo';

  // Set modal title
  modal.querySelector('h3').textContent = task ? 'Edit Task' : 'Add Task';

  // Show modal
  modal.showModal();
}

/**
 * Close the task modal.
 */
export function closeTaskModal() {
  document.getElementById('task-modal').close();
  currentTaskId = null;
}

/**
 * Get the current task ID being edited, or null if adding.
 * @returns {number|null}
 */
export function getCurrentTaskId() {
  return currentTaskId;
}