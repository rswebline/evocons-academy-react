import { API_BASE_URL } from '../config/app';

function formatEditionDate(value, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('it-IT', { ...options, timeZone: 'UTC' }).format(date);
}

function formatEditionTime(value) {
  return typeof value === 'string' && /^\d{2}:\d{2}/.test(value) ? value.slice(0, 5) : '';
}

function publicEditions(items) {
  const today = new Date().toISOString().slice(0, 10);
  return (Array.isArray(items) ? items : [])
    .filter(item => item && ['scheduled', 'confirmed'].includes(item.status)
      && typeof item.start_date === 'string' && item.start_date.slice(0, 10) >= today)
    .sort((a, b) => a.start_date.localeCompare(b.start_date));
}

async function fetchEditions(slug, signal) {
  const response = await fetch(`${API_BASE_URL}/academy/courses/${encodeURIComponent(slug)}/editions`, { signal });
  if (!response.ok) throw new Error('Edizioni non disponibili');
  const payload = await response.json();
  if (!Array.isArray(payload.data)) throw new Error('Formato edizioni non valido');
  return publicEditions(payload.data);
}

export { formatEditionDate, formatEditionTime, publicEditions, fetchEditions };
