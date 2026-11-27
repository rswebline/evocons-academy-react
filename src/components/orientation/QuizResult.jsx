import React from 'react';
import {withUtm} from '../../config/app';
const descriptions = {
 LIT:'Comprendere le tecnologie digitali e utilizzare l’AI in modo consapevole e responsabile.',
 PRD:'Migliorare qualità, autonomia ed efficienza nelle attività quotidiane.',
 AUT:'Progettare workflow e automatizzare attività ripetitive.',
 DAT:'Trasformare dati e informazioni in analisi, report e supporto alle decisioni.',
 COM:'Creare contenuti e migliorare la comunicazione digitale.',
 DEV:'Sviluppare applicazioni e integrare soluzioni tecnologiche.',
 BTR:'Innovare processi organizzativi e modelli di business.',
 CYB:'Proteggere dati, sistemi e attività e rafforzare la resilienza digitale.'
};
const warningLabels={experience_gap:'Il percorso potrebbe richiedere esperienza aggiuntiva.',technical_mismatch:'Il livello tecnico differisce dalla preferenza indicata.',commitment_mismatch:'L’impegno formativo differisce dalla preferenza indicata.'};
const dimensions={technical:'Livello tecnico',commitment:'Impegno formativo',experience:'Esperienza',prerequisites:'Prerequisiti'};
const categories={'micro-course':'Base',specialization:'Professional',base:'Base',professional:'Professional',master:'Master'};
function warningText(w){return typeof w==='string'?w:w.message||w.description||warningLabels[w.code]||'Verifica questo requisito con Academy.';}
export default function QuizResult({result,back,restart}) {
 const profiles=result.primary_profiles||[], courses=result.recommendations||[], unmet=result.unmet_preferences||[];
 return <section aria-labelledby="orientation-result-title" className="orientation-result">
  <p className="orientation-kicker">ORIENTAMENTO COMPLETATO</p>
  <h2 id="orientation-result-title">Il tuo percorso formativo</h2>
  <p>Questi suggerimenti riflettono le tue risposte: non costituiscono una valutazione delle competenze possedute.</p>
  <h3>{profiles.length>1?'Profili prevalenti':'Profilo prevalente'}</h3>
  {profiles.length?profiles.map(p=><article className="orientation-profile" key={p.code}><h4>{p.title||p.name||p.code}</h4><p>{p.result_description||p.description||descriptions[p.code]}</p></article>):<p>Non emerge ancora un profilo prevalente. Puoi rivedere le risposte per definire meglio i tuoi obiettivi.</p>}
  <h3>Percorsi consigliati</h3>
  {courses.length?<div className="orientation-courses">{courses.map((c,i)=><article className="orientation-course" key={c.id||c.slug}>
   <div className="orientation-course-meta">{i===0?'Prima proposta':'Alternativa'}{categories[c.category]?` · ${categories[c.category]}`:''}{c.duration_hours?` · ${c.duration_hours} ore`:''}</div>
   <h4>{c.title}</h4>
   {Number.isFinite(c.matching_score)&&<p className="orientation-match">Indice di compatibilità: <strong>{Math.round(c.matching_score)}/100</strong></p>}
   {c.components&&<p>Affinità con i tuoi obiettivi: {Math.round(c.components.profile)}/100. La compatibilità complessiva considera anche esperienza, livello tecnico e impegno formativo.</p>}
   {c.conditional&&<p className="orientation-warning">Percorso da valutare con Academy prima dell’iscrizione.</p>}
   {!!c.warnings?.length&&<ul className="orientation-warnings">{c.warnings.map((w,j)=><li key={j}>{warningText(w)}</li>)}</ul>}
   {c.slug&&<a className="button button-outline" href={withUtm(`/corsi/${encodeURIComponent(c.slug)}/`)}>Scopri il corso</a>}
  </article>)}</div>:<p>Non abbiamo individuato un percorso sufficientemente coerente con le risposte fornite.</p>}
  {!!unmet.length&&<div className="orientation-warning"><h3>Preferenze non pienamente soddisfatte</h3><ul>{unmet.map((w,i)=><li key={i}>{dimensions[w.dimension]||'Preferenza'}: {w.message||w.description||'nessuna delle proposte soddisfa pienamente questa preferenza.'}</li>)}</ul></div>}
  <div className="orientation-navigation"><button className="button button-outline" onClick={back}>Indietro</button><button className="button button-primary" onClick={restart}>Ricomincia</button></div>
 </section>;
}
