import { initNavigation } from './modules/navigation.js';
import { initFeedback } from './modules/feedback.js';
import { initProjectInteractions } from './modules/project-templates.js';
import { initRouter } from './modules/router.js';

function initApp() {
  const app = document.querySelector('#app');
  if (!app) return;
  initNavigation();
  initFeedback(app);
  initProjectInteractions(app);
  initRouter();
}

initApp();
