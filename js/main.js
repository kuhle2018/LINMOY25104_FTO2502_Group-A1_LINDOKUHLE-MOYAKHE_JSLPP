import { fetchTasksFromAPI } from './api.js';
import { saveTasksToStorage, loadTasksFromStorage } from './storage.js';
import { renderTasks, generateTaskId } from './tasks.js';
import { openTaskModal, closeTaskModal, getCurrentTaskId } from './modal.js';

let tasks = [];
let isLoading = false;

// DOM Elements
const addTaskBtn = document.getElementById('add-new-task-btn');
const taskModal = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');
const closeModalBtn = document.getElementById('close-modal-btn');

// Show loading state
function showLoading() {
  document.querySelectorAll('.tasks-container').forEach(c => c.innerHTML = '<div>Loading...</div>');
}

// Show error state
function showError(message) {
  document.querySelectorAll('.tasks-container').forEach(c => c.innerHTML = `<div style="color:red">${message}</div>`);
}

// Initialize app
async function init() {
  isLoading = true;
  showLoading();

  // Try to load from localStorage first
  tasks = loadTasksFromStorage();
  if (tasks.length) {
    renderTasks(tasks);
    isLoading = false;
    return;
  }

  // Else, fetch from API
  try {
    tasks = await fetchTasksFromAPI();
    saveTasksToStorage(tasks);
    renderTasks(tasks);
  } catch (err) {
    showError('Failed to load tasks. Please try again later.');
  } finally {
    isLoading = false;
  }
}

// Add new task button
addTaskBtn.addEventListener('click', () => {
  openTaskModal(null);
});

// Listen for task card click (custom event)
window.addEventListener('task:open', (e) => {
  openTaskModal(e.detail);
});

// Close modal button
closeModalBtn.addEventListener('click', closeTaskModal);

// Handle form submit (edit or add)
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = getCurrentTaskId();
  const title = taskForm['task-title'].value.trim();
  const description = taskForm['task-desc'].value.trim();
  const status = taskForm['task-status'].value;

  if (!title) return;

  if (id) {
    // Edit existing task
    tasks = tasks.map(task =>
      task.id === id ? { ...task, title, description, status } : task
    );
  } else {
    // Add new task
    const newTask = {
      id: generateTaskId(tasks),
      title,
      description,
      status,
    };
    tasks.push(newTask);
  }

  saveTasksToStorage(tasks);
  renderTasks(tasks);
  closeTaskModal();
});

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);