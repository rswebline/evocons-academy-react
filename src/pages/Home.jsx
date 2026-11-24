import React from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, GraduationCap, Menu, MonitorPlay, Sparkles, Users, X, Lightbulb, BriefcaseBusiness, Clock3, Code2, Workflow, Target, Laptop, MapPin, CheckCircle2, CalendarDays } from 'lucide-react';
import { API_BASE_URL, contactUrl, COURSE_CATEGORY_LABELS, withUtm } from '../config/app';
import { formatEditionDate, fetchEditions } from '../services/editions';

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


const COURSE_AREAS = [
  { value: 'ai', label: 'Artificial Intelligence' },
  { value: 'data-analytics', label: 'Data Analytics' },
  { value: 'cybersecurity', label: 'Cybersecurity' }
];

// Legge esclusivamente tag effettivamente restituiti dall'API.
// Supporta stringhe, array e oggetti espansi da Directus.
function normalizeCourseTags(course) {
  const raw = course.tags ?? [];
  const values = Array.isArray(raw) ? raw : typeof raw === 'string' ? raw.split(',') : [];
  return [...new Set(values.flatMap(item => {
    if (typeof item === 'string') return [item];
    if (!item || typeof item !== 'object') return [];
    const tag = item.course_tags_id ?? item.tag_id ?? item.tag ?? item;
    if (typeof tag === 'string') return [tag];
    if (tag && typeof tag === 'object') return [tag.slug ?? tag.code ?? tag.name ?? ''];
    return [];
  }).map(value => String(value).trim().toLowerCase()).filter(Boolean))];
}

function normalizedCategory(category) {
  if (category === 'micro-course') return 'base';
  if (category === 'specialization') return 'professional';
  return category;
}

