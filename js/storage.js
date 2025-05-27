const STORAGE_KEY = 'kanban_tasks';

/**
 * Save tasks array to localStorage.
 * @param {Array} tasks
 */
export function saveTasksToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Load tasks array from localStorage.
 * @returns {Array} Array of tasks or empty array if none found.
 */
export function loadTasksFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}