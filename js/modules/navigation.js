export function initNavigation() {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#menu');
  const dropdownButton = document.querySelector('.dropdown-toggle');
  const submenu = document.querySelector('.submenu');
  const navWrap = document.querySelector('.nav-wrap');
  const navDropdown = document.querySelector('.nav-dropdown');

  function setDropdown(open) {
    if (!dropdownButton || !submenu) return;
    dropdownButton.setAttribute('aria-expanded', String(open));
    submenu.hidden = !open;
  }
  function setMenu(open) {
    if (!menuButton || !menu) return;
    menu.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    if (!open) setDropdown(false);
  }

  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  dropdownButton?.addEventListener('click', () => setDropdown(dropdownButton.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) setDropdown(false);
    if (!event.target.closest('.nav-wrap')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (dropdownButton?.getAttribute('aria-expanded') === 'true') { setDropdown(false); dropdownButton.focus(); }
    else if (menuButton?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); }
  });
  navWrap?.addEventListener('focusout', (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setMenu(false);
  });
  navDropdown?.addEventListener('focusout', (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setDropdown(false);
  });
  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', () => setMenu(false));
}
