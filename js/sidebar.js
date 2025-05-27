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
sidebar.parentNode.insert