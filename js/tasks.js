/**
 * Render all tasks into their respective columns.
 * @param {Array} tasks
 */
export function renderTasks(tasks) {
  const columns = {
    todo: document.querySelector('[data-status="todo"] .tasks-container'),
    doing: document.querySelector('[data-status="doing"] .tasks-container'),
    done: document.querySelector('[data-status="done"] .tasks-container'),
  };

  // Clear all columns
  Object.values(columns).forEach(col => col.innerHTML = '');

  // Group and render tasks
  tasks.forEach(task => {
    const card = createTaskCard(task);
    columns[task.status]?.appendChild(card);
  });

  // Update column headers with task counts
  document.getElementById('toDoText').textContent = `TODO (${tasks.filter(t => t.status === 'todo').length})`;
  document.getElementById('doingText').textContent = `DOING (${tasks.filter(t => t.status === 'doing').length})`;
  document.getElementById('doneText').textContent = `DONE (${tasks.filter(t => t.status === 'done').length})`;
}

/**
 * Create a DOM element for a task card.
 * @param {Object} task
 * @returns {HTMLElement}
 */
export function createTaskCard(task) {
  const div = document.createElement('div');
  div.className = 'task-div';
  div.dataset.id = task.id;
  div.innerHTML = `
    <strong>${task.title}</strong>
    <span style="margin-left:10px;color:#828fa3;font-size:0.9em;">${task.description || ''}</span>
  `;
  div.addEventListener('click', () => {
    const event = new CustomEvent('task:open', { detail: task });
    window.dispatchEvent(event);
  });
  return div;
}

/**
 * Generate a new unique task ID.
 * @param {Array} tasks
 * @returns {number}
 */
export function generateTaskId(tasks) {
  return tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
}