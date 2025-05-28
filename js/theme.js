const THEME_KEY = 'kanban_theme';

/**
 * Apply the selected theme to the document and update the toggle UI.
 * @param {'light'|'dark'} theme
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);

  // Move the switch-circle for dark mode
  const switchCircle = document.querySelector('.switch-circle');
  if (switchCircle) {
    switchCircle.style.transform = theme === 'dark' ? 'translateX(20px)' : 'translateX(0)';
  }
}

/**
 * Toggle between dark and light mode.
 */
export function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

/**
 * Get the current theme from localStorage or default to light.
 * @returns {'light'|'dark'}
 */
export function getCurrentTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

/**
 * Initialize theme toggle logic.
 */
export function initThemeToggle() {
  const toggleBtn = document.querySelector('.toggle-theme-btn');
  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', toggleTheme);

  // Set initial theme on load
  const theme = getCurrentTheme();
  applyTheme(theme);
}