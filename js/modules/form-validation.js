import { initMasks, setBirthDateMax } from './masks.js';
import { showToast } from './feedback.js';

export function initFormValidation(root = document) {
  initMasks(root);
  setBirthDateMax(root);
  const form = root.querySelector('#cadastro');
  if (!form) return;

  const status = root.querySelector('#form-status');
  const fields = [...form.querySelectorAll('input, select, textarea')];
  const feedback = new Map();

  fields.forEach((field) => {
    const label = field.closest('label');
    if (!label) return;
    const existing = label.querySelector(`[data-feedback-for="${field.id}"]`);
    const hint = existing || document.createElement('small');
    if (!existing) {
      hint.dataset.feedbackFor = field.id;
      hint.id = `${field.id}-feedback`;
      hint.className = 'field-feedback';
      hint.hidden = true;
      label.append(hint);
    }
    feedback.set(field, hint);
    const describedBy = [field.getAttribute('aria-describedby'), hint.id].filter(Boolean).join(' ');
    field.setAttribute('aria-describedby', describedBy);

    field.addEventListener('blur', () => paintField(field));
    field.addEventListener('input', () => { clearStatus(); if (field.dataset.touched) paintField(field); });
    field.addEventListener('change', () => { clearStatus(); paintField(field); });
  });

  function clearStatus() {
    if (!status) return;
    status.textContent = '';
    status.className = 'status';
  }

  function paintField(field) {
    const hint = feedback.get(field);
    if (!hint) return;
    field.dataset.touched = 'true';
    const empty = !field.required && (field.type === 'checkbox' ? !field.checked : !field.value.trim());
    const valid = field.validity.valid;
    field.classList.toggle('is-invalid', !valid);
    field.classList.toggle('is-valid', valid && !empty);
    if (valid) field.removeAttribute('aria-invalid'); else field.setAttribute('aria-invalid', 'true');
    hint.hidden = empty;
    hint.className = `field-feedback ${valid ? 'success' : 'error'}`;
    hint.textContent = empty ? '' : valid ? 'Preenchimento válido.' : field.validationMessage;
  }

  form.addEventListener('invalid', (event) => {
    paintField(event.target);
    if (status) { status.textContent = 'Revise os campos indicados antes de continuar.'; status.className = 'status error'; }
  }, true);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    fields.forEach(paintField);
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (status) {
      status.textContent = 'Cadastro validado com sucesso. Demonstração concluída sem envio de dados.';
      status.className = 'status success';
    }
    showToast('Os campos foram conferidos com sucesso. Nenhum dado pessoal foi armazenado.', 'Cadastro validado');
  });
}
