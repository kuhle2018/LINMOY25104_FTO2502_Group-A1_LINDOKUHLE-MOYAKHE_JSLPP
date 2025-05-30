let tasks = [];

function loadTasksAndRender() {
  // Replace the URL below with your actual API endpoint
  fetch('https://jsl-kanban-api.vercel.app/')
    .then(res => res.json())
    .then(apiTasks => {
      tasks = apiTasks;
      window.saveTasksToStorage(tasks); // Optional: for offline fallback
      window.renderAllTasks(tasks);
    })
    .catch(() => {
      // Fallback to local storage or initialTasks if API fails
      tasks = window.loadTasksFromStorage();
      if (!tasks.length && window.initialTasks) tasks = window.initialTasks.slice();
      window.renderAllTasks(tasks);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  loadTasksAndRender();

const addTaskBtn = document.getElementById('add-new-task-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const taskForm = document.getElementById('task-form');
  const deleteBtn = document.getElementById('delete-task-btn');

  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', window.openTaskModalForNew);
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', window.closeTaskModal);
  }
  if (taskForm) {
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const title = taskForm['title'].value.trim();
      const description = taskForm['description'].value.trim();
      const status = taskForm['status'].value;
      const priority = taskForm['priority'] ? taskForm['priority'].value : 'low';
      if (!title) return;
      const editingId = taskForm.dataset.editingId;
      if (editingId) {
        const task = tasks.find(t => t.id == editingId);
        if (task) {
          task.title = title;
          task.description = description;
          task.status = status;
          task.priority = priority;
        }
        delete taskForm.dataset.editingId;
      } else {
        const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        const newTask = { id: newId, title, description, status, priority };
        tasks.push(newTask);
      }
      window.saveTasksToStorage(tasks);
      window.renderAllTasks(tasks);
      window.closeTaskModal();
    });
  }
  if (deleteBtn && taskForm) {
    deleteBtn.addEventListener('click', function() {
      const editingId = taskForm.dataset.editingId;
      if (editingId) {
        tasks = tasks.filter(t => t.id != editingId);
        window.saveTasksToStorage(tasks);
        window.renderAllTasks(tasks);
        window.closeTaskModal();
      }
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', function() {
      document.body.classList.toggle('dark', themeToggle.checked);
      localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
    });

    // Set theme on load
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      themeToggle.checked = true;
    }
  }
  function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  // Create priority indicator
  const priorityBall = document.createElement("span");
  priorityBall.classList.add("priority-ball", task.priority);

  taskElement.innerHTML = `
    ${priorityBall.outerHTML}
    <span>${task.name}</span>
  `;

  return taskElement;
}


const sidebar = document.getElementById('side-bar-div');
const hideSidebarBtn = document.getElementById('hide-sidebar-btn');
const showSidebarBtn = document.getElementById('show-sidebar-btn');

if (hideSidebarBtn && sidebar && showSidebarBtn) {
  hideSidebarBtn.addEventListener('click', function() {
    sidebar.style.display = 'none';
    showSidebarBtn.style.display = 'flex';
  });

  showSidebarBtn.addEventListener('click', function() {
    sidebar.style.display = 'block';
    showSidebarBtn.style.display = 'none';
  });
}
    });
  
