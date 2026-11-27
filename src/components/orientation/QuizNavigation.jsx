import React from 'react';
export default function QuizNavigation({step,busy,valid,back,advance}) {
  return <div className="orientation-navigation">
    <button type="button" className="button button-outline" disabled={busy||step===1} onClick={back}>Indietro</button>
    <button type="button" className="button button-primary" disabled={busy||!valid} onClick={advance}>{busy?'Attendi…':'Continua'}</button>
  </div>;
}
