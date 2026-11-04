import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, GraduationCap, Menu, MonitorPlay, Sparkles, Users, X, Lightbulb, BriefcaseBusiness, Clock3, Code2, Workflow, Target, Laptop, MapPin, CheckCircle2, CalendarDays } from 'lucide-react';
import './styles.css';

const pathname = window.location.pathname.replace(/\/$/, '') || '/';
const courseSlug = pathname.match(/^\/corsi\/([a-z0-9-]+)$/)?.[1] ?? null;
const isCoursePage = courseSlug !== null;
const isInterestPage = pathname === '/manifestazione-interesse';
const isPrivacyPage = pathname === '/privacy';
const isInnerPage = isCoursePage || isInterestPage || isPrivacyPage;
const interestUrl = courseSlug ? `/manifestazione-interesse?corso=${encodeURIComponent(courseSlug)}` : '/#corsi';
const contactUrl = 'https://www.evocons.it/contatti';

function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href={isInnerPage ? "/" : "#home"} className="brand" aria-label="Evocons Academy - homepage">
          <span className="brand-mark" aria-hidden="true">e</span><span className="brand-name">evocons</span><span className="brand-divider"/><span className="brand-academy">academy</span>
        </a>
        <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navigazione principale">
          <a href={isInnerPage ? "/#corsi" : "#corsi"} onClick={() => setOpen(false)}>Corsi</a>
          <a href={isInnerPage ? "/#perche-academy" : "#perche-academy"} onClick={() => setOpen(false)}>Perché Academy</a>
          <a href={isInnerPage ? "/#destinatari" : "#destinatari"} onClick={() => setOpen(false)}>A chi si rivolge</a>
          <a href={isInnerPage ? "/#metodo" : "#metodo"} onClick={() => setOpen(false)}>Come funziona</a>
        </nav>
        <a className="button button-primary header-cta" href={isInnerPage ? "/#corsi" : "#corsi"}>Scopri i percorsi <ArrowRight size={17}/></a>
        <button className="mobile-menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Chiudi menu' : 'Apri menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <main id="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">FORMAZIONE TECH PER IL TUO FUTURO</p>
            <h1 id="hero-title">Competenze reali<br/>per un mondo<br/><span>che cambia.</span></h1>
            <p className="hero-description">Evocons Academy è lo spazio di formazione dedicato a professionisti, studenti e appassionati che vogliono acquisire competenze concrete nell'intelligenza artificiale e nelle tecnologie digitali.</p>
            <div className="hero-actions">
              <a href="#corsi" className="button button-primary">Scopri i corsi <ArrowRight size={18}/></a>
              <a href="#metodo" className="button button-outline">Come funziona <ArrowUpRight size={17}/></a>
            </div>
            <div className="hero-highlights" aria-label="Caratteristiche della formazione">
              <div><MonitorPlay size={22}/><span>Lezioni online<br/>in diretta</span></div>
              <div><Users size={22}/><span>Docenti<br/>esperti</span></div>
              <div><ChartNoAxesCombined size={22}/><span>Approccio<br/>pratico</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="Illustrazione della formazione digitale">
            <div className="visual-glow"/>
            <div className="visual-arch"/>
            <div className="visual-photo">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1100&q=85" alt="Professionista sorridente in un ambiente di lavoro" />
            </div>
            <div className="floating-card floating-card-top"><span className="floating-icon"><Sparkles size={22}/></span><span>Impara oggi.<br/>Cresci domani.</span></div>
            <div className="floating-card floating-card-left"><BookOpen size={27}/></div>
            <div className="floating-card floating-card-bottom"><span className="floating-icon"><GraduationCap size={22}/></span><span>Competenze<br/>da applicare.</span></div>
            <p className="visual-note">Trasforma le tue competenze<br/>in nuove opportunità <span>↗</span></p>
          </div>
        </div>
      </section>
      <WhyAcademy/>
      <Courses/>
      <Audience/>
      <Method/>
      <FinalCta/>
    </main>
  );
}



