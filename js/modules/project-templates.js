import { projects } from '../data/projects.js';
import { getInterests, toggleInterest } from './storage.js';
import { showToast } from './feedback.js';

function projectCardTemplate(project, savedIds) {
  const saved = savedIds.includes(project.id);
  return `
    <article class="card project project-card${saved ? ' is-saved' : ''}" data-project-id="${project.id}">
      <div class="project-badges" aria-label="Categoria e situação do projeto">
        <span class="badge ${project.categoriaClasse}">${project.categoria}</span>
        <span class="badge ${project.statusClasse}">${project.status}</span>
      </div>
      <h2>${project.titulo}</h2>
      <p>${project.descricao}</p>
      <ul>${project.itens.map((item) => `<li>${item}</li>`).join('')}</ul>
      <div class="project-actions">
        <button class="button btn-interesse" type="button" data-project-interest="${project.id}" aria-pressed="${saved}">
          ${saved ? 'Remover interesse' : 'Salvar interesse'}
        </button>
        <a class="button button-secondary" href="#/cadastro" data-route>Quero participar</a>
      </div>
    </article>`;
}

export function renderProjects(root = document) {
  const container = root.querySelector('#projects-list');
  if (!container) return;
  const savedIds = getInterests();
  container.innerHTML = projects.map((project) => projectCardTemplate(project, savedIds)).join('');
}

export function initProjectInteractions(app) {
  app.addEventListener('click', (event) => {
    const button = event.target.closest('[data-project-interest]');
    if (!button) return;
    const id = button.dataset.projectInterest;
    const savedIds = toggleInterest(id);
    const saved = savedIds.includes(id);
    const card = button.closest('[data-project-id]');
    card?.classList.toggle('is-saved', saved);
    button.setAttribute('aria-pressed', String(saved));
    button.textContent = saved ? 'Remover interesse' : 'Salvar interesse';
    showToast(saved ? 'Projeto salvo na sua lista de interesses.' : 'Projeto removido da sua lista de interesses.', 'Preferência atualizada');
  });
}
