import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, GraduationCap, Menu, MonitorPlay, Sparkles, Users, X, Lightbulb, BriefcaseBusiness, Clock3, Code2, Workflow, Target, Laptop, MapPin, CheckCircle2 } from 'lucide-react';
import './styles.css';

const isCoursePage = window.location.pathname.replace(/\/$/, '') === '/corsi/ai-per-il-lavoro';
const contactUrl = 'https://www.evocons.it/contatti';

function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href={isCoursePage ? "/" : "#home"} className="brand" aria-label="Evocons Academy - homepage">
          <span className="brand-mark" aria-hidden="true">e</span><span className="brand-name">evocons</span><span className="brand-divider"/><span className="brand-academy">academy</span>
        </a>
        <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navigazione principale">
          <a href={isCoursePage ? "/#corsi" : "#corsi"} onClick={() => setOpen(false)}>Corsi</a>
          <a href={isCoursePage ? "/#perche-academy" : "#perche-academy"} onClick={() => setOpen(false)}>Perché Academy</a>
          <a href={isCoursePage ? "/#destinatari" : "#destinatari"} onClick={() => setOpen(false)}>A chi si rivolge</a>
          <a href={isCoursePage ? "/#metodo" : "#metodo"} onClick={() => setOpen(false)}>Come funziona</a>
        </nav>
        <a className="button button-primary header-cta" href={isCoursePage ? "/#corsi" : "#corsi"}>Scopri i percorsi <ArrowRight size={17}/></a>
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

