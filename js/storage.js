window.saveTasksToStorage = function(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

window.loadTasksFromStorage = function() {
  const data = localStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};