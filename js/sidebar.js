/**
 * Sidebar and mobile menu logic.
 * Handles toggling sidebar visibility and mobile menu.
 */

const sidebar = document.getElementById('side-bar-div');
const logo = document.getElementById('logo');
const sidebarToggleBtn = document.createElement('button');
sidebarToggleBtn.id = 'sidebar-toggle-btn';
sidebarToggleBtn.innerHTML = '&#9776;'; // Hamburger icon
sidebarToggleBtn.style.display = 'none'; // Hidden by default

// Insert toggle button after sidebar for mobile/tablet
sidebar.parentNode.insertBefore(sidebarToggleBtn, sidebar.nextSibling);

/**
 * Show sidebar (desktop or mobile).
 */
export function showSidebar() {
  sidebar.classList.add('show-sidebar');
  sidebar.style.display = 'flex';
  sidebarToggleBtn.style.display = 'none';
}

/**
 * Hide sidebar (desktop or mobile).
 */
export function hideSidebar() {
  sidebar.classList.remove('show-sidebar');
  sidebar.style.display = 'none';
  sidebarToggleBtn.style.display = 'block';
}

/**
 * Initialize sidebar toggle logic.
 */
export function initSidebar() {
  // Hide sidebar on mobile/tablet by default
  if (window.innerWidth < 1024) {
    hideSidebar();
  }

  // Show/hide sidebar on toggle button click
  sidebarToggleBtn.addEventListener('click', showSidebar);

  // Hide sidebar when logo is clicked (mobile menu)
  logo.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      showSidebar();
    }
  });

  // Hide sidebar when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (
      window.innerWidth < 1024 &&
      sidebar.classList.contains('show-sidebar') &&
      !sidebar.contains(e.target) &&
      e.target !== sidebarToggleBtn &&
      e.target !== logo
    ) {
      hideSidebar();
    }
  });

  // Responsive: hide/show on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      hideSidebar();
    } else {
      showSidebar();
    }
  });
}