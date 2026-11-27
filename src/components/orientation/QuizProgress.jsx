import React from 'react';
// All validated v1.1 paths contain nine questions.
const TOTAL = 9;
export default function QuizProgress({step}) {
  return <div className="orientation-progress">
    <div className="orientation-progress-label"><span>Domanda {step} di {TOTAL}</span><span>{Math.round(step/TOTAL*100)}%</span></div>
    <progress aria-label="Avanzamento del questionario" value={step} max={TOTAL}/>
  </div>;
}
