import { useState, useEffect, useRef } from 'react';
import { getQuiz, nextQuestion, getResult } from '../services/orientation';
export default function useOrientation() {
  const [quiz,setQuiz] = useState(null);
  const [steps,setSteps] = useState([]);
  const [selected,setSelected] = useState([]);
  const [result,setResult] = useState(null);
  const [busy,setBusy] = useState(true);
  const [error,setError] = useState('');
  const [attempt,setAttempt] = useState(0);
  const lock = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    setBusy(true); setError(''); setQuiz(null); setSteps([]); setSelected([]); setResult(null);
    getQuiz(controller.signal).then(data => {
      if (!data.question) throw new Error('Questionario non disponibile.');
      if (!controller.signal.aborted) {setQuiz(data);setSteps([{question:data.question}]);}
    }).catch(e => {if (!controller.signal.aborted) setError(e.message);})
      .finally(() => {if (!controller.signal.aborted) setBusy(false);});
    return () => controller.abort();
  },[attempt]);
  const question = steps.at(-1)?.question;
  const valid = !!question && selected.length >= question.min_selections && selected.length <= question.max_selections;
  function toggle(answer) {
    if (busy || lock.current) return;
    setSelected(previous => {
      if (question.selection_type === 'single') return [answer.id];
      if (previous.includes(answer.id)) return previous.filter(id => id !== answer.id);
      if (answer.is_exclusive) return [answer.id];
      const remaining = previous.filter(id => !question.answers.find(a => a.id === id)?.is_exclusive);
      return remaining.length < question.max_selections ? [...remaining,answer.id] : remaining;
    });
  }
  async function advance() {
    if (!valid || busy || lock.current) return;
    lock.current=true;setBusy(true);setError('');
    const completedSteps = [...steps.slice(0,-1),{question,answer_ids:[...selected]}];
    const history = completedSteps.map(s => ({question_id:s.question.id,answer_ids:s.answer_ids}));
    try {
      const data = await nextQuestion(quiz.version_id,history);
      if (data.completed) {const output=await getResult(quiz.version_id,history);setSteps(completedSteps);setResult(output);}
      else {if (!data.question) throw new Error('Domanda successiva non disponibile.');setSteps([...completedSteps,{question:data.question}]);setSelected([]);}
    } catch(e) {setError(e.message);} finally {lock.current=false;setBusy(false);}
  }
  function back() {
    if (busy || lock.current) return;
    setError('');
    if (result) {setResult(null);setSelected(steps.at(-1).answer_ids);return;}
    if (steps.length<2) return;
    const previous=steps.slice(0,-1);setSteps(previous);setSelected(previous.at(-1).answer_ids || []);
  }
  function restart(){if (!busy && !lock.current) setAttempt(x=>x+1);}
  return {quiz,question,selected,result,busy,error,valid,step:steps.length,toggle,advance,back,restart};
}
