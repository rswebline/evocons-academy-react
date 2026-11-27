import { API_BASE_URL } from '../config/app';
async function request(endpoint, body, signal) {
  const response = await fetch(`${API_BASE_URL}/academy/orientation/${endpoint}`, {
    method: body === undefined ? 'GET' : 'POST', signal,
    ...(body === undefined ? {} : {headers: {'Content-Type':'application/json'}, body: JSON.stringify(body)})
  });
  if (!response.ok) throw new Error(`Servizio di orientamento non disponibile (${response.status}).`);
  const payload = await response.json();
  if (!payload.data) throw new Error('Risposta del servizio non valida.');
  return payload.data;
}
export const getQuiz = signal => request('quiz', undefined, signal);
export const nextQuestion = (version_id, history) => request('next', {version_id, history});
export const getResult = (version_id, history) => request('result', {version_id, history});
