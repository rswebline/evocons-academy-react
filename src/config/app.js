export const UTM_FIELDS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term'
];

export const UTM_MAX_LENGTHS = {
  utm_source: 100,
  utm_medium: 100,
  utm_campaign: 150,
  utm_content: 150,
  utm_term: 150
};

export function getUtmParameters() {
  const params = new URLSearchParams(window.location.search);
  const attribution = {};

  for (const field of UTM_FIELDS) {
    const value = params.get(field)?.trim();

    if (value && value.length <= UTM_MAX_LENGTHS[field]) {
      attribution[field] = value;
    }
  }

  return attribution;
}

export function withUtm(url) {
  const attribution = getUtmParameters();

  if (Object.keys(attribution).length === 0) {
    return url;
  }

  const target = new URL(url, window.location.origin);

  if (target.origin !== window.location.origin) {
    return url;
  }

  for (const [field, value] of Object.entries(attribution)) {
    target.searchParams.set(field, value);
  }

  return target.pathname + target.search + target.hash;
}




export const pathname = window.location.pathname.replace(/\/$/, '') || '/';
export const courseSlug = pathname.match(/^\/corsi\/([a-z0-9-]+)$/)?.[1] ?? null;
export const isCoursePage = courseSlug !== null;
export const isInterestPage = pathname === '/manifestazione-interesse';
export const isPrivacyPage = pathname === '/privacy';
export const isInnerPage = isCoursePage || isInterestPage || isPrivacyPage;
export const interestUrl = courseSlug
  ? withUtm(`/manifestazione-interesse?corso=${encodeURIComponent(courseSlug)}`)
  : '/#corsi';
export const contactUrl = 'https://www.evocons.it/contatti';

export const ENROLLMENT_ENABLED = import.meta.env.VITE_ACADEMY_ENROLLMENT_ENABLED === 'true';
export const API_BASE_URL = (import.meta.env.VITE_ACADEMY_API_BASE_URL || '').replace(/\/$/, '');
export const PRIVACY_URL = import.meta.env.VITE_ACADEMY_PRIVACY_URL || '';
export const PRIVACY_VERSION = import.meta.env.VITE_ACADEMY_PRIVACY_VERSION || '';

export const COURSE_CATEGORY_LABELS = {
  base: 'CORSO BASE',
  professional: 'PROFESSIONAL',
  master: 'MASTER',
  'micro-course': 'CORSO BASE', // Compatibilità durante l'aggiornamento Directus
  specialization: 'PROFESSIONAL' // Compatibilità durante l'aggiornamento Directus
};