const courses = [
  {slug:'ai-per-il-lavoro',kind:'MICRO-CORSI',title:'AI per il lavoro',description:'Micro-corsi pratici, acquistabili singolarmente o come percorso completo. Inizia dagli strumenti e dalla produttività.',duration:'10 ore · primo modulo',format:'Online in diretta',icon:Lightbulb,theme:'work',label:'Percorso introduttivo',image:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=960&q=85',imageAlt:'Spazio di lavoro contemporaneo per sviluppare competenze digitali'},
  {slug:'ai-automation-specialist',kind:'SPECIALIZZAZIONE',title:'AI Automation Specialist',description:'Dagli strumenti AI ai workflow: scopri come progettare automazioni utili per attività e processi reali.',duration:'Durata da definire',format:'Live online · In presenza',icon:Workflow,theme:'automation',label:'Percorso specialistico',image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=960&q=85',imageAlt:'Dashboard di analisi dati e processi digitali'},
  {slug:'ai-engineering',kind:'MASTER',title:'AI Engineering',description:'Progetta applicazioni intelligenti con LLM, RAG e agenti AI, partendo dalle competenze di sviluppo software.',duration:'5–6 mesi · ipotesi',format:'Con partner formativo',icon:Code2,theme:'engineering',label:'Master in definizione',image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=960&q=85',imageAlt:'Schermo con codice software durante lo sviluppo di applicazioni'}
];

function WhyAcademy(){
  return <section id="perche-academy" className="section why-section" aria-labelledby="why-title"><div className="container why-grid">
    <div className="section-intro"><p className="eyebrow">PERCHÉ EVOCONS ACADEMY</p><h2 id="why-title">Più di un corso.<br/>Un percorso verso <span>nuove opportunità.</span></h2><p>Imparare una tecnologia è utile. Saperla applicare fa la differenza. Per questo uniamo esperienza professionale, didattica e attività pratiche.</p></div>
    <div className="benefits-grid">
      <article className="benefit-card"><GraduationCap/><h3>Competenze spendibili</h3><p>Contenuti collegati a situazioni concrete.</p></article>
      <article className="benefit-card"><Users/><h3>Docenti professionisti</h3><p>Formazione guidata da chi lavora sul campo.</p></article>
      <article className="benefit-card"><MonitorPlay/><h3>Flessibilità</h3><p>Lezioni online in diretta con il docente.</p></article>
      <article className="benefit-card"><Target/><h3>Apprendimento pratico</h3><p>Esercitazioni, casi d'uso e progetti applicativi.</p></article>
    </div>
  </div></section>
}

// Le date MySQL sono restituite come ISO UTC: formattarle in UTC evita slittamenti di giorno.
function formatEditionDate(value, options = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('it-IT', { ...options, timeZone: 'UTC' }).format(date);
}

function formatEditionTime(value) {
  return typeof value === 'string' && /^\d{2}:\d{2}/.test(value) ? value.slice(0, 5) : '';
}

function publicEditions(items) {
  const today = new Date().toISOString().slice(0, 10);
  return (Array.isArray(items) ? items : [])
    .filter(item => item && ['scheduled', 'confirmed'].includes(item.status)
      && typeof item.start_date === 'string' && item.start_date.slice(0, 10) >= today)
    .sort((a, b) => a.start_date.localeCompare(b.start_date));
}

async function fetchEditions(slug, signal) {
  const response = await fetch(`${API_BASE_URL}/academy/courses/${encodeURIComponent(slug)}/editions`, { signal });
  if (!response.ok) throw new Error('Edizioni non disponibili');
  const payload = await response.json();
  if (!Array.isArray(payload.data)) throw new Error('Formato edizioni non valido');
  return publicEditions(payload.data);
}

function Courses(){
  const [publishedCourses, setPublishedCourses] = React.useState([]);
  const [catalogStatus, setCatalogStatus] = React.useState('loading');
  const [editionsBySlug, setEditionsBySlug] = React.useState({});

  React.useEffect(() => {
    const controller = new AbortController();
    async function loadCatalog() {
      try {
        const response = await fetch(`${API_BASE_URL}/academy/courses`, { signal: controller.signal });
        if (!response.ok) throw new Error('Catalogo non disponibile');
        const payload = await response.json();
        if (!Array.isArray(payload.data)) throw new Error('Formato catalogo non valido');
        const validCourses = payload.data.filter(course => course && typeof course.slug === 'string' && typeof course.title === 'string');
        setPublishedCourses(validCourses);
        setCatalogStatus('ready');
        // Un errore sul calendario di un corso non deve rendere indisponibile il catalogo.
        const results = await Promise.allSettled(validCourses.map(course => fetchEditions(course.slug, controller.signal)));
        if (!controller.signal.aborted) {
          const next = {};
          results.forEach((result, index) => {
            if (result.status === 'fulfilled') next[validCourses[index].slug] = result.value;
          });
          setEditionsBySlug(next);
        }
      } catch (error) {
        if (error.name !== 'AbortError') setCatalogStatus('error');
      }
    }
    loadCatalog();
    return () => controller.abort();
  }, []);

  return <section id="corsi" className="section courses-section" aria-labelledby="courses-title"><div className="container">
    <div className="section-heading"><div><p className="eyebrow">I PERCORSI</p><h2 id="courses-title">Trova il percorso giusto per te.</h2><p>Dal primo utilizzo dell'AI alla specializzazione tecnica.</p></div><span className="section-hint">Micro-corsi e percorsi Professional</span></div>
    {catalogStatus === 'loading' && <p role="status">Caricamento dei corsi in corso…</p>}
    {catalogStatus === 'error' && <p role="alert">Il catalogo non è momentaneamente disponibile. Riprova più tardi.</p>}
    {catalogStatus === 'ready' && publishedCourses.length === 0 && <p>Al momento non ci sono corsi pubblicati.</p>}
    {catalogStatus === 'ready' && publishedCourses.length > 0 && <div className="course-grid">{publishedCourses.map(course => {
      const isProfessional = course.category === 'specialization';
      const presentation = courses.find(item => item.slug === course.slug);
const categoryLabel =
  isProfessional ? 'PROFESSIONAL' :
  course.category === 'micro-course' ? 'MICRO-CORSO' :
  'CORSO';
      const theme = presentation?.theme || 'work';
      const fallbackImage = presentation?.image || 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=960&q=85';
      const image = course.image ? `${API_BASE_URL}/academy/courses/${encodeURIComponent(course.slug)}/image` : fallbackImage;
      const imageAlt = presentation?.imageAlt || 'Ambiente di formazione digitale';
      const detailAvailable = Boolean(course.slug);
      const hours = Number(course.duration_hours);

const durationLabel =
  Number.isFinite(hours) && hours > 0
    ? `${hours.toLocaleString('it-IT')} ore`
    : 'Durata da definire';

const deliveryLabels = {
  online_live: 'Online in diretta',
  in_person: 'In presenza',
  hybrid: 'Modalità ibrida'
};

const formatLabel =
  deliveryLabels[course.delivery_mode] || 'Modalità da confermare';

      return <article className="course-card" key={course.id || course.slug}>
        <div className={`course-art course-art-${theme}`}><img className="course-art-image" src={image} alt={imageAlt} loading="lazy" decoding="async" onError={event => { if (event.currentTarget.src !== fallbackImage) event.currentTarget.src = fallbackImage; }}/><span className={`course-kind ${isProfessional ? 'course-kind-professional' : ''}`}>
  {categoryLabel}
</span><span className="course-art-caption">{presentation?.label || 'Evocons Academy'}</span></div>
        <div className="course-body"><h3>{course.title}</h3><p>{course.description || 'Scopri il percorso formativo di Evocons Academy.'}</p><div className="course-meta">
  <span><Clock3 size={15}/>{durationLabel}</span>
  <span><MonitorPlay size={15}/>{formatLabel}</span>
</div>
{editionsBySlug[course.slug]?.length > 0 && <div className="course-edition-dates"><strong>Prossime edizioni</strong>{editionsBySlug[course.slug].map(edition => <span key={edition.id || edition.edition_code}><CalendarDays size={15} aria-hidden="true"/>{formatEditionDate(edition.start_date)}</span>)}</div>}
 <a className="course-status course-link" href={detailAvailable ? `/corsi/${encodeURIComponent(course.slug)}/` : contactUrl}>{detailAvailable ? 'Scopri il corso →' : 'Richiedi informazioni →'}</a></div>
      </article>;
    })}</div>}
    <p className="course-disclaimer">I micro-corsi si possono seguire singolarmente oppure come percorso completo a condizioni agevolate. Consulta la pagina di ciascun corso per conoscere le prossime edizioni e le modalità di partecipazione.</p>
  </div></section>;
}

function Audience(){
  return <section id="destinatari" className="section audience-section" aria-labelledby="audience-title"><div className="container audience-grid"><div><p className="eyebrow">A CHI CI RIVOLGIAMO</p><h2 id="audience-title">La formazione parte da te.<br/><span>Non dal tuo titolo.</span></h2><p>Che tu voglia migliorare nel lavoro, cambiare direzione o esplorare nuove competenze, puoi individuare un percorso coerente con il tuo punto di partenza.</p><a href="#corsi" className="button audience-button">Esplora i percorsi <ArrowRight size={17}/></a></div><div className="audience-cards">
    <div><BriefcaseBusiness/><h3>Professionisti</h3><p>Aggiorna competenze e strumenti.</p></div><div><GraduationCap/><h3>Studenti</h3><p>Avvicinati alle tecnologie emergenti.</p></div><div><Laptop/><h3>Freelance</h3><p>Amplia i servizi che puoi offrire.</p></div><div><Lightbulb/><h3>Appassionati</h3><p>Trasforma la curiosità in pratica.</p></div>
  </div></div></section>
}

function Method(){
  return <section id="metodo" className="section method-section" aria-labelledby="method-title"><div className="container"><p className="eyebrow">COME SI IMPARA</p><h2 id="method-title">Dalla teoria alla pratica, insieme.</h2><p className="method-lead">Non solo contenuti da ascoltare: lezioni dal vivo, esercitazioni e confronto diretto con il docente.</p><div className="method-grid">
    <article><div className="method-icon"><MonitorPlay/></div><h3>Lezioni in diretta</h3><p>Segui il docente, poni domande e confrontati con gli altri partecipanti.</p></article>
    <article><div className="method-icon"><CheckCircle2/></div><h3>Impari facendo</h3><p>Applica quanto appreso attraverso esercizi, esempi e progetti.</p></article>
    <article><div className="method-icon"><MapPin/></div><h3>Il formato adatto al percorso</h3><p>Formazione online sincrona: dialogo, esercitazioni e feedback.</p></article>
  </div></div></section>
}

function FinalCta(){return <section className="final-cta-section"><div className="container final-cta"><div><p className="eyebrow">DA DOVE COMINCIARE?</p><h2>Ogni percorso inizia<br/>da una scelta concreta.</h2><p>Confronta le proposte e individua quella più vicina ai tuoi obiettivi.</p></div><a href="#corsi" className="button final-cta-button">Confronta i corsi <ArrowRight size={18}/></a></div></section>}

function Footer() {
  return (
    <footer className="academy-footer" aria-label="Informazioni Evocons Academy">
      <div className="container footer-top">
        <div className="footer-intro">
          <a href={isInnerPage ? "/" : "#home"} className="brand footer-brand" aria-label="Evocons Academy - torna all’inizio">
            <span className="brand-mark" aria-hidden="true">e</span><span className="brand-name">evocons</span><span className="brand-divider"/><span className="brand-academy">academy</span>
          </a>
          <p>Competenze concrete per nuove opportunità. Formazione pratica, con persone vere e obiettivi reali.</p>
          <a className="footer-corporate" href="https://www.evocons.it/" target="_blank" rel="noopener noreferrer">Scopri Evocons <ArrowUpRight size={16}/></a>
        </div>
        <div className="footer-links">
          <h2>Esplora Academy</h2>
          <a href={isInnerPage ? "/#corsi" : "#corsi"}>I percorsi</a>
          <a href={isInnerPage ? "/#perche-academy" : "#perche-academy"}>Perché Academy</a>
          <a href={isInnerPage ? "/#destinatari" : "#destinatari"}>A chi si rivolge</a>
          <a href={isInnerPage ? "/#metodo" : "#metodo"}>Come funziona</a>
        </div>
        <div className="footer-links">
          <h2>La formazione</h2>
          <p><MonitorPlay size={17}/> Online in diretta</p>
          <p><Users size={17}/> Interazione con il docente</p>
          <p><GraduationCap size={17}/> Corsi brevi e master</p>
        </div>
        <div className="footer-contact">
          <h2>Costruiamo il tuo prossimo passo.</h2>
          <p>Scopri il percorso più adatto ai tuoi obiettivi.</p>
          <a href={isInnerPage ? "/#corsi" : "#corsi"} className="button footer-button">Esplora i corsi <ArrowRight size={18}/></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Evocons Academy · Un progetto Evocons</span>
        <a href="/privacy">Privacy</a>
        <a href="https://www.evocons.it/contatti" target="_blank" rel="noopener noreferrer">Contatti <ArrowUpRight size={14}/></a>
      </div>
    </footer>
  );
}


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
  const isMicroCourse = courseDetails?.category === 'micro-course';

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
    return <main className="course-page"><section className="section"><div className="container"><h1>Corso non disponibile</h1><p>Non è possibile visualizzare questo corso. Torna al catalogo per consultare i percorsi pubblicati.</p><a href="/#corsi" className="button button-primary">Torna ai corsi <ArrowRight size={17}/></a></div></section></main>;
  }
  return <main className="course-page" id="home">
    <section className="course-hero"><div className="container course-hero-grid">
      <div><a className="course-back" href="/#corsi">← Tutti i percorsi</a><p className="eyebrow">{isMicroCourse ? "MICRO-CORSO" : "EVOCONS ACADEMY"} · {courseDetails.title.toLocaleUpperCase("it-IT")}</p>
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
          <div className="course-edition-bottom"><div><small>Quota di partecipazione</small><strong>{hasPrice ? new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(price) : 'Da definire'}</strong></div><a href={`${interestUrl}&edizione=${encodeURIComponent(edition.id)}`} className="button button-primary">Manifesta interesse <ArrowRight size={17}/></a></div>
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
    {isMicroCourse && <section className="section course-next"><div className="container course-next-grid"><div><p className="eyebrow">PROSEGUIRE, SENZA VINCOLI</p><h2>Un micro-corso oggi.<br/><span>Un percorso domani.</span></h2><p><strong>La formazione si adatta alla tua vita.</strong><br/>Cinque incontri online di due ore, pensati anche per chi lavora. Segui le lezioni da dove preferisci e utilizza il tempo tra un incontro e l'altro per approfondire, sperimentare e applicare ciò che hai imparato.</p><p><strong>Un piccolo investimento, nuove possibilità.</strong><br/>Ogni micro-corso è un'esperienza formativa autonoma, con obiettivi concreti e un investimento contenuto. Puoi acquisire competenze specifiche, scoprire nuovi interessi e capire quali ambiti desideri approfondire.</p><p>Puoi fermarti al primo risultato oppure proseguire, combinando più micro-corsi in un percorso di crescita professionale.</p><a href={interestUrl} className="course-text-link">Manifesta interesse per il percorso <ArrowRight size={17}/></a></div><div className="course-path" aria-label="Vantaggi dei micro-corsi"><div><span className="path-number">01</span><div><strong>Impara senza fermarti</strong><small>Due ore online, compatibili con il lavoro</small></div></div><div><span className="path-number">02</span><div><strong>Sperimenta tra gli incontri</strong><small>Tempo per approfondire e mettere in pratica</small></div></div><div><span className="path-number">03</span><div><strong>Scopri la tua direzione</strong><small>Nuove competenze, interessi e opportunità</small></div></div></div></div></section>}
    <section className="course-personal-section"><div className="container course-personal"><div><p className="eyebrow">FORMAZIONE SU MISURA</p><h2>Hai esigenze formative diverse?</h2><p>Un programma per il tuo team, un approfondimento specifico o un percorso personalizzato? Raccontaci cosa vuoi ottenere.</p></div><a href={contactUrl} className="button final-cta-button">Richiedi un percorso personalizzato <ArrowUpRight size={17}/></a></div></section>
  </main>;
}


const ENROLLMENT_ENABLED = import.meta.env.VITE_ACADEMY_ENROLLMENT_ENABLED === 'true';
const API_BASE_URL = (import.meta.env.VITE_ACADEMY_API_BASE_URL || '').replace(/\/$/, '');
const PRIVACY_URL = import.meta.env.VITE_ACADEMY_PRIVACY_URL || '';
const PRIVACY_VERSION = import.meta.env.VITE_ACADEMY_PRIVACY_VERSION || '';

function InterestPage() {
  const slug = new URLSearchParams(window.location.search).get('corso');
  const editionId = new URLSearchParams(window.location.search).get('edizione');
  const [selectedEdition, setSelectedEdition] = React.useState(null);
  const [editionStatus, setEditionStatus] = React.useState(editionId ? 'loading' : 'generic');
  const [course, setCourse] = React.useState(null);
  const [courseStatus, setCourseStatus] = React.useState('loading');
  React.useEffect(() => {
    const controller = new AbortController();
    async function loadCourse() {
      try {
        if (!slug || !/^[a-z0-9-]+$/.test(slug)) throw new Error('Slug non valido');
        const response = await fetch(`${API_BASE_URL}/academy/courses/${encodeURIComponent(slug)}/details`, { signal: controller.signal });
        if (!response.ok) throw new Error('Corso non disponibile');
        const payload = await response.json();
        if (!payload.data || payload.data.slug !== slug) throw new Error('Dettaglio corso non valido');
        setCourse(payload.data);
        setCourseStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') setCourseStatus('error');
      }
    }
    loadCourse();
    return () => controller.abort();
  }, [slug]);
  React.useEffect(() => {
    if (!editionId) return;
    const controller = new AbortController();
    if (!slug || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(editionId)) {
      setEditionStatus('error');
      return;
    }
    fetchEditions(slug, controller.signal)
      .then(editions => {
        if (controller.signal.aborted) return;
        const match = editions.find(item => item.id === editionId);
        setSelectedEdition(match || null);
        setEditionStatus(match ? 'ready' : 'error');
      })
      .catch(error => {
        if (controller.signal.aborted) return;
        console.warn('Impossibile verificare l’edizione.', error);
        setEditionStatus('error');
      });
    return () => controller.abort();
  }, [slug, editionId]);
  const [values, setValues] = React.useState({ first_name: '', last_name: '', email: '', phone: '', acknowledged: false, marketing: false });
  const [status, setStatus] = React.useState('idle');
  const [error, setError] = React.useState('');
  const ready = ENROLLMENT_ENABLED && Boolean(PRIVACY_URL && PRIVACY_VERSION) && courseStatus === 'ready' && (editionStatus === 'generic' || editionStatus === 'ready');

  React.useEffect(() => {
    document.title = 'Manifestazione d’interesse | Evocons Academy';
  }, []);

  function update(field, value) {
    setValues(previous => ({ ...previous, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (!course || !ready || status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/academy/enrollment-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: values.first_name.trim(),
          last_name: values.last_name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          course_slug: course.slug,
          ...(selectedEdition ? { edition_id: selectedEdition.id } : {}),
          privacy_notice_version: PRIVACY_VERSION,
          privacy_notice_acknowledged: values.acknowledged,
          marketing_consent: values.marketing
        })
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        if (payload?.code === 'EDITION_NOT_AVAILABLE') {
          throw new Error('L’edizione selezionata non è più disponibile. Torna al calendario e scegli un’altra data.');
        }
        throw new Error('Non è stato possibile inviare la richiesta. Riprova più tardi.');
      }
      setStatus('success');
    } catch (error) {
      setError(error.message || 'Non è stato possibile inviare la richiesta. Riprova più tardi.');
      setStatus('error');
    }
  }

  return <main className="interest-page" id="home">
    <section className="interest-intro">
      <div className="container">
        <a
          className="course-back"
          href={course ? `/corsi/${encodeURIComponent(course.slug)}/` : '/#corsi'}
        >
          ← Torna ai corsi
        </a>
        <p className="eyebrow">EVOCONS ACADEMY · FORMAZIONE</p>
        <h1>Il prossimo passo <span>inizia qui.</span></h1>
        <p>Scopri il percorso più adatto a te. Lasciaci i tuoi riferimenti: ti contatteremo per condividere programma, modalità di partecipazione e prossime date.</p>
      </div>
    </section>
    <section className="interest-section">
      <div className="container interest-grid">
        <aside className="interest-aside">
          <p className="eyebrow">IL PERCORSO CHE TI INTERESSA</p>
          <h2>{course ? course.title : 'Percorso non disponibile'}</h2>
          <p>{course ? (course.hero_description || course.description || 'Scopri questo percorso formativo.') : (courseStatus === 'loading' ? 'Caricamento del percorso…' : 'Il collegamento non identifica un corso disponibile. Torna al catalogo e scegli un percorso.')}</p>
          {course && <div className="interest-facts"><span><Clock3 size={18}/> {Number(course.duration_hours) > 0 ? `${Number(course.duration_hours).toLocaleString("it-IT")} ore` : "Durata da definire"}</span><span><MonitorPlay size={18}/> {course.delivery_mode === "online_live" ? "Online in diretta" : "Modalità da confermare"}</span></div>}
          {editionId && editionStatus === 'loading' && <p className="interest-edition" role="status">Verifica dell’edizione selezionata…</p>}
          {editionId && editionStatus === 'error' && <p className="interest-edition-error" role="alert">L’edizione indicata non è disponibile. Torna al calendario del corso per selezionarne un’altra.</p>}
          {selectedEdition && editionStatus === 'ready' && <div className="interest-edition">
            <strong>Edizione selezionata</strong>
            <span>{formatEditionDate(selectedEdition.start_date)}{selectedEdition.end_date ? ` – ${formatEditionDate(selectedEdition.end_date)}` : ''}</span>
            {selectedEdition.calendar_name && <span>{selectedEdition.calendar_name}{selectedEdition.start_time && selectedEdition.end_time ? ` · ${formatEditionTime(selectedEdition.start_time)}–${formatEditionTime(selectedEdition.end_time)}` : ''}</span>}
            <span>{selectedEdition.status === 'confirmed' ? 'Partenza confermata' : 'Programmata · soggetta a conferma'}</span>
            <a href={`/corsi/${encodeURIComponent(slug)}/#calendario`}>Cambia edizione</a>
          </div>}
          <a href={course ? `/corsi/${encodeURIComponent(course.slug)}/` : '/#corsi'} className="course-text-link">Consulta il programma <ArrowRight size={17}/></a>
        </aside>
        <div className="interest-panel">
          {status === 'success' ? <div className="interest-success" role="status"><CheckCircle2 size={38}/><h2>Richiesta ricevuta</h2><p>Grazie per l'interesse. Ti contatteremo per fornirti maggiori informazioni.</p><a href="/" className="button button-primary">Torna ad Academy <ArrowRight size={17}/></a></div> : <>
            <h2>Parliamo del tuo percorso.</h2>
            {selectedEdition && editionStatus === 'ready' && <p className="interest-panel-lead"><strong>Edizione del {formatEditionDate(selectedEdition.start_date)}</strong> · La richiesta sarà associata a questa edizione.</p>}
            {import.meta.env.MODE === 'test' && <p className="interest-notice" role="status">AMBIENTE DI TEST · Verifica la destinazione API prima di utilizzare dati reali.</p>}
            <p className="interest-panel-lead">Lascia i tuoi riferimenti per ricevere informazioni. I campi contrassegnati con * sono obbligatori.</p>
            <form onSubmit={submit} className="interest-form">
              <div className="interest-form-row">
                <label>Nome *<input required maxLength={100} autoComplete="given-name" value={values.first_name} onChange={e => update('first_name', e.target.value)} /></label>
                <label>Cognome *<input required maxLength={100} autoComplete="family-name" value={values.last_name} onChange={e => update('last_name', e.target.value)} /></label>
              </div>
              <label>Email *<input required type="email" maxLength={254} autoComplete="email" value={values.email} onChange={e => update('email', e.target.value)} /></label>
              <label>Telefono <span className="interest-optional">(facoltativo)</span><input type="tel" maxLength={30} autoComplete="tel" value={values.phone} onChange={e => update('phone', e.target.value)} /></label>
              <div className="interest-consents">
                <label className="interest-check"><input type="checkbox" required checked={values.acknowledged} onChange={e => update('acknowledged', e.target.checked)} /><span>Confermo di aver preso visione dell’<a href={PRIVACY_URL || undefined} onClick={e => { if (!PRIVACY_URL) e.preventDefault(); }} target="_blank" rel="noopener noreferrer">informativa sul trattamento dei dati personali</a>. *</span></label>
                <label className="interest-check"><input type="checkbox" checked={values.marketing} onChange={e => update('marketing', e.target.checked)} /><span>Acconsento a ricevere comunicazioni promozionali relative alle iniziative formative di Evocons Academy. (Facoltativo)</span></label>
              </div>
              {editionId && editionStatus === 'error' && <p className="interest-error" role="alert">Invio disabilitato: edizione non disponibile.</p>}
              {!ENROLLMENT_ENABLED || !PRIVACY_URL || !PRIVACY_VERSION ? <p className="interest-notice" role="status">Modulo in preparazione.</p> : null}
              {error && <p className="interest-error" role="alert">{error}</p>}
              <button type="submit" className="button button-primary interest-submit" disabled={!ready || !course || status === 'sending'}>{status === 'sending' ? 'Invio in corso…' : 'Invia manifestazione d’interesse'} <ArrowRight size={17}/></button>
            </form>
          </>}
        </div>
      </div>
    </section>
  </main>;
}


function PrivacyPage() {
  React.useEffect(() => {
    document.title = 'Informativa privacy | Evocons Academy';
  }, []);
  return <main className="interest-page" id="home">
    <section className="interest-intro"><div className="container">
      <a className="course-back" href="/">← Torna ad Academy</a>
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
        <p>In relazione alle manifestazioni d'interesse sono trattati nome, cognome, indirizzo email, numero telefonico (facoltativo), corso di interesse, scelte relative alle comunicazioni promozionali e informazioni tecniche necessarie a documentare la richiesta e le scelte espresse. Durante la navigazione possono inoltre essere trattati dati tecnici relativi alle richieste HTTP, al dispositivo, al browser e alle prestazioni delle pagine, secondo quanto descritto nella sezione 10.</p>
        <h2>3. Finalità e basi giuridiche</h2>
        <p><strong>Richieste sui corsi.</strong> Utilizziamo i dati per rispondere alle manifestazioni d’interesse e fornire informazioni sui programmi, sulle modalità di partecipazione e sulle prossime date. La base giuridica è l’articolo 6, paragrafo 1, lettera b), GDPR (misure precontrattuali richieste dall’interessato).</p>
        <p><strong>Newsletter e comunicazioni promozionali.</strong> Solo con consenso facoltativo potremo inviare aggiornamenti sui corsi, workshop, eventi e iniziative EvoCons. La base giuridica è l’articolo 6, paragrafo 1, lettera a), GDPR. Il consenso può essere revocato in qualsiasi momento scrivendo a <a href="mailto:privacy@evocons.it">privacy@evocons.it</a>, senza pregiudicare la liceità del trattamento precedente alla revoca.</p>
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
function App() { return <><Header/>{isPrivacyPage ? <PrivacyPage/> : isInterestPage ? <InterestPage/> : isCoursePage ? <CoursePage/> : <Hero/>}<Footer/></>; }

createRoot(document.getElementById('root')).render(<App/>);
