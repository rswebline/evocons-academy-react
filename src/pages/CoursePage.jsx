import React from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, GraduationCap, Menu, MonitorPlay, Sparkles, Users, X, Lightbulb, BriefcaseBusiness, Clock3, Code2, Workflow, Target, Laptop, MapPin, CheckCircle2, CalendarDays } from 'lucide-react';
import { courseSlug, interestUrl, contactUrl, API_BASE_URL, COURSE_CATEGORY_LABELS, withUtm } from '../config/app';
import { formatEditionDate, formatEditionTime, fetchEditions } from '../services/editions';

const modules = [
  {title:'Comprendere l’AI generativa',description:'Che cos’è, come funziona, possibilità e limiti. Panoramica degli strumenti e prime interazioni.',practice:'Confrontare le risposte a una richiesta professionale.'},
  {title:'Prompting e dialogo efficace',description:'Obiettivi, contesto, vincoli, formato, iterazione e verifica dei risultati.',practice:'Trasformare una richiesta generica in un prompt riutilizzabile.'},
  {title:'Scrittura e comunicazione',description:'Email, report, sintesi, presentazioni e adattamento del tono e del linguaggio.',practice:'Da appunti disorganizzati a un documento professionale.'},
  {title:'Ricerca, documenti e informazioni',description:'Ricerca assistita, confronto delle fonti, sintesi e analisi elementare dei dati.',practice:'Analizzare un documento e produrre una sintesi verificabile.'},
  {title:'Applicazione pratica e uso responsabile',description:'Riservatezza, dati personali, errori, controllo umano e buone pratiche.',practice:'Applicare l’AI a un’attività reale, documentando le verifiche.'}
];

const fallbackOutcomes = [
  { id: 'fallback-1', title: 'Prompt più efficaci', description: 'Richieste chiare, risposte migliori.' },
  { id: 'fallback-2', title: 'Documenti professionali', description: 'Testi, sintesi e comunicazioni.' },
  { id: 'fallback-3', title: 'Risultati verificati', description: 'Controllo delle fonti e attenzione ai dati.' }
];

function EditorialTitle({ value, fallback }) {
  const text = (typeof value === 'string' && value.trim()) || fallback;
  const split = text.match(/^(.+?\.)(?:\s+)(.+)$/s);
  return split ? <>{split[1]}<br/><span>{split[2]}</span></> : <>{text}</>;
}

function CourseHowItWorks({ hoursLabel }) {
  const items = [
    { Icon: MonitorPlay, title: 'Lezioni online in diretta', description: 'Partecipa dal vivo, poni domande e confrontati con il docente e gli altri partecipanti.' },
    { Icon: Clock3, title: 'Calendario programmato', description: `Il percorso prevede ${hoursLabel} di formazione. Giorni e orari saranno comunicati prima dell’avvio.` },
    { Icon: CheckCircle2, title: 'Attività pratiche', description: 'Esercitazioni e applicazioni guidate per trasferire quanto appreso nel lavoro.' },
    { Icon: BookOpen, title: 'Materiali e recupero', description: 'Le eventuali registrazioni delle dirette potranno essere rese disponibili agli iscritti, secondo le condizioni comunicate per ciascuna edizione.' }
  ];
  return <section className="section course-how" aria-labelledby="course-how-title"><div className="container">
    <div className="course-how-heading"><p className="eyebrow">LA TUA ESPERIENZA FORMATIVA</p><h2 id="course-how-title">Come funziona il corso?</h2><p>Un percorso online, guidato e interattivo: la partecipazione in diretta è al centro dell’esperienza.</p></div>
    <div className="course-how-grid">{items.map(({ Icon, title, description }) => <article className="course-how-item" key={title}><div className="course-how-icon"><Icon size={25} aria-hidden="true"/></div><h3>{title}</h3><p>{description}</p></article>)}</div>
  </div></section>;
}

