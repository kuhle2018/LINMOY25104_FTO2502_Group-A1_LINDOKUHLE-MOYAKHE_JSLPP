/**
 * Render all tasks into their respective columns, sorted by title.
 * @param {Array} tasks
 */
export function renderTasks(tasks) {
  // Sort tasks by title (alphabetically)
  const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
  // If you want to sort by id instead, use:
  // const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);

  const columns = {
    todo: document.querySelector('[data-status="todo"] .tasks-container'),
    doing: document.querySelector('[data-status="doing"] .tasks-container'),
    done: document.querySelector('[data-status="done"] .tasks-container'),
  };

  // Clear all columns
  Object.values(columns).forEach(col => {
    if (col) col.innerHTML = '';
  });

  // Render tasks in the correct column
  sortedTasks.forEach(task => {
    const card = createTaskCard(task);
    if (columns[task.status]) columns[task.status].appendChild(card);
  });

  // Update column headers with task counts
  document.getElementById('toDoText').textContent = `TODO (${sortedTasks.filter(t => t.status === 'todo').length})`;
  document.getElementById('doingText').textContent = `DOING (${sortedTasks.filter(t => t.status === 'doing').length})`;
  document.getElementById('doneText').textContent = `DONE (${sortedTasks.filter(t => t.status === 'done').length})`;
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
  // Optional: Add click event for editing
  // div.addEventListener('click', () => { ... });
  return div;
}