import React from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, GraduationCap, Menu, MonitorPlay, Sparkles, Users, X, Lightbulb, BriefcaseBusiness, Clock3, Code2, Workflow, Target, Laptop, MapPin, CheckCircle2, CalendarDays } from 'lucide-react';
import { withUtm } from '../config/app';

function PrivacyPage() {
  React.useEffect(() => {
    document.title = 'Informativa privacy | Evocons Academy';
  }, []);
  return <main className="interest-page" id="home">
    <section className="interest-intro"><div className="container">
      <a className="course-back" href={withUtm('/#')}>← Torna ad Academy</a>
      <p className="eyebrow">EVOCONS ACADEMY · PRIVACY</p>
      <h1>Informativa sul <span>trattamento dei dati.</span></h1>
      <p>Informativa ai sensi dell’articolo 13 del Regolamento (UE) 2016/679 (GDPR).</p>
    </div></section>
    <section className="interest-section"><div className="container">
      <article className="interest-panel" style={{maxWidth: 920, margin: '0 auto', lineHeight: 1.8}}>
        <p><strong>Versione 1.2 — 2 novembre 2026.</strong></p>
        <p>Questa informativa descrive il trattamento dei dati personali effettuato durante la navigazione sul sito Evocons Academy e attraverso il modulo di manifestazione d’interesse per i percorsi formativi.</p>
        <h2>1. Titolare del trattamento</h2>
        <p>EvoCons S.r.l.s.<br/>Via Nicola Coviello, 32 — 00165 Roma (RM)<br/>Email: <a href="mailto:privacy@evocons.it">privacy@evocons.it</a></p>
        <h2>2. Dati trattati</h2>
        <p>
          In relazione alle manifestazioni d'interesse sono trattati
          nome, cognome, indirizzo email, numero telefonico (facoltativo),
          corso di interesse, scelte relative alle comunicazioni
          promozionali e informazioni tecniche necessarie a documentare
          la richiesta e le scelte espresse. Durante la navigazione
          possono inoltre essere trattati dati tecnici relativi alle
          richieste HTTP, al dispositivo, al browser e alle prestazioni
          delle pagine, secondo quanto descritto nella sezione 10.
        </p>

        <p>
          Quando un visitatore accede al sito attraverso collegamenti
          contenenti parametri di campagna (UTM), EvoCons può raccogliere
          informazioni relative alla provenienza dichiarata del
          collegamento, al canale e alla campagna di riferimento.
          Tali parametri possono essere mantenuti negli indirizzi
          dei collegamenti interni durante la navigazione e associati
          alla manifestazione d'interesse eventualmente inviata.
          Non vengono memorizzati tramite sessionStorage o localStorage
          per questa finalità.
        </p>
        <h2>3. Finalità e basi giuridiche</h2>
        <p><strong>Richieste sui corsi.</strong> Utilizziamo i dati per rispondere alle manifestazioni d’interesse e fornire informazioni sui programmi, sulle modalità di partecipazione e sulle prossime date. La base giuridica è l’articolo 6, paragrafo 1, lettera b), GDPR (misure precontrattuali richieste dall’interessato).</p>
        <p><strong>Newsletter e comunicazioni promozionali.</strong> Solo con consenso facoltativo potremo inviare aggiornamenti sui corsi, workshop, eventi e iniziative EvoCons. La base giuridica è l’articolo 6, paragrafo 1, lettera a), GDPR. Il consenso può essere revocato in qualsiasi momento scrivendo a <a href="mailto:privacy@evocons.it">privacy@evocons.it</a>, senza pregiudicare la liceità del trattamento precedente alla revoca.</p>
        <p>
  <strong>Analisi dell'efficacia delle iniziative di comunicazione.</strong>
  {' '}Le informazioni relative alla provenienza delle
  manifestazioni d'interesse sono utilizzate per valutare
  l'efficacia delle campagne informative e promozionali,
  comprendere quali iniziative generano richieste sui
  percorsi formativi e migliorare la comunicazione di EvoCons.
  Il trattamento è oggetto di valutazione sulla base del
  legittimo interesse del titolare, ai sensi dell'articolo 6,
  paragrafo 1, lettera f), GDPR, tenendo conto della necessità
  e proporzionalità rispetto alle finalità perseguite.