function Courses(){
  return <section id="corsi" className="section courses-section" aria-labelledby="courses-title"><div className="container">
    <div className="section-heading"><div><p className="eyebrow">I PERCORSI</p><h2 id="courses-title">Trova il percorso giusto per te.</h2><p>Dal primo utilizzo dell'AI alla specializzazione tecnica.</p></div><span className="section-hint">Micro-corsi, specializzazioni e master</span></div>
    <div className="course-grid">{courses.map(course=>{const Icon=course.icon;return <article className="course-card" key={course.slug}>
      <div className={`course-art course-art-${course.theme}`}><img className="course-art-image" src={course.image} alt={course.imageAlt} loading="lazy" decoding="async"/><span className="course-kind">{course.kind}</span><span className="course-art-caption">{course.label}</span></div>
      <div className="course-body"><h3>{course.title}</h3><p>{course.description}</p><div className="course-meta"><span><Clock3 size={15}/>{course.duration}</span><span><MonitorPlay size={15}/>{course.format}</span></div><a className="course-status course-link" href={course.slug === "ai-per-il-lavoro" ? "/corsi/ai-per-il-lavoro/" : contactUrl}>{course.slug === "ai-per-il-lavoro" ? "Scopri il primo micro-corso →" : "Richiedi informazioni →"}</a></div>
    </article>})}</div>
    <p className="course-disclaimer">I micro-corsi si possono seguire singolarmente oppure come percorso completo a condizioni agevolate. Prezzi, calendari e iscrizioni saranno comunicati successivamente.</p>
  </div></section>
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
          <a href={isCoursePage ? "/" : "#home"} className="brand footer-brand" aria-label="Evocons Academy - torna all’inizio">
            <span className="brand-mark" aria-hidden="true">e</span><span className="brand-name">evocons</span><span className="brand-divider"/><span className="brand-academy">academy</span>
          </a>
          <p>Competenze concrete per nuove opportunità. Formazione pratica, con persone vere e obiettivi reali.</p>
          <a className="footer-corporate" href="https://www.evocons.it/" target="_blank" rel="noopener noreferrer">Scopri Evocons <ArrowUpRight size={16}/></a>
        </div>
        <div className="footer-links">
          <h2>Esplora Academy</h2>
          <a href={isCoursePage ? "/#corsi" : "#corsi"}>I percorsi</a>
          <a href={isCoursePage ? "/#perche-academy" : "#perche-academy"}>Perché Academy</a>
          <a href={isCoursePage ? "/#destinatari" : "#destinatari"}>A chi si rivolge</a>
          <a href={isCoursePage ? "/#metodo" : "#metodo"}>Come funziona</a>
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
          <a href={isCoursePage ? "/#corsi" : "#corsi"} className="button footer-button">Esplora i corsi <ArrowRight size={18}/></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Evocons Academy · Un progetto Evocons</span>
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

function CoursePage(){
  React.useEffect(()=>{
    const title='AI per il lavoro: strumenti e produttività | Evocons Academy';
    const description='Micro-corso online in diretta di 10 ore: impara a utilizzare l’AI generativa nel lavoro, con esercitazioni pratiche e confronto con il docente.';
    document.title=title;
    const update=(selector,attr,value)=>{const el=document.querySelector(selector);if(el)el.setAttribute(attr,value)};
    update('meta[name="description"]','content',description);
    update('link[rel="canonical"]','href','https://academy.evocons.it/corsi/ai-per-il-lavoro/');
    update('meta[property="og:title"]','content',title);
    update('meta[property="og:description"]','content',description);
    update('meta[property="og:url"]','content','https://academy.evocons.it/corsi/ai-per-il-lavoro/');
    update('meta[name="twitter:title"]','content',title);
    update('meta[name="twitter:description"]','content',description);
  },[]);
  return <main className="course-page" id="home">
    <section className="course-hero"><div className="container course-hero-grid">
      <div><a className="course-back" href="/#corsi">← Tutti i percorsi</a><p className="eyebrow">MICRO-CORSO 01 · AI PER IL LAVORO</p>
        <h1>Strumenti AI.<br/><span>Risultati concreti.</span></h1>
        <p className="course-hero-lead">Impara a utilizzare l’intelligenza artificiale generativa nelle attività professionali quotidiane. In diretta, con il docente, attraverso esercitazioni e casi reali.</p>
        <div className="course-facts"><span><MonitorPlay size={18}/> Online live</span><span><Clock3 size={18}/> 10 ore · 5 incontri</span><span><Users size={18}/> Nessun prerequisito tecnico</span></div>
        <div className="course-hero-actions"><a href="#programma" className="button button-primary">Esplora il programma <ArrowRight size={17}/></a><a href={contactUrl} className="button button-outline">Chiedi informazioni <ArrowUpRight size={17}/></a></div>
        <p className="course-note">Calendario, quota e iscrizioni saranno comunicati successivamente.</p>
      </div>
      <div className="course-hero-image"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85" alt="Professionisti che collaborano e apprendono insieme"/><div className="course-image-label"><Sparkles size={20}/> Impara facendo, in diretta.</div></div>
    </div></section>
    <section className="course-metrics" aria-label="Il corso in sintesi"><div className="container course-metrics-grid"><div><Clock3/><strong>10 <small>ore</small></strong><span>Formazione online in diretta</span></div><div><MonitorPlay/><strong>5 <small>incontri</small></strong><span>Due ore per sessione</span></div><div><Users/><strong>Live <small>con il docente</small></strong><span>Domande, confronto ed esercitazioni</span></div></div></section>
    <section className="section course-overview"><div className="container course-overview-grid"><div className="course-overview-copy"><p className="eyebrow">IL PUNTO DI PARTENZA</p><h2>Non serve essere tecnici.<br/><span>Serve iniziare bene.</span></h2><p>Questo micro-corso è pensato per professionisti, dipendenti, freelance, studenti e chiunque desideri utilizzare l’AI nel lavoro, con metodo e consapevolezza.</p><div className="course-benefits"><div><CheckCircle2/><span>Nessun prerequisito tecnico</span></div><div><CheckCircle2/><span>Esercitazioni guidate su attività reali</span></div><div><CheckCircle2/><span>Confronto diretto con il docente</span></div></div></div><div className="course-overview-visual"><img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=85" alt="Persone che collaborano utilizzando strumenti digitali" loading="lazy"/><div className="course-overview-bubble"><MonitorPlay size={20}/> Non videolezioni registrate: partecipi in diretta.</div></div></div></section>
    <section id="programma" className="section course-program"><div className="container">
      <div className="course-section-heading"><div><p className="eyebrow">IL PROGRAMMA</p><h2>Cinque incontri.<br/><span>Cinque passi avanti.</span></h2></div><p>10 ore in diretta. Ogni incontro parte da un'esigenza concreta e termina con un'esercitazione.</p></div>
      <div className="course-module-editorial">{modules.map((m,i)=><article className="course-module-feature" key={m.title}>
        <div className="course-module-visual"><img src={["https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1100&q=85","https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=85","https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1100&q=85","https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1100&q=85","https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=85"][i]} alt={["Persone durante una formazione interattiva","Collaborazione e utilizzo di strumenti digitali","Scrittura e preparazione di documenti","Ricerca e analisi di informazioni","Confronto e verifica dei risultati in gruppo"][i]} loading="lazy"/></div>
        <div className="course-module-copy"><div className="course-module-number">INCONTRO {String(i+1).padStart(2,'0')} <span>2 ORE · ONLINE LIVE</span></div><h3>{m.title}</h3><p>{m.description}</p><div className="course-module-activity"><strong><CheckCircle2 size={21}/> LO METTI IN PRATICA</strong><span>{m.practice}</span></div></div>
      </article>)}</div>
      <div className="course-program-cta"><div><strong>Vuoi capire se è il percorso giusto?</strong><span>Parliamo dei tuoi obiettivi, senza impegno.</span></div><a className="button button-primary" href={contactUrl}>Chiedi informazioni <ArrowRight size={17}/></a></div>
    </div></section>
    <section className="section course-outcomes"><div className="container">
      <div className="course-outcomes-editorial"><div className="course-outcomes-image"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85" alt="Schermata di lavoro con analisi e documenti" loading="lazy"/></div>
      <div className="course-outcomes-copy"><p className="eyebrow">COMPETENZE IN USCITA</p><h2>Non solo sapere.<br/><span>Saper fare.</span></h2><p>Al termine del corso avrai sperimentato un metodo da applicare subito al lavoro.</p><div className="course-outcome-points"><div><Sparkles/><strong>Prompt più efficaci</strong><span>Richieste chiare, risposte migliori.</span></div><div><BookOpen/><strong>Documenti professionali</strong><span>Testi, sintesi e comunicazioni.</span></div><div><CheckCircle2/><strong>Risultati verificati</strong><span>Controllo delle fonti e attenzione ai dati.</span></div></div></div></div>
    </div></section>
    <section className="section course-next"><div className="container course-next-grid"><div><p className="eyebrow">PROSEGUIRE, SENZA VINCOLI</p><h2>Un micro-corso oggi.<br/><span>Un percorso domani.</span></h2><p>Ogni micro-corso è autonomo. Potrai scegliere altri moduli complementari oppure accedere all’intero percorso formativo con un investimento complessivo più conveniente.</p><p>Per chi prosegue dopo il primo modulo prevediamo agevolazioni dedicate, con condizioni e validità da definire.</p><a href={contactUrl} className="course-text-link">Chiedi informazioni sui percorsi <ArrowRight size={17}/></a></div><div className="course-path" aria-label="Modalità di prosecuzione"><div><span className="path-number">01</span><div><strong>Inizia con un micro-corso</strong><small>Un primo risultato concreto</small></div></div><div><span className="path-number">02</span><div><strong>Scegli i moduli complementari</strong><small>Approfondisci secondo i tuoi obiettivi</small></div></div><div><span className="path-number">03</span><div><strong>Oppure segui l’intero percorso</strong><small>Una proposta complessiva più conveniente</small></div></div></div></div></section>
    <section className="course-personal-section"><div className="container course-personal"><div><p className="eyebrow">FORMAZIONE SU MISURA</p><h2>Hai esigenze formative diverse?</h2><p>Un programma per il tuo team, un approfondimento specifico o un percorso personalizzato? Raccontaci cosa vuoi ottenere.</p></div><a href={contactUrl} className="button final-cta-button">Richiedi un percorso personalizzato <ArrowUpRight size={17}/></a></div></section>
  </main>;
}

function App() { return <><Header/>{isCoursePage ? <CoursePage/> : <Hero/>}<Footer/></>; }

createRoot(document.getElementById('root')).render(<App/>);
