import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, GraduationCap, Menu, MonitorPlay, Sparkles, Users, X, Lightbulb, BriefcaseBusiness, Clock3, Code2, Workflow, Target, Laptop, MapPin, CheckCircle2 } from 'lucide-react';
import './styles.css';

function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href="#home" className="brand" aria-label="Evocons Academy - homepage">
          <span className="brand-mark" aria-hidden="true">e</span><span className="brand-name">evocons</span><span className="brand-divider"/><span className="brand-academy">academy</span>
        </a>
        <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navigazione principale">
          <a href="#corsi" onClick={() => setOpen(false)}>Corsi</a>
          <a href="#perche-academy" onClick={() => setOpen(false)}>Perché Academy</a>
          <a href="#destinatari" onClick={() => setOpen(false)}>A chi si rivolge</a>
          <a href="#metodo" onClick={() => setOpen(false)}>Come funziona</a>
        </nav>
        <a className="button button-primary header-cta" href="#corsi">Scopri i percorsi <ArrowRight size={17}/></a>
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
              <a href="#perche-academy" className="button button-outline">Come funziona <ArrowUpRight size={17}/></a>
            </div>
            <div className="hero-highlights" aria-label="Caratteristiche della formazione">
              <div><MonitorPlay size={22}/><span>Live online<br/>e in presenza</span></div>
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
  {slug:'ai-per-il-lavoro',kind:'CORSO BREVE',title:'AI per il lavoro',description:'Impara a usare l’intelligenza artificiale per lavorare meglio, risparmiare tempo e ottenere risultati concreti.',duration:'6 settimane',format:'Live online · In presenza',icon:Lightbulb,theme:'work',label:'Percorso introduttivo',image:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=960&q=85',imageAlt:'Professionista al lavoro in un ambiente digitale'},
  {slug:'ai-automation-specialist',kind:'SPECIALIZZAZIONE',title:'AI Automation Specialist',description:'Dagli strumenti AI ai workflow: scopri come progettare automazioni utili per attività e processi reali.',duration:'Durata da definire',format:'Live online · In presenza',icon:Workflow,theme:'automation',label:'Percorso specialistico',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=960&q=85',imageAlt:'Persone che collaborano utilizzando strumenti digitali'},
  {slug:'ai-engineering',kind:'MASTER',title:'AI Engineering',description:'Progetta applicazioni intelligenti con LLM, RAG e agenti AI, partendo dalle competenze di sviluppo software.',duration:'5–6 mesi · ipotesi',format:'Con partner formativo',icon:Code2,theme:'engineering',label:'Master in definizione',image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=960&q=85',imageAlt:'Schermo con codice software durante lo sviluppo di applicazioni'}
];

function WhyAcademy(){
  return <section id="perche-academy" className="section why-section" aria-labelledby="why-title"><div className="container why-grid">
    <div className="section-intro"><p className="eyebrow">PERCHÉ EVOCONS ACADEMY</p><h2 id="why-title">Più di un corso.<br/>Un percorso verso <span>nuove opportunità.</span></h2><p>Imparare una tecnologia è utile. Saperla applicare fa la differenza. Per questo uniamo esperienza professionale, didattica e attività pratiche.</p></div>
    <div className="benefits-grid">
      <article className="benefit-card"><GraduationCap/><h3>Competenze spendibili</h3><p>Contenuti collegati a situazioni concrete.</p></article>
      <article className="benefit-card"><Users/><h3>Docenti professionisti</h3><p>Formazione guidata da chi lavora sul campo.</p></article>
      <article className="benefit-card"><MonitorPlay/><h3>Flessibilità</h3><p>Lezioni live online e percorsi in presenza.</p></article>
      <article className="benefit-card"><Target/><h3>Apprendimento pratico</h3><p>Esercitazioni, casi d'uso e progetti applicativi.</p></article>
    </div>
  </div></section>
}

function Courses(){
  return <section id="corsi" className="section courses-section" aria-labelledby="courses-title"><div className="container">
    <div className="section-heading"><div><p className="eyebrow">I PERCORSI</p><h2 id="courses-title">Trova il percorso giusto per te.</h2><p>Dal primo utilizzo dell'AI alla specializzazione tecnica.</p></div><span className="section-hint">Tre proposte formative</span></div>
    <div className="course-grid">{courses.map(course=>{const Icon=course.icon;return <article className="course-card" key={course.slug}>
      <div className={`course-art course-art-${course.theme}`}><img className="course-art-image" src={course.image} alt={course.imageAlt} loading="lazy" decoding="async"/><span className="course-kind">{course.kind}</span><span className="course-art-caption">{course.label}</span></div>
      <div className="course-body"><h3>{course.title}</h3><p>{course.description}</p><div className="course-meta"><span><Clock3 size={15}/>{course.duration}</span><span><MonitorPlay size={15}/>{course.format}</span></div><span className="course-status">Programma in preparazione</span></div>
    </article>})}</div>
    <p className="course-disclaimer">I percorsi sono in fase di definizione. Calendari, programmi definitivi e iscrizioni saranno pubblicati successivamente.</p>
  </div></section>
}

function Audience(){
  return <section id="destinatari" className="section audience-section" aria-labelledby="audience-title"><div className="container audience-grid"><div><p className="eyebrow">A CHI CI RIVOLGIAMO</p><h2 id="audience-title">La formazione parte da te.<br/><span>Non dal tuo titolo.</span></h2><p>Che tu voglia migliorare nel lavoro, cambiare direzione o esplorare nuove competenze, puoi individuare un percorso coerente con il tuo punto di partenza.</p><a href="#corsi" className="button audience-button">Esplora i percorsi <ArrowRight size={17}/></a></div><div className="audience-cards">
    <div><BriefcaseBusiness/><h3>Professionisti</h3><p>Aggiorna competenze e strumenti.</p></div><div><GraduationCap/><h3>Studenti</h3><p>Avvicinati alle tecnologie emergenti.</p></div><div><Laptop/><h3>Freelance</h3><p>Amplia i servizi che puoi offrire.</p></div><div><Lightbulb/><h3>Appassionati</h3><p>Trasforma la curiosità in pratica.</p></div>
  </div></div></section>
}

function Method(){
  return <section id="metodo" className="section method-section" aria-labelledby="method-title"><div className="container"><p className="eyebrow">COME SI IMPARA</p><h2 id="method-title">Formazione concreta, con persone vere.</h2><p className="method-lead">Un modello che combina confronto, sperimentazione e applicazione.</p><div className="method-grid">
    <article><div className="method-icon"><MonitorPlay/></div><h3>Lezioni in diretta</h3><p>Segui il docente, poni domande e confrontati con gli altri partecipanti.</p></article>
    <article><div className="method-icon"><CheckCircle2/></div><h3>Impari facendo</h3><p>Applica quanto appreso attraverso esercizi, esempi e progetti.</p></article>
    <article><div className="method-icon"><MapPin/></div><h3>Online o in presenza</h3><p>Scegli tra i formati disponibili per il percorso di tuo interesse.</p></article>
  </div></div></section>
}

function FinalCta(){return <section className="final-cta-section"><div className="container final-cta"><div><p className="eyebrow">IL PROSSIMO PASSO</p><h2>Il futuro si costruisce<br/>con nuove competenze.</h2><p>Scopri le proposte formative di Evocons Academy.</p></div><a href="#corsi" className="button final-cta-button">Scopri i percorsi <ArrowRight size={18}/></a></div></section>}

function Footer() {
  return (
    <footer className="academy-footer" aria-label="Informazioni Evocons Academy">
      <div className="container footer-top">
        <div className="footer-intro">
          <a href="#home" className="brand footer-brand" aria-label="Evocons Academy - torna all’inizio">
            <span className="brand-mark" aria-hidden="true">e</span><span className="brand-name">evocons</span><span className="brand-divider"/><span className="brand-academy">academy</span>
          </a>
          <p>Competenze concrete per nuove opportunità. Formazione pratica, con persone vere e obiettivi reali.</p>
          <a className="footer-corporate" href="https://www.evocons.it/" target="_blank" rel="noopener noreferrer">Scopri Evocons <ArrowUpRight size={16}/></a>
        </div>
        <div className="footer-links">
          <h2>Esplora Academy</h2>
          <a href="#corsi">I percorsi</a>
          <a href="#perche-academy">Perché Academy</a>
          <a href="#destinatari">A chi si rivolge</a>
          <a href="#metodo">Come funziona</a>
        </div>
        <div className="footer-links">
          <h2>La formazione</h2>
          <p><MonitorPlay size={17}/> Live online</p>
          <p><Users size={17}/> In presenza</p>
          <p><GraduationCap size={17}/> Corsi brevi e master</p>
        </div>
        <div className="footer-contact">
          <h2>Costruiamo il tuo prossimo passo.</h2>
          <p>Scopri il percorso più adatto ai tuoi obiettivi.</p>
          <a href="#corsi" className="button footer-button">Esplora i corsi <ArrowRight size={18}/></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Evocons Academy · Un progetto Evocons</span>
        <a href="https://www.evocons.it/contatti" target="_blank" rel="noopener noreferrer">Contatti <ArrowUpRight size={14}/></a>
      </div>
    </footer>
  );
}

function App() { return <><Header/><Hero/><Footer/></>; }

createRoot(document.getElementById('root')).render(<App/>);
