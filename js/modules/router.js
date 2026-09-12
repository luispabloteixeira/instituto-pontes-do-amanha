import { homeView, projectsView, cadastroView, componentsView, notFoundView } from '../views/views.js';
import { renderProjects } from './project-templates.js';
import { initFormValidation } from './form-validation.js';

const routes = {
  inicio: homeView,
  projetos: projectsView,
  cadastro: cadastroView,
  componentes: componentsView,
};

function routeNameFromHash() {
  const path = window.location.hash.replace(/^#\/?/, '').split(/[/?]/)[0];
  return path || 'inicio';
}

function setCurrentNav(route) {
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

export function navigateTo(hash) {
  const normalized = hash.startsWith('#/') ? hash : `#/${hash.replace(/^#?\/?/, '')}`;
  if (window.location.hash === normalized) renderRoute();
  else window.location.hash = normalized;
}

export function renderRoute() {
  const app = document.querySelector('#app');
  if (!app) return;
  const route = routeNameFromHash();
  const view = routes[route] || notFoundView;
  app.setAttribute('aria-busy', 'true');
  app.innerHTML = '';
  app.innerHTML = view();
  app.setAttribute('aria-busy', 'false');
  setCurrentNav(route);

  if (route === 'projetos') renderProjects(app);
  if (route === 'cadastro') initFormValidation(app);

  document.title = route === 'inicio' ? 'Instituto Pontes do Amanhã' : `${route[0].toUpperCase()}${route.slice(1)} | Instituto Pontes do Amanhã`;
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'auto' });
}

export function initRouter() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-route]');
    if (!link) return;
    event.preventDefault();
    navigateTo(link.getAttribute('href'));
  });
  window.addEventListener('hashchange', renderRoute);
  if (!window.location.hash) window.location.hash = '#/inicio';
  else renderRoute();
}
