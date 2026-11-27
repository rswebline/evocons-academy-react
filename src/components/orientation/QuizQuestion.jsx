import React from 'react';
export default function QuizQuestion({question,selected,toggle,busy}) {
  const multiple=question.selection_type==='multiple';
  return <fieldset className="orientation-question" disabled={busy}>
    <legend>{question.text}</legend>
    {question.help_text && <p>{question.help_text}</p>}
    {multiple && <p>Seleziona da {question.min_selections} a {question.max_selections} risposte.</p>}
    {question.answers.map(answer => <label key={answer.id} className={`orientation-answer ${selected.includes(answer.id)?'is-selected':''}`}>
      <input type={multiple?'checkbox':'radio'} name={`question-${question.id}`} checked={selected.includes(answer.id)} onChange={()=>toggle(answer)}/>
      <span>{answer.label}</span>
    </label>)}
  </fieldset>;
}
