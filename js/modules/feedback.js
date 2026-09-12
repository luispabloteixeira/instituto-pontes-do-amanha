let toastTimer;

export function showToast(message, title = 'Atualização') {
  const toast = document.querySelector('#global-toast');
  const titleNode = document.querySelector('#global-toast-title');
  const messageNode = document.querySelector('#global-toast-message');
  if (!toast || !messageNode || !titleNode) return;

  titleNode.textContent = title;
  messageNode.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 5000);
}

export function initFeedback(app) {
  document.querySelector('#close-global-toast')?.addEventListener('click', () => {
    const toast = document.querySelector('#global-toast');
    if (toast) toast.hidden = true;
    clearTimeout(toastTimer);
  });

  app.addEventListener('click', (event) => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'show-demo-toast') {
      showToast('Os componentes estão prontos para uso. Nenhum dado foi enviado.', 'Notificação de demonstração');
    }
    if (action === 'open-guidance') {
      app.querySelector('#guidance-dialog')?.showModal();
    }
  });
}