</p>
        <h2>4. Conferimento dei dati</h2>
        <p>Nome, cognome e indirizzo email sono necessari per gestire la richiesta. Il telefono e il consenso marketing sono facoltativi. La mancata prestazione del consenso marketing non impedisce l’invio della richiesta.</p>
        <h2>5. Modalità e destinatari</h2>
        <p>I dati sono trattati mediante strumenti informatici, con misure tecniche e organizzative appropriate. Le informazioni raccolte dal modulo sono archiviate su infrastruttura Hetzner presso il datacenter di Falkenstein, Germania. I dati delle manifestazioni d’interesse sono gestiti esclusivamente da EvoCons e non sono comunicati ad Accademia Informatica o ad altri partner formativi per loro autonome finalità commerciali. Possono accedervi persone autorizzate da EvoCons e fornitori tecnici che trattano dati per suo conto, nei limiti delle rispettive funzioni e degli accordi applicabili.</p>
        <h2>6. Conservazione</h2>
        <p>Le manifestazioni d’interesse sono conservate per un massimo di 24 mesi dall’ultima interazione significativa, salvo l’instaurazione di un rapporto contrattuale o ulteriori obblighi applicabili. EvoCons effettua controlli periodici sulle scadenze di conservazione. Alla scadenza del periodo applicabile, i dati sono sottoposti a cancellazione, salvo che sussista un diverso obbligo di conservazione. Per finalità promozionali, il periodo previsto è di massimo 24 mesi dalla raccolta del consenso, salvo revoca anticipata. Le evidenze delle scelte privacy sono conservate per il periodo strettamente necessario a documentare il rispetto degli obblighi e tutelare i diritti coinvolti.</p>
        <h2>7. Diritti degli interessati</h2>
        <p>Nei casi previsti dal GDPR, puoi richiedere accesso, rettifica, cancellazione, limitazione, portabilità e opposizione al trattamento. Puoi inoltre revocare il consenso promozionale. Per esercitare i tuoi diritti scrivi a <a href="mailto:privacy@evocons.it">privacy@evocons.it</a>. Puoi proporre reclamo al <a href="https://www.garanteprivacy.it/" target="_blank" rel="noopener noreferrer">Garante per la protezione dei dati personali</a>.</p>
        <h2>8. Decisioni automatizzate</h2>
        <p>Le manifestazioni d’interesse non sono utilizzate per assumere decisioni basate unicamente su trattamenti automatizzati che producano effetti giuridici o analogamente significativi.</p>
        <h2>9. Aggiornamenti</h2>
        <p>Questa informativa potrà essere aggiornata per riflettere modifiche normative, organizzative o tecnologiche.</p>
        <h2>10. Dati di navigazione e analisi delle prestazioni</h2>
        <p>Durante la consultazione del sito academy.evocons.it, i sistemi informatici utilizzati per erogare il servizio possono trattare informazioni tecniche necessarie al funzionamento, alla sicurezza e alla gestione delle richieste, quali indirizzi IP, date e orari di accesso, risorse richieste e informazioni relative al browser.</p>
        <p>Per monitorare l'utilizzo del sito e migliorarne le prestazioni, EvoCons utilizza Cloudflare Web Analytics, un servizio di analisi statistica delle visite e delle prestazioni delle pagine web.</p>
        <p>Secondo la documentazione del fornitore, Cloudflare Web Analytics non utilizza cookie, Local Storage o tecniche di fingerprinting per identificare individualmente i visitatori. Il servizio raccoglie metriche relative alle visualizzazioni e alle prestazioni delle pagine.</p>
        <p>Cloudflare dichiara di conservare i dati dei beacon non campionati per sette giorni e di mantenere successivamente dati aggregati e campionati. Le statistiche sono consultabili nella dashboard per un periodo fino a sei mesi.</p>
        <p>Il trattamento dei dati tecnici necessari all'erogazione e alla sicurezza del sito si fonda, nei limiti applicabili, sul legittimo interesse del titolare a garantire il funzionamento e la protezione del servizio, ai sensi dell'articolo 6, paragrafo 1, lettera f), GDPR. Le finalità statistiche sono oggetto di distinta valutazione di necessità e proporzionalità.</p>
        <p>Cloudflare opera attraverso un'infrastruttura internazionale. Eventuali trasferimenti di dati personali verso Paesi esterni allo Spazio Economico Europeo sono soggetti alle garanzie applicabili secondo la documentazione contrattuale del fornitore.</p>
        <p>I caratteri tipografici del sito sono ospitati direttamente sull'infrastruttura Evocons Academy e non richiedono collegamenti ai server Google Fonts.</p>
              </article>
            </div></section>
          </main>;
        }

export default PrivacyPage;