function Courses(){
  const [publishedCourses, setPublishedCourses] = React.useState([]);
  const [catalogStatus, setCatalogStatus] = React.useState('loading');
  const [editionsBySlug, setEditionsBySlug] = React.useState({});
  const [selectedLevel, setSelectedLevel] = React.useState('all');
  const [selectedArea, setSelectedArea] = React.useState('all');
  const availableAreas = COURSE_AREAS.filter(area => publishedCourses.some(course => normalizeCourseTags(course).includes(area.value)));
  const filteredCourses = publishedCourses.filter(course => (selectedLevel === 'all' || normalizedCategory(course.category) === selectedLevel) && (selectedArea === 'all' || normalizeCourseTags(course).includes(selectedArea)));

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
    <div className="section-heading"><div><p className="eyebrow">I PERCORSI</p><h2 id="courses-title">Trova il percorso giusto per te.</h2><p>Dal primo utilizzo dell'AI alla specializzazione tecnica.</p></div><span className="section-hint">Corsi Base, Professional e Master</span></div>
    {catalogStatus === 'loading' && <p role="status">Caricamento dei corsi in corso…</p>}
    {catalogStatus === 'error' && <p role="alert">Il catalogo non è momentaneamente disponibile. Riprova più tardi.</p>}
    {catalogStatus === 'ready' && publishedCourses.length === 0 && <p>Al momento non ci sono corsi pubblicati.</p>}
    {catalogStatus === 'ready' && publishedCourses.length > 0 && <>
      <div className="catalog-filters" aria-label="Filtra i percorsi formativi">
        <div className="catalog-filter-group" role="group" aria-label="Tipologia del percorso">
          <span className="catalog-filter-label">Tipologia del percorso</span>
          <div className="catalog-filter-options">
            {[{value:'all',label:'Tutti'},{value:'base',label:'Base'},{value:'professional',label:'Professional'},{value:'master',label:'Master'}].map(item => <button key={item.value} type="button" className="catalog-filter-chip" aria-pressed={selectedLevel === item.value} onClick={() => setSelectedLevel(item.value)}>{item.label}</button>)}
          </div>
        </div>
        <div className="catalog-filter-group" role="group" aria-label="Ambito formativo">
          <span className="catalog-filter-label">Ambito formativo</span>
          <div className="catalog-filter-options">
            {[{value:'all',label:'Tutti'}, ...COURSE_AREAS].map(item => <button key={item.value} type="button" className="catalog-filter-chip" aria-pressed={selectedArea === item.value} disabled={item.value !== 'all' && !availableAreas.some(area => area.value === item.value)} onClick={() => setSelectedArea(item.value)}>{item.label}</button>)}
          </div>
        </div>
        <div className="catalog-filter-summary">
          <span className="catalog-result-count" role="status">{filteredCourses.length} {filteredCourses.length === 1 ? 'corso' : 'corsi'}</span>
          {(selectedLevel !== 'all' || selectedArea !== 'all') && <button type="button" className="catalog-reset" onClick={() => {setSelectedLevel('all');setSelectedArea('all');}}>Azzera filtri ×</button>}
        </div>
      </div>
      {filteredCourses.length === 0 && <p role="status">Nessun corso corrisponde ai filtri selezionati. <button type="button" className="catalog-reset" onClick={() => { setSelectedLevel('all'); setSelectedArea('all'); }}>Azzera filtri</button></p>}
      <div className="course-grid">{filteredCourses.map(course => {
      const isProfessional = ['professional', 'specialization'].includes(course.category);
      const isMaster = course.category === 'master';
      const presentation = courses.find(item => item.slug === course.slug);
const categoryLabel = COURSE_CATEGORY_LABELS[course.category] || 'CORSO';
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
        <div className={`course-art course-art-${theme}`}><a className="course-art-link" href={withUtm(`/corsi/${encodeURIComponent(course.slug)}/`)} aria-label={`Scopri il corso ${course.title}`}><img className="course-art-image" src={image} alt={imageAlt} loading="lazy" decoding="async" onError={event => { if (event.currentTarget.src !== fallbackImage) event.currentTarget.src = fallbackImage; }}/></a><span className={`course-kind ${isProfessional ? 'course-kind-professional' : isMaster ? 'course-kind-master' : ''}`}>
  {categoryLabel}
</span><span className="course-art-caption">{presentation?.label || 'Evocons Academy'}</span></div>
        <div className="course-body"><h3><a className="course-title-link" href={withUtm(`/corsi/${encodeURIComponent(course.slug)}/`)}>{course.title}</a></h3><p>{course.description || 'Scopri il percorso formativo di Evocons Academy.'}</p><div className="course-meta">
  <span><Clock3 size={15}/>{durationLabel}</span>
  <span><MonitorPlay size={15}/>{formatLabel}</span>
</div>
{editionsBySlug[course.slug]?.length > 0 && <div className="course-edition-dates"><strong>Prossime edizioni</strong>{editionsBySlug[course.slug].map(edition => <span key={edition.id || edition.edition_code}><CalendarDays size={15} aria-hidden="true"/>{formatEditionDate(edition.start_date)}</span>)}</div>}
 <a className="course-status course-link" href={detailAvailable ? withUtm(`/corsi/${encodeURIComponent(course.slug)}/`) : contactUrl}>{detailAvailable ? 'Scopri il corso →' : 'Richiedi informazioni →'}</a></div>
      </article>;
    })}</div></>}
    <p className="course-disclaimer">Consulta la pagina di ciascun corso per conoscere programma, durata, prossime edizioni e modalità di partecipazione.</p>
  </div></section>;
}

function Audience(){
  return <section id="destinatari" className="section audience-section" aria-labelledby="audience-title"><div className="container audience-grid"><div><p className="eyebrow">A CHI CI RIVOLGIAMO</p><h2 id="audience-title">La formazione parte da te.<br/><span>Non dal tuo titolo.</span></h2><p>Che tu voglia migliorare nel lavoro, cambiare direzione o esplorare nuove competenze, puoi individuare un percorso coerente con il tuo punto di partenza.</p><a href={withUtm("#corsi")} className="button audience-button">Esplora i percorsi <ArrowRight size={17}/></a></div><div className="audience-cards">
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

export default Hero;
