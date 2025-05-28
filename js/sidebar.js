/**
 * Sidebar and mobile menu logic.
 * Handles toggling sidebar visibility and mobile menu.
 */

const sidebar = document.getElementById('side-bar-div');
const logo = document.getElementById('logo');
const hideBtn = document.getElementById('hide-sidebar-btn');
const showBtn = document.getElementById('show-sidebar-btn');

/**
 * Show sidebar (desktop or mobile).
 */
export function showSidebar() {
  sidebar.style.display = 'flex';
  if (showBtn) showBtn.style.display = 'none';
}

/**
 * Hide sidebar (desktop or mobile).
 */
export function hideSidebar() {
  sidebar.style.display = 'none';
  if (showBtn) showBtn.style.display = 'flex';
}

/**
 * Initialize sidebar toggle logic.
 */
export function initSidebar() {
  // Hide sidebar on mobile/tablet by default
  if (window.innerWidth < 1024) {
    hideSidebar();
  } else {
    showSidebar();
  }

  // Hide sidebar button logic
  if (hideBtn) {
    hideBtn.addEventListener('click', hideSidebar);
  }
  if (showBtn) {
    showBtn.addEventListener('click', showSidebar);
  }

  // Hide sidebar when logo is clicked (mobile menu)
  if (logo) {
    logo.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        showSidebar();
      }
    });
  }

  // Responsive: hide/show on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      hideSidebar();
    } else {
      showSidebar();
    }
  });
}