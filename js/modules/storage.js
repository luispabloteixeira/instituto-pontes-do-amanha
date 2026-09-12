const INTERESTS_KEY = 'pontes:interesses';

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

export function getInterests() {
  try {
    const raw = localStorage.getItem(INTERESTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return isStringArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Dados locais inválidos foram ignorados.', error);
    return [];
  }
}

export function setInterests(ids) {
  const normalized = [...new Set(ids.filter((id) => typeof id === 'string'))];
  localStorage.setItem(INTERESTS_KEY, JSON.stringify(normalized));
  return normalized;
}

export function toggleInterest(id) {
  const current = getInterests();
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
  return setInterests(next);
}
