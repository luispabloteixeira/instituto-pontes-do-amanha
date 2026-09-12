const onlyDigits = (value) => value.replace(/\D/g, '');

const masks = {
  cpf(value) {
    return onlyDigits(value).slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  },
  telefone(value) {
    const digits = onlyDigits(value).slice(0, 11);
    return digits.length > 10
      ? digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      : digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  },
  cep(value) {
    return onlyDigits(value).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
  },
};

export function initMasks(root = document) {
  Object.entries(masks).forEach(([name, mask]) => {
    const field = root.querySelector(`[name="${name}"]`);
    field?.addEventListener('input', () => { field.value = mask(field.value); });
  });
}

export function setBirthDateMax(root = document) {
  const birthDate = root.querySelector('[name="nascimento"]');
  if (!birthDate) return;
  const today = new Date();
  birthDate.max = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
}
