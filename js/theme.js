const THEME_KEY = 'kanban_theme';

/**
 * Apply the selected theme to the document.
 * @param {'light'|'dark'} theme
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Toggle between dark and light mode.
 */
export function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  updateToggleButtons(next);
}

/**
 * Get the current theme from localStorage or default to light.
 * @returns {'light'|'dark'}
 */
export function getCurrentTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

/**
 * Update all theme toggle buttons to reflect the current theme.
 * @param {'light'|'dark'} theme
 */
function updateToggleButtons(theme) {
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.textContent = theme === 'dark' ? '🌙' : '☀️';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

/**
 * Initialize theme toggle logic.
 */
export function initThemeToggle() {
  // Add toggle buttons to sidebar and mobile menu
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Set initial theme
  const theme = getCurrentTheme();
  applyTheme(theme);
  updateToggleButtons(theme);
}