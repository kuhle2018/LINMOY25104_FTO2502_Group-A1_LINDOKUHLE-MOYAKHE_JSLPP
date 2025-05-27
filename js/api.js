/**
 * Fetch tasks from the remote API.
 * @returns {Promise<Array>} Resolves with an array of tasks.
 * @throws Will throw an error if the fetch fails.
 */
export async function fetchTasksFromAPI() {
  const API_URL = 'https://jsl-kanban-api.vercel.app/';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching tasks: ' + error.message);
  }
}