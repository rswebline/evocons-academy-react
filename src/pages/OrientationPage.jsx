import React, {useEffect,useRef} from 'react';
import useOrientation from '../hooks/useOrientation';
import QuizProgress from '../components/orientation/QuizProgress';
import QuizQuestion from '../components/orientation/QuizQuestion';
import QuizNavigation from '../components/orientation/QuizNavigation';
import QuizResult from '../components/orientation/QuizResult';
import '../styles/16-orientation.css';
export default function OrientationPage(){
  const state=useOrientation();
  const heading=useRef(null);
  useEffect(()=>{heading.current?.focus();},[state.question?.id,state.result]);
  return <main className="orientation-page"><div className="container orientation-container">
    <p className="eyebrow">EVOCONS ACADEMY · ORIENTAMENTO</p>
    <h1 ref={heading} tabIndex={-1} className="orientation-heading">{state.quiz?.title || 'Trova il tuo percorso'}</h1>
    <p>Individua i percorsi formativi coerenti con i tuoi obiettivi e le tue preferenze.</p>
    <div className="orientation-panel" aria-busy={state.busy}>
      {state.error && <p role="alert" className="orientation-error">{state.error}</p>}
      {!state.quiz && (state.busy ? <p role="status">Caricamento…</p> : <button className="button button-primary" onClick={state.restart}>Riprova</button>)}
      {state.result ? <QuizResult {...state}/> : state.question && <>
        <QuizProgress step={state.step}/>
        <QuizQuestion key={state.question.id} {...state}/>
        <QuizNavigation {...state}/>
      </>}
    </div>
  </div></main>;
}