function CoursePage(){
  const isPilotCourse = courseSlug === 'ai-per-il-lavoro';
  const [courseModules, setCourseModules] = React.useState(isPilotCourse ? modules : []);
  const [courseDetails, setCourseDetails] = React.useState(null);
  const [detailStatus, setDetailStatus] = React.useState('loading');
  const [modulesStatus, setModulesStatus] = React.useState('loading');
  const [courseEditions, setCourseEditions] = React.useState([]);
  const [editionsStatus, setEditionsStatus] = React.useState('loading');
  const totalHours = Number(courseDetails?.duration_hours);
  const hoursLabel = Number.isFinite(totalHours) && totalHours > 0 ? `${totalHours.toLocaleString('it-IT')} ore` : 'Durata da definire';
  const moduleCount = courseModules.length;
  const isBaseCourse = ['base', 'micro-course'].includes(courseDetails?.category);
  const detailCategoryLabel = COURSE_CATEGORY_LABELS[courseDetails?.category] || 'EVOCONS ACADEMY';

  React.useEffect(() => {
    const controller = new AbortController();
    async function loadDetails() {
      try {
        const response = await fetch(`${API_BASE_URL}/academy/courses/${encodeURIComponent(courseSlug)}/details`, { signal: controller.signal });
        if (!response.ok) throw new Error('Dettaglio corso non disponibile');
        const payload = await response.json();
        if (!payload.data || typeof payload.data !== 'object') throw new Error('Formato dettaglio non valido');
        if (payload.data.slug !== courseSlug) throw new Error('Slug del corso non coerente');
        setCourseDetails(payload.data);
        setDetailStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.warn('Dettaglio Directus non disponibile.', error);
          setDetailStatus('error');
        }
      }
    }
    loadDetails();
    return () => controller.abort();
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    async function loadModules() {
      try {
        const response = await fetch(`${API_BASE_URL}/academy/courses/${encodeURIComponent(courseSlug)}/modules`, { signal: controller.signal });
        if (!response.ok) throw new Error('Programma non disponibile');
        const payload = await response.json();
        if (!Array.isArray(payload.data) || payload.data.length === 0) throw new Error('Programma vuoto');
        const validModules = payload.data.filter(item => item && typeof item.title === 'string');
        if (validModules.length === 0) throw new Error('Moduli non validi');
        setCourseModules(validModules);
        setModulesStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.warn('Programma Directus non disponibile.', error);
          setModulesStatus('error');
        }
      }
    }
    loadModules();
    return () => controller.abort();
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    fetchEditions(courseSlug, controller.signal)
      .then(items => { if (!controller.signal.aborted) { setCourseEditions(items); setEditionsStatus('ready'); } })
      .catch(error => { if (!controller.signal.aborted) { console.warn('Edizioni non disponibili.', error); setEditionsStatus('error'); } });
    return () => controller.abort();
  }, []);

  React.useEffect(() => {
    if (detailStatus !== 'ready' || !courseDetails) return;
    const title = `${courseDetails.title} | Evocons Academy`;
    const description = courseDetails.hero_description || courseDetails.description || `Scopri il corso ${courseDetails.title} di Evocons Academy.`;
    const canonical = `https://academy.evocons.it/corsi/${encodeURIComponent(courseSlug)}/`;
    document.title = title;
    const update = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    update('meta[name="description"]', 'content', description);
    update('link[rel="canonical"]', 'href', canonical);
    update('meta[property="og:title"]', 'content', title);
    update('meta[property="og:description"]', 'content', description);
    update('meta[property="og:url"]', 'content', canonical);
    update('meta[name="twitter:title"]', 'content', title);
    update('meta[name="twitter:description"]', 'content', description);
  }, [courseDetails, detailStatus]);

  if (detailStatus === 'loading') {
    return <main className="course-page"><section className="section"><div className="container"><p role="status">Caricamento del corso…</p></div></section></main>;
  }
  if (detailStatus === 'error') {
    return <main className="course-page"><section className="section"><div className="container"><h1>Corso non disponibile</h1><p>Non è possibile visualizzare questo corso. Torna al catalogo per consultare i percorsi pubblicati.</p><a href={withUtm('/#corsi')} className="button button-primary">Torna ai corsi <ArrowRight size={17}/></a></div></section></main>;
  }
  return <main className="course-page" id="home">
    <section className="course-hero"><div className="container course-hero-grid">
      <div><a className="course-back" href={withUtm('/#corsi')}>← Tutti i percorsi</a><p className="eyebrow">{detailCategoryLabel} · {courseDetails.title.toLocaleUpperCase("it-IT")}</p>
        <h1><EditorialTitle value={courseDetails?.hero_title} fallback={courseDetails.title}/></h1>
        <p className="course-hero-lead">{courseDetails?.hero_description || courseDetails.description}</p>
        <div className="course-facts"><span><MonitorPlay size={18}/> Online live</span><span><Clock3 size={18}/> {hoursLabel}{moduleCount ? ` · ${moduleCount} moduli` : ""}</span>{isPilotCourse && <span><Users size={18}/> Nessun prerequisito tecnico</span>}</div>
        <div className="course-hero-actions"><a href="#calendario" className="button button-primary">Prossime edizioni <ArrowRight size={17}/></a><a href={interestUrl} className="button button-outline">Manifesta interesse <ArrowUpRight size={17}/></a></div>
        <p className="course-note">Le prossime edizioni e le relative quote sono riportate nella sezione Calendario e quote.</p>
      </div>
      <div className="course-hero-image"><img 
      src={
  courseDetails?.hero_image
    ? `${API_BASE_URL}/academy/courses/${encodeURIComponent(courseDetails.slug)}/hero-image`
    : "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85"
} alt="Professionisti che collaborano e apprendono insieme"/><div className="course-image-label"
      ><Sparkles size={20}/> Impara facendo, in diretta.</div></div>
    </div></section>
    <section className="course-metrics" aria-label="Il corso in sintesi"><div className="container course-metrics-grid"><div><Clock3/><strong>{Number.isFinite(totalHours) && totalHours > 0 ? totalHours.toLocaleString("it-IT") : "—"} <small>ore</small></strong><span>Formazione online in diretta</span></div><div><MonitorPlay/><strong>{moduleCount || "—"} <small>moduli</small></strong><span>Programma del corso</span></div><div><Users/><strong>Live <small>con il docente</small></strong><span>Domande, confronto ed esercitazioni</span></div></div></section>
    <section className="section course-overview"><div className="container course-overview-grid"><div className="course-overview-copy"><p className="eyebrow">IL PUNTO DI PARTENZA</p><h2><EditorialTitle value={courseDetails?.overview_title} fallback={courseDetails.title}/></h2><p>{courseDetails?.overview_text || courseDetails.description}</p>{isPilotCourse && <div className="course-benefits"><div><CheckCircle2/><span>Nessun prerequisito tecnico</span></div><div><CheckCircle2/><span>Esercitazioni guidate su attività reali</span></div><div><CheckCircle2/><span>Confronto diretto con il docente</span></div></div>}</div><div className="course-overview-visual"><img src={
  courseDetails?.overview_image
    ? `${API_BASE_URL}/academy/courses/${encodeURIComponent(courseDetails.slug)}/overview-image`
    : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=85"
} alt="Persone che collaborano utilizzando strumenti digitali" loading="lazy"/><div className="course-overview-bubble"><MonitorPlay size={20}/> Non videolezioni registrate: partecipi in diretta.</div></div></div></section>
    <section id="calendario" className="section course-editions" aria-labelledby="course-editions-title"><div className="container">
      <div className="course-editions-heading"><p className="eyebrow">CALENDARIO E QUOTE</p><h2 id="course-editions-title">Le prossime edizioni.</h2><p>Confronta le date e scegli il periodo più adatto alle tue esigenze.</p></div>
      {editionsStatus === 'loading' && <p role="status">Caricamento del calendario…</p>}
      {editionsStatus === 'error' && <p role="alert">Il calendario non è momentaneamente disponibile. Puoi comunque manifestare interesse per il corso.</p>}
      {editionsStatus === 'ready' && courseEditions.length === 0 && <p>Non ci sono edizioni programmate al momento. Puoi manifestare interesse per ricevere informazioni sulle prossime partenze.</p>}
      {editionsStatus === 'ready' && courseEditions.length > 0 && <div className="course-editions-grid">{courseEditions.map(edition => {
        const start = formatEditionDate(edition.start_date);
        const end = formatEditionDate(edition.end_date);
        const timeFrom = formatEditionTime(edition.start_time);
        const timeTo = formatEditionTime(edition.end_time);
        const price = Number(edition.list_price);
        const hasPrice = edition.list_price !== null && edition.list_price !== undefined && edition.list_price !== '' && Number.isFinite(price);
        return <article className="course-edition-card" key={edition.id || edition.edition_code}>
          <div className="course-edition-top"><h3>{start}{end ? ` – ${end}` : ''}</h3><span className={`course-edition-status ${edition.status === 'confirmed' ? 'is-confirmed' : ''}`}>{edition.status === 'confirmed' ? 'Partenza confermata' : 'Programmata'}</span></div>
          <div className="course-edition-facts">
            {edition.calendar_name && <span><CalendarDays size={19}/>{edition.calendar_name}{timeFrom && timeTo ? ` · ${timeFrom}–${timeTo}` : ''}</span>}
            {edition.delivery_mode && <span><MonitorPlay size={19}/>{({ online_live: 'Online in diretta', in_person: 'In presenza', hybrid: 'Modalità ibrida' })[edition.delivery_mode] || edition.delivery_mode}</span>}
            {edition.frequency === 'weekly' && <span><Clock3 size={19}/>Frequenza settimanale</span>}
          </div>
          <div className="course-edition-bottom"><div><small>Quota di partecipazione</small><strong>{hasPrice ? new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(price) : 'Da definire'}</strong></div><a href={withUtm(`/manifestazione-interesse?corso=${encodeURIComponent(courseSlug)}&edizione=${encodeURIComponent(edition.id)}`)} className="button button-primary">Manifesta interesse <ArrowRight size={17}/></a></div>
        </article>;
      })}</div>}
      <p className="course-editions-note">La manifestazione d'interesse non costituisce iscrizione né prenotazione del posto. Le edizioni programmate sono soggette a conferma.</p>
    </div></section>
    <section id="programma" className="section course-program"><div className="container">
      <div className="course-section-heading"><div><p className="eyebrow">IL PROGRAMMA</p><h2>{isPilotCourse ? <>Cinque incontri.<br/><span>Cinque passi avanti.</span></> : <>Il programma.<br/><span>Le competenze da sviluppare.</span></>}</h2></div><p>{isPilotCourse ? "10 ore in diretta. Ogni incontro parte da un'esigenza concreta e termina con un'esercitazione." : `Scopri i contenuti e le attività previste nel percorso${moduleCount ? `, articolato in ${moduleCount} moduli` : ''}.`}</p></div>
      <div className="course-module-editorial">{modulesStatus === "error" && !isPilotCourse && <p role="alert">Il programma non è momentaneamente disponibile.</p>}{courseModules.map((m,i)=><article className="course-module-feature" key={m.id || m.title}>
        <div className="course-module-visual">
  <img
    src={
      m.image && m.id
        ? `${API_BASE_URL}/academy/courses/${encodeURIComponent(courseSlug)}/modules/${encodeURIComponent(m.id)}/image`
        : [
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1100&q=85",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=85",
            "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1100&q=85",
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1100&q=85",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=85"
          ][i % 5]
    }
    alt={[
      "Persone durante una formazione interattiva",
      "Collaborazione e utilizzo di strumenti digitali",
      "Scrittura e preparazione di documenti",
      "Ricerca e analisi di informazioni",
      "Confronto e verifica dei risultati in gruppo"
    ][i % 5]}
    loading="lazy"
  />
</div>
        <div className="course-module-copy"><div className="course-module-number">INCONTRO {String(i+1).padStart(2,'0')} <span>{Number(m.duration_hours ?? 2).toLocaleString('it-IT', { maximumFractionDigits: 2 })} ORE · ONLINE LIVE</span></div><h3>{m.title}</h3><p>{m.description}</p><div className="course-module-activity"><strong><CheckCircle2 size={21}/> LO METTI IN PRATICA</strong><span>{m.practice}</span></div></div>
      </article>)}</div>
      <div className="course-program-cta"><div><strong>Vuoi capire se è il percorso giusto?</strong><span>Parliamo dei tuoi obiettivi, senza impegno.</span></div><a className="button button-primary" href={interestUrl}>Manifesta interesse <ArrowRight size={17}/></a></div>
    </div></section>
    <CourseHowItWorks hoursLabel={hoursLabel}/>
    <section className="section course-outcomes"><div className="container">
      <div className="course-outcomes-editorial"><div className="course-outcomes-image"><img src={
  courseDetails?.outcomes_image
    ? `${API_BASE_URL}/academy/courses/${encodeURIComponent(courseDetails.slug)}/outcomes-image`
    : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85"
} alt="Schermata di lavoro con analisi e documenti" loading="lazy"/></div>
      <div className="course-outcomes-copy"><p className="eyebrow">COMPETENZE IN USCITA</p><h2><EditorialTitle value={courseDetails?.outcomes_title} fallback={courseDetails.title}/></h2><p>{courseDetails?.outcomes_text || courseDetails.description}</p><div className="course-outcome-points">{(Array.isArray(courseDetails?.outcomes) && courseDetails.outcomes.length > 0 ? courseDetails.outcomes : (isPilotCourse ? fallbackOutcomes : [])).map((outcome, index) => { const Icon = [Sparkles, BookOpen, CheckCircle2][index % 3]; return <div key={outcome.id || index}><Icon/><strong>{outcome.title}</strong><span>{outcome.description}</span></div>; })}</div></div></div>
    </div></section>
    {isBaseCourse && <section className="section course-next"><div className="container course-next-grid"><div><p className="eyebrow">PROSEGUIRE, SENZA VINCOLI</p><h2>Un corso Base oggi.<br/><span>Nuove competenze domani.</span></h2><p><strong>La formazione si adatta alla tua vita.</strong><br/>Lezioni guidate ed esercitazioni, con un programma e una durata definiti per ciascun corso. Puoi approfondire e applicare quanto appreso anche tra un incontro e il successivo.</p><p><strong>Un piccolo investimento, nuove possibilità.</strong><br/>Ogni corso Base è un’esperienza formativa autonoma, con obiettivi concreti e un impegno definito. Puoi acquisire competenze specifiche, scoprire nuovi interessi e capire quali ambiti desideri approfondire.</p><p>Puoi fermarti al primo risultato oppure proseguire con un corso Professional e, successivamente, un Master.</p><a href={interestUrl} className="course-text-link">Manifesta interesse per il percorso <ArrowRight size={17}/></a></div><div className="course-path" aria-label="Vantaggi dei corsi Base"><div><span className="path-number">01</span><div><strong>Impara senza fermarti</strong><small>Un programma accessibile e orientato alla pratica</small></div></div><div><span className="path-number">02</span><div><strong>Sperimenta tra gli incontri</strong><small>Tempo per approfondire e mettere in pratica</small></div></div><div><span className="path-number">03</span><div><strong>Scopri la tua direzione</strong><small>Nuove competenze, interessi e opportunità</small></div></div></div></div></section>}
    <section className="course-personal-section"><div className="container course-personal"><div><p className="eyebrow">FORMAZIONE SU MISURA</p><h2>Hai esigenze formative diverse?</h2><p>Un programma per il tuo team, un approfondimento specifico o un percorso personalizzato? Raccontaci cosa vuoi ottenere.</p></div><a href={contactUrl} className="button final-cta-button">Richiedi un percorso personalizzato <ArrowUpRight size={17}/></a></div></section>
  </main>;
}

export default CoursePage;
